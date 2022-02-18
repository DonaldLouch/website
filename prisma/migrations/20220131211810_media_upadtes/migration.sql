/*
  Warnings:

  - Added the required column `mediaDimensions` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaSize` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Media` ADD COLUMN `mediaDimensions` VARCHAR(191) NOT NULL,
    ADD COLUMN `mediaSize` INTEGER NOT NULL,
    MODIFY `mediaALT` VARCHAR(191) NULL,
    MODIFY `mediaDescription` TEXT NULL,
    MODIFY `postedIn` VARCHAR(191) NULL;
