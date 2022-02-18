/*
  Warnings:

  - Added the required column `avatar` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentAge` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Resume` ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `currentAge` INTEGER NOT NULL;
