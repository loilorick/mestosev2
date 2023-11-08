/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_categoriesId_fkey`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `categoriesId`;
