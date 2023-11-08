/*
  Warnings:

  - Made the column `title` on table `items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `items` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `price` INTEGER NOT NULL;
