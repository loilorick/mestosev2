/*
  Warnings:

  - Added the required column `author` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `author` VARCHAR(255) NOT NULL,
    ADD COLUMN `date` INTEGER NULL,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;
