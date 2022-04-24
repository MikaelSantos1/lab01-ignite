/*
  Warnings:

  - You are about to drop the column `cancelAt` on the `Enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "cancelAt",
ADD COLUMN     "canceledAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
