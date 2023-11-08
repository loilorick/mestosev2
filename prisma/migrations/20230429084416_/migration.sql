/*
  Warnings:

  - Added the required column `categories` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `categories` VARCHAR(255) NOT NULL;
