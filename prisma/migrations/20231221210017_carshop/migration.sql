/*
  Warnings:

  - You are about to drop the column `modelSlug` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `model_slug` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicles` DROP COLUMN `modelSlug`,
    ADD COLUMN `model_slug` VARCHAR(191) NOT NULL;
