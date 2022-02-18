/*
  Warnings:

  - You are about to drop the column `bioExcerpt` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `favBook` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `favFood` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `favInterest` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `favMovieTV` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `favMusic` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `favQuote` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `top5Movie` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `top5Music` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `top5TV` on the `About` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentAge` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `About` DROP COLUMN `bioExcerpt`,
    DROP COLUMN `favBook`,
    DROP COLUMN `favFood`,
    DROP COLUMN `favInterest`,
    DROP COLUMN `favMovieTV`,
    DROP COLUMN `favMusic`,
    DROP COLUMN `favQuote`,
    DROP COLUMN `phone`,
    DROP COLUMN `top5Movie`,
    DROP COLUMN `top5Music`,
    DROP COLUMN `top5TV`,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `currentAge` INTEGER NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;
