/*
  Warnings:

  - You are about to drop the column `heading` on the `BlogPosts` table. All the data in the column will be lost.
  - You are about to drop the `Pages` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `BlogPosts` DROP COLUMN `heading`,
    ADD COLUMN `headingText` VARCHAR(300) NULL;

-- DropTable
DROP TABLE `Pages`;

-- CreateTable
CREATE TABLE `OLDBlogPost` (
    `orderNumber` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `blogType` VARCHAR(191) NOT NULL,
    `media` TEXT NULL,
    `mediaCredit` TEXT NULL,
    `body` TEXT NOT NULL,
    `excerpt` VARCHAR(300) NOT NULL,
    `heading` VARCHAR(300) NULL,
    `categories` VARCHAR(191) NOT NULL,
    `tags` TEXT NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `sidebar` BOOLEAN NOT NULL,
    `sections` TEXT NULL,
    `author` VARCHAR(191) NOT NULL,
    `postedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `postStatus` VARCHAR(191) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `OLDBlogPost_id_key`(`id`),
    UNIQUE INDEX `OLDBlogPost_slug_key`(`slug`),
    PRIMARY KEY (`orderNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `orderNumber` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `body` TEXT NOT NULL,
    `excerpt` VARCHAR(300) NOT NULL,
    `tags` TEXT NOT NULL,
    `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pageStatus` VARCHAR(191) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Page_id_key`(`id`),
    UNIQUE INDEX `Page_slug_key`(`slug`),
    PRIMARY KEY (`orderNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
