/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_vehicleId_fkey`;

-- AlterTable
ALTER TABLE `vehicles` ADD COLUMN `images` JSON NOT NULL;

-- DropTable
DROP TABLE `image`;
