/*
  Warnings:

  - Added the required column `bioExcerpt` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pronouns` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Resume` ADD COLUMN `bioExcerpt` VARCHAR(300) NOT NULL,
    ADD COLUMN `pronouns` VARCHAR(191) NOT NULL;
