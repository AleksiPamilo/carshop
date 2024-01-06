/*
  Warnings:

  - Made the column `basic_info_id` on table `vehicles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `technical_info_id` on table `vehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_basic_info_id_fkey`;

-- DropForeignKey
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_technical_info_id_fkey`;

-- AlterTable
ALTER TABLE `vehicles` MODIFY `basic_info_id` INTEGER NOT NULL,
    MODIFY `technical_info_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_basic_info_id_fkey` FOREIGN KEY (`basic_info_id`) REFERENCES `basic_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_technical_info_id_fkey` FOREIGN KEY (`technical_info_id`) REFERENCES `technical_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
