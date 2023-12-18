/*
  Warnings:

  - You are about to drop the column `make` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `brand` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicles` DROP COLUMN `make`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL;
