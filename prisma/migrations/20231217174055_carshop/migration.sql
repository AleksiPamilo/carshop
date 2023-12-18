/*
  Warnings:

  - A unique constraint covering the columns `[vin]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `vehicles` MODIFY `vin` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `vehicles_vin_key` ON `vehicles`(`vin`);
