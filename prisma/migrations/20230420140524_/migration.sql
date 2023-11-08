/*
  Warnings:

  - Made the column `price` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `items` MODIFY `price` VARCHAR(255) NOT NULL;
