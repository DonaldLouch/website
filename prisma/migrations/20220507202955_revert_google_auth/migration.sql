/*
  Warnings:

  - Made the column `type` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provider` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `providerAccountId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userLevel` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `type` VARCHAR(191) NOT NULL,
    MODIFY `provider` VARCHAR(191) NOT NULL,
    MODIFY `providerAccountId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `userLevel` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `BusinessVerification` (
    `id` VARCHAR(191) NOT NULL,
    `companyID` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `userPosition` VARCHAR(191) NULL,
    `token` VARCHAR(191) NOT NULL,
    `requestedOn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BusinessVerification_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
