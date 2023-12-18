/*
  Warnings:

  - You are about to drop the column `category_id` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_category_id_fkey`;

-- AlterTable
ALTER TABLE `vehicles` DROP COLUMN `category_id`;

-- DropTable
DROP TABLE `categories`;
