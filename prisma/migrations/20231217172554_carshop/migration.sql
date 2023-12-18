/*
  Warnings:

  - Added the required column `transmission` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicles` ADD COLUMN `transmission` VARCHAR(191) NOT NULL;
