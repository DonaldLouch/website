/*
  Warnings:

  - You are about to alter the column `orderNumber` on the `Links` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `orderNumber` on the `PrimaryLinks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[orderNumber]` on the table `Links` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderNumber]` on the table `PrimaryLinks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Links` MODIFY `orderNumber` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PrimaryLinks` MODIFY `orderNumber` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PinnedPosts` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` INTEGER NOT NULL,
    `postID` VARCHAR(191) NOT NULL,
    `postTitle` VARCHAR(191) NOT NULL,
    `postSlug` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(300) NOT NULL,
    `addedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PinnedPosts_orderNumber_key`(`orderNumber`),
    UNIQUE INDEX `PinnedPosts_postID_key`(`postID`),
    UNIQUE INDEX `PinnedPosts_postTitle_key`(`postTitle`),
    UNIQUE INDEX `PinnedPosts_postSlug_key`(`postSlug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Links_orderNumber_key` ON `Links`(`orderNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `PrimaryLinks_orderNumber_key` ON `PrimaryLinks`(`orderNumber`);
