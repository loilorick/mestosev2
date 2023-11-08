/*
  Warnings:

  - Added the required column `username` to the `basket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `basket` ADD COLUMN `username` VARCHAR(255) NOT NULL;
