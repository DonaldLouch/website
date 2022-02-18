/*
  Warnings:

  - Added the required column `resumeID` to the `ResumeWorkExperienceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ResumeWorkExperienceHistory` ADD COLUMN `resumeID` VARCHAR(191) NOT NULL;
