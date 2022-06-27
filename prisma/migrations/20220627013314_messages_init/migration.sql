/*
  Warnings:

  - You are about to drop the column `body` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Page` DROP COLUMN `body`,
    DROP COLUMN `excerpt`,
    DROP COLUMN `tags`;

-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `budget` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
