/*
  Warnings:

  - You are about to drop the column `lastedUpdated` on the `BlogPosts` table. All the data in the column will be lost.
  - You are about to drop the column `sidecar` on the `BlogPosts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedOn` on the `pages` table. All the data in the column will be lost.
  - Added the required column `sidebar` to the `BlogPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `About` ADD COLUMN `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `bio` TEXT NOT NULL,
    MODIFY `favMusic` TEXT NOT NULL,
    MODIFY `favMovieTV` TEXT NOT NULL,
    MODIFY `favBook` TEXT NOT NULL,
    MODIFY `favFood` TEXT NOT NULL,
    MODIFY `favInterest` TEXT NOT NULL,
    MODIFY `favQuote` TEXT NOT NULL,
    MODIFY `top5Music` TEXT NOT NULL,
    MODIFY `top5Movie` TEXT NOT NULL,
    MODIFY `top5TV` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `BlogPosts` DROP COLUMN `lastedUpdated`,
    DROP COLUMN `sidecar`,
    ADD COLUMN `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `sidebar` BOOLEAN NOT NULL,
    MODIFY `orderNumber` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `mediaCredit` TEXT NOT NULL,
    MODIFY `excerpt` VARCHAR(300) NOT NULL,
    MODIFY `body` TEXT NOT NULL,
    MODIFY `tags` TEXT NOT NULL,
    MODIFY `sections` TEXT NOT NULL,
    MODIFY `postedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `views` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Resume` MODIFY `profile` TEXT NOT NULL,
    MODIFY `skills` TEXT NOT NULL,
    MODIFY `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `ResumeEducation` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `ResumeWorkExperience` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `ResumeWorkExperienceHistory` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `media` MODIFY `mediaDescription` TEXT NOT NULL,
    MODIFY `uploadedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `pages` DROP COLUMN `updatedOn`,
    ADD COLUMN `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `orderNumber` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `body` TEXT NOT NULL,
    MODIFY `excerpt` VARCHAR(300) NOT NULL,
    MODIFY `tags` TEXT NOT NULL,
    MODIFY `views` INTEGER NOT NULL DEFAULT 0;
