/*
  Warnings:

  - Added the required column `cityId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `cityId` VARCHAR(191) NOT NULL,
    ADD COLUMN `provinceId` VARCHAR(191) NOT NULL;
