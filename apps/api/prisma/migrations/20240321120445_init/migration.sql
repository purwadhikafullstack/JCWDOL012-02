/*
  Warnings:

  - You are about to alter the column `category` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `brand` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `category` ENUM('Phone', 'Laptop') NOT NULL,
    MODIFY `brand` ENUM('Axioo', 'Samsung', 'Apple', 'Oppo', 'Asus', 'Lenovo', 'Xiaomi') NOT NULL;
