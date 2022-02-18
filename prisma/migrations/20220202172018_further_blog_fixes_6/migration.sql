/*
  Warnings:

  - You are about to drop the `BlogPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `BlogPosts`;

-- CreateTable
CREATE TABLE `BlogPost` (
    `orderNumber` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `blogType` VARCHAR(191) NOT NULL,
    `media` TEXT NULL,
    `mediaCredit` TEXT NULL,
    `headingText` VARCHAR(300) NULL,
    `body` TEXT NOT NULL,
    `excerpt` VARCHAR(300) NOT NULL,
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

    UNIQUE INDEX `BlogPost_id_key`(`id`),
    UNIQUE INDEX `BlogPost_slug_key`(`slug`),
    PRIMARY KEY (`orderNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
