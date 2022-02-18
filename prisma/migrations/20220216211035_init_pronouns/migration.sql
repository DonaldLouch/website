/*
  Warnings:

  - Added the required column `pronouns` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `About` ADD COLUMN `pronouns` VARCHAR(191) NOT NULL;
