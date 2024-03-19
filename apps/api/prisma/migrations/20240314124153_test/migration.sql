/*
  Warnings:

  - You are about to drop the column `addressName` on the `Address` table. All the data in the column will be lost.
  - Added the required column `label` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientName` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` DROP COLUMN `addressName`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `recipientName` VARCHAR(191) NOT NULL;
