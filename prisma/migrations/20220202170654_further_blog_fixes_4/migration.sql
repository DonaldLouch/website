/*
  Warnings:

  - You are about to drop the column `headingText` on the `BlogPosts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BlogPosts` DROP COLUMN `headingText`,
    ADD COLUMN `heading` VARCHAR(300) NULL;
