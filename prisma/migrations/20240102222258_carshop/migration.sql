/*
  Warnings:

  - You are about to drop the column `drive_type` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `drivetrain` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicles` DROP COLUMN `drive_type`,
    ADD COLUMN `drivetrain` VARCHAR(191) NOT NULL;
