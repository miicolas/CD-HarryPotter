/*
  Warnings:

  - You are about to alter the column `lastDraw` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `lastDraw` INTEGER NULL;
