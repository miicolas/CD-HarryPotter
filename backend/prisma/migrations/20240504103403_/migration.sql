/*
  Warnings:

  - You are about to drop the column `id_user_card` on the `Exchange` table. All the data in the column will be lost.
  - Added the required column `id_user_asked` to the `Exchange` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exchange` DROP COLUMN `id_user_card`,
    ADD COLUMN `id_user_asked` INTEGER NOT NULL;
