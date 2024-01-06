-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_verified` DATETIME(3) NULL,
    `phone` VARCHAR(191) NULL,
    `phone_verified` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_name_key`(`name`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand_name` VARCHAR(191) NOT NULL,
    `brand_slug` VARCHAR(191) NOT NULL,
    `model_name` VARCHAR(191) NOT NULL,
    `model_spec` VARCHAR(191) NULL,
    `model_slug` VARCHAR(191) NOT NULL,
    `basic_info_id` INTEGER NOT NULL,
    `technical_info_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `listing_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `listing_updated_at` DATETIME(3) NULL,
    `sold_at` DATETIME(3) NULL,

    UNIQUE INDEX `vehicles_basic_info_id_key`(`basic_info_id`),
    UNIQUE INDEX `vehicles_technical_info_id_key`(`technical_info_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `basic_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `driver_side` VARCHAR(191) NOT NULL,
    `license_plate` VARCHAR(191) NOT NULL,
    `first_registration` DATETIME(3) NULL,
    `inspection_date` DATETIME(3) NULL,
    `previous_owners` INTEGER NULL,
    `color` VARCHAR(191) NOT NULL,
    `paint_type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NULL,
    `mileage` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technical_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fuel_type` VARCHAR(191) NOT NULL,
    `engine_size` DOUBLE NULL,
    `drivetrain` VARCHAR(191) NOT NULL,
    `transmission` VARCHAR(191) NOT NULL,
    `seats` INTEGER NULL,
    `doors` INTEGER NULL,
    `power` INTEGER NULL,
    `torque` INTEGER NULL,
    `top_speed` INTEGER NULL,
    `acceleration` DOUBLE NULL,
    `co2_emission` INTEGER NULL,
    `fuel_capacity` INTEGER NULL,
    `fuelConsumptionId` INTEGER NOT NULL,
    `weight` INTEGER NULL,
    `total_weight` INTEGER NULL,
    `tow_weight_without_brakes` INTEGER NULL,
    `tow_weight_with_brakes` INTEGER NULL,

    UNIQUE INDEX `technical_info_fuelConsumptionId_key`(`fuelConsumptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fuel_consumptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` DOUBLE NOT NULL,
    `highway` DOUBLE NOT NULL,
    `combined` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `brands_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `models` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `brand_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `Feature_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categories_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BasicInfoToFeature` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BasicInfoToFeature_AB_unique`(`A`, `B`),
    INDEX `_BasicInfoToFeature_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_basic_info_id_fkey` FOREIGN KEY (`basic_info_id`) REFERENCES `basic_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_technical_info_id_fkey` FOREIGN KEY (`technical_info_id`) REFERENCES `technical_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technical_info` ADD CONSTRAINT `technical_info_fuelConsumptionId_fkey` FOREIGN KEY (`fuelConsumptionId`) REFERENCES `fuel_consumptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `models` ADD CONSTRAINT `models_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feature` ADD CONSTRAINT `Feature_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BasicInfoToFeature` ADD CONSTRAINT `_BasicInfoToFeature_A_fkey` FOREIGN KEY (`A`) REFERENCES `basic_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BasicInfoToFeature` ADD CONSTRAINT `_BasicInfoToFeature_B_fkey` FOREIGN KEY (`B`) REFERENCES `Feature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
