/*
  Warnings:

  - You are about to drop the column `slug` on the `brands` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `brands_slug_key` ON `brands`;

-- AlterTable
ALTER TABLE `brands` DROP COLUMN `slug`;
