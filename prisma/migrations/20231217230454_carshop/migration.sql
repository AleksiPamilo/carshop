/*
  Warnings:

  - Added the required column `drive_type` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driver_side` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicles` ADD COLUMN `drive_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `driver_side` VARCHAR(191) NOT NULL,
    ADD COLUMN `torque` INTEGER NULL,
    MODIFY `acceleration` DOUBLE NULL,
    MODIFY `top_speed` INTEGER NULL,
    MODIFY `total_weight` INTEGER NULL,
    MODIFY `weight` INTEGER NULL;
