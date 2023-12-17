/*
  Warnings:

  - A unique constraint covering the columns `[fuel_consumption_id]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fuel_capacity` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel_type` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_plate` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `odometer` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vin` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicles` ADD COLUMN `fuel_capacity` INTEGER NOT NULL,
    ADD COLUMN `fuel_consumption_id` INTEGER NULL,
    ADD COLUMN `fuel_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `license_plate` VARCHAR(191) NOT NULL,
    ADD COLUMN `odometer` INTEGER NOT NULL,
    ADD COLUMN `vin` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `FuelConsumptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_id` INTEGER NOT NULL,
    `city` DOUBLE NOT NULL,
    `highway` DOUBLE NOT NULL,
    `combined` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `vehicles_fuel_consumption_id_key` ON `vehicles`(`fuel_consumption_id`);

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_fuel_consumption_id_fkey` FOREIGN KEY (`fuel_consumption_id`) REFERENCES `FuelConsumptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
