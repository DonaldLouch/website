/*
  Warnings:

  - You are about to alter the column `startDate` on the `ResumeEducation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `endDate` on the `ResumeEducation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `ResumeEducation` MODIFY `startDate` INTEGER NOT NULL,
    MODIFY `endDate` INTEGER NOT NULL;
