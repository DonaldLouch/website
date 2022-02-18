/*
  Warnings:

  - Added the required column `bioExcerpt` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `About` ADD COLUMN `bioExcerpt` VARCHAR(300) NOT NULL;
