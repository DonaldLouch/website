/*
  Warnings:

  - You are about to drop the `BusinessVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `type` VARCHAR(191) NULL,
    MODIFY `provider` VARCHAR(191) NULL,
    MODIFY `providerAccountId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `firstName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `userLevel` INTEGER NULL;

-- DropTable
DROP TABLE `BusinessVerification`;
