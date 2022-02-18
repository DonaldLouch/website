/*
  Warnings:

  - You are about to drop the column `category` on the `Links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Links` DROP COLUMN `category`,
    MODIFY `orderNumber` INTEGER NULL;
