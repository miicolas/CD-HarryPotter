/*
  Warnings:

  - Added the required column `id_card_want` to the `Exchange` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exchange` ADD COLUMN `id_card_want` VARCHAR(191) NOT NULL;
