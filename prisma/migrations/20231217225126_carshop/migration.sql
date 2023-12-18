/*
  Warnings:

  - Added the required column `acceleration` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `top_speed` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_weight` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicles` ADD COLUMN `acceleration` DOUBLE NOT NULL,
    ADD COLUMN `power` INTEGER NOT NULL,
    ADD COLUMN `top_speed` INTEGER NOT NULL,
    ADD COLUMN `total_weight` INTEGER NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL;
