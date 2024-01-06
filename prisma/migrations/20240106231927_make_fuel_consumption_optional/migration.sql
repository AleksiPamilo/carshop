-- DropForeignKey
ALTER TABLE `technical_info` DROP FOREIGN KEY `technical_info_fuelConsumptionId_fkey`;

-- AlterTable
ALTER TABLE `technical_info` MODIFY `fuelConsumptionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `technical_info` ADD CONSTRAINT `technical_info_fuelConsumptionId_fkey` FOREIGN KEY (`fuelConsumptionId`) REFERENCES `fuel_consumptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
