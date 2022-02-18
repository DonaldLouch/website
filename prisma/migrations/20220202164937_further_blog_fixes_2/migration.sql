/*
  Warnings:

  - You are about to drop the column `tagLine` on the `BlogPosts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BlogPosts` DROP COLUMN `tagLine`,
    ADD COLUMN `headingText` VARCHAR(300) NULL;
