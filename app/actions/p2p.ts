"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../libs/auth";
import prisma from "../libs/prisma";

export async function p2p(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    throw new Error("User not authenticated");
  }

  // Fetch recipient user
  const toUser = await prisma.user.findFirst({
    where: { number: to },
  });

  if (!toUser) {
    throw new Error("Recipient user not found");
  }

  // Ensure balance records exist for both users
  const ensureBalance = async (userId: number) => {
    const balance = await prisma.balance.findUnique({
      where: { userId },
    });

    if (!balance) {
      await prisma.balance.create({
        data: {
          userId,
          amount: 0,
          locked: 0,
        },
      });
    }
  };

  await ensureBalance(Number(from));
  await ensureBalance(toUser.id);

  // Perform the P2P transaction in a Prisma transaction
  await prisma.$transaction(async (tx) => {
    const senderBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });

    if (!senderBalance || senderBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    const recipientBalance = await tx.balance.findUnique({
      where: { userId: toUser.id },
    });

    if (!recipientBalance) {
      throw new Error("Recipient balance not found");
    }

    // Update sender and recipient balances
    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    // Record the transaction
    await tx.p2PTranscation.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount,
        StartTime: new Date(),
      },
    });
  });
}
