-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `baseID` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `userLevel` INTEGER NOT NULL,
    `createdOn` DATETIME(3) NOT NULL,
    `lastUpdatedOn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_baseID_key`(`baseID`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `About` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `tagLine` VARCHAR(191) NOT NULL,
    `bioExcerpt` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `favMusic` VARCHAR(191) NOT NULL,
    `favMovieTV` VARCHAR(191) NOT NULL,
    `favBook` VARCHAR(191) NOT NULL,
    `favFood` VARCHAR(191) NOT NULL,
    `favInterest` VARCHAR(191) NOT NULL,
    `favQuote` VARCHAR(191) NOT NULL,
    `top5Music` VARCHAR(191) NOT NULL,
    `top5Movie` VARCHAR(191) NOT NULL,
    `top5TV` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resume` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `linkedin` VARCHAR(191) NOT NULL,
    `profile` VARCHAR(191) NOT NULL,
    `skills` VARCHAR(191) NOT NULL,
    `lastUpdatedOn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResumeWorkExperience` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `startDate` VARCHAR(191) NOT NULL,
    `endDate` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResumeWorkExperienceHistory` (
    `id` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NULL,
    `startDate` VARCHAR(191) NULL,
    `endDate` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResumeEducation` (
    `id` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `startDate` VARCHAR(191) NOT NULL,
    `endDate` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPosts` (
    `orderNumber` INTEGER NOT NULL DEFAULT 0,
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `blogType` VARCHAR(191) NOT NULL,
    `media` VARCHAR(191) NOT NULL,
    `mediaCredit` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `categories` VARCHAR(191) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `sidecar` BOOLEAN NOT NULL,
    `sections` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `postedOn` DATETIME(3) NOT NULL,
    `lastedUpdated` DATETIME(3) NOT NULL,
    `postStatus` VARCHAR(191) NOT NULL,
    `views` INTEGER NOT NULL,

    UNIQUE INDEX `BlogPosts_id_key`(`id`),
    UNIQUE INDEX `BlogPosts_slug_key`(`slug`),
    PRIMARY KEY (`orderNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media` (
    `mediaID` VARCHAR(191) NOT NULL,
    `mediaKind` VARCHAR(191) NOT NULL,
    `mediaTitle` VARCHAR(191) NOT NULL,
    `mediaALT` VARCHAR(191) NOT NULL,
    `mediaExtension` VARCHAR(191) NOT NULL,
    `mediaPath` VARCHAR(191) NOT NULL,
    `mediaDescription` VARCHAR(191) NOT NULL,
    `uploadedOn` DATETIME(3) NOT NULL,
    `postedIn` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `media_mediaPath_key`(`mediaPath`),
    PRIMARY KEY (`mediaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages` (
    `orderNumber` INTEGER NOT NULL DEFAULT 0,
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(191) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `updatedOn` DATETIME(3) NOT NULL,
    `pageStatus` VARCHAR(191) NOT NULL,
    `views` INTEGER NOT NULL,

    UNIQUE INDEX `pages_id_key`(`id`),
    UNIQUE INDEX `pages_slug_key`(`slug`),
    PRIMARY KEY (`orderNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
