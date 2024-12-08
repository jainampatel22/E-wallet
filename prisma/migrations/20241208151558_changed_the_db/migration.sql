/*
  Warnings:

  - You are about to drop the column `StartTime` on the `OnRampTranscation` table. All the data in the column will be lost.
  - You are about to drop the column `StartTime` on the `P2PTranscation` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `OnRampTranscation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `P2PTranscation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "locked" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OnRampTranscation" DROP COLUMN "StartTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "P2PTranscation" DROP COLUMN "StartTime",
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Password",
ADD COLUMN     "password" TEXT NOT NULL;
