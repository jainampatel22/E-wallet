// "use server";
// import prisma from "../libs/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../libs/auth";
// // Accept userId as an argument
// export async function getTransactions(userId: string) {
//   return await prisma.transaction.findMany({
//     where: { userId },
//     orderBy: { createdAt: "desc" },
//     select: {
//       id: true,
  
//       amount: true,
//       createdAt: true,
//     },
//   });
// }
