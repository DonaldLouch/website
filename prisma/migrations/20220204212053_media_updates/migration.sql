/*
  Warnings:

  - You are about to drop the `OLDBlogPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mediaPublicID` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaSignature` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Media` ADD COLUMN `mediaPublicID` TEXT NOT NULL,
    ADD COLUMN `mediaSignature` TEXT NOT NULL;

-- DropTable
DROP TABLE `OLDBlogPost`;
