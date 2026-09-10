/*
  Warnings:

  - You are about to drop the column `creditsLastAllocateAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `imageUr1` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "creditsLastAllocateAt",
DROP COLUMN "imageUr1",
ADD COLUMN     "creditsLastAllocatedAt" TIMESTAMP(3),
ADD COLUMN     "imageUrl" TEXT;
