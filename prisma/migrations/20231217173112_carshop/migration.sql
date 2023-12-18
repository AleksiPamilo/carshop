/*
  Warnings:

  - Added the required column `doors` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engine_size` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicles` ADD COLUMN `doors` INTEGER NOT NULL,
    ADD COLUMN `engine_size` VARCHAR(191) NOT NULL,
    ADD COLUMN `seats` INTEGER NOT NULL;
