/*
  Warnings:

  - You are about to alter the column `price` on the `items` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `items` MODIFY `title` VARCHAR(255) NULL,
    MODIFY `image` VARCHAR(255) NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `price` INTEGER NULL;
