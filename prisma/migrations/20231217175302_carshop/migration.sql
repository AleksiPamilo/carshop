/*
  Warnings:

  - You are about to alter the column `engine_size` on the `vehicles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `vehicles` MODIFY `engine_size` DOUBLE NOT NULL;
