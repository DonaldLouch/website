/*
  Warnings:

  - You are about to drop the column `baseID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `User_baseID_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `baseID`,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `media`;

-- DropTable
DROP TABLE `pages`;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,
    `oauth_token_secret` VARCHAR(191) NULL,
    `oauth_token` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Media` (
    `mediaID` VARCHAR(191) NOT NULL,
    `mediaKind` VARCHAR(191) NOT NULL,
    `mediaTitle` VARCHAR(191) NOT NULL,
    `mediaALT` VARCHAR(191) NOT NULL,
    `mediaExtension` VARCHAR(191) NOT NULL,
    `mediaPath` VARCHAR(191) NOT NULL,
    `mediaDescription` TEXT NOT NULL,
    `uploadedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `postedIn` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Media_mediaPath_key`(`mediaPath`),
    PRIMARY KEY (`mediaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pages` (
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

    UNIQUE INDEX `Pages_id_key`(`id`),
    UNIQUE INDEX `Pages_slug_key`(`slug`),
    PRIMARY KEY (`orderNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
