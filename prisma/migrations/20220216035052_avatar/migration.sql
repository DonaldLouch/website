/*
  Warnings:

  - Added the required column `avatar` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `About` ADD COLUMN `avatar` VARCHAR(191) NOT NULL;
