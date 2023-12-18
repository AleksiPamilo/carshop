/*
  Warnings:

  - You are about to drop the column `location_id` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_location_id_fkey`;

-- AlterTable
ALTER TABLE `vehicles` DROP COLUMN `location_id`;

-- DropTable
DROP TABLE `locations`;
