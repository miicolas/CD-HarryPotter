/*
  Warnings:

  - You are about to drop the column `id_user_card` on the `Exchange` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Exchange` DROP FOREIGN KEY `Exchange_id_user_card_fkey`;

-- AlterTable
ALTER TABLE `Exchange` DROP COLUMN `id_user_card`;
