/*
  Warnings:

  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Address` table. All the data in the column will be lost.
  - Added the required column `addressName` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` DROP COLUMN `city`,
    DROP COLUMN `postalCode`,
    ADD COLUMN `addressName` VARCHAR(191) NOT NULL;
