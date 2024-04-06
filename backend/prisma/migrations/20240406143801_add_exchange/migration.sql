-- CreateTable
CREATE TABLE `Exchange` (
    `id_exchange` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_card` VARCHAR(191) NOT NULL,
    `id_user_card` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_exchange`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exchange` ADD CONSTRAINT `Exchange_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exchange` ADD CONSTRAINT `Exchange_id_card_fkey` FOREIGN KEY (`id_card`) REFERENCES `Card`(`id_card`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exchange` ADD CONSTRAINT `Exchange_id_user_card_fkey` FOREIGN KEY (`id_user_card`) REFERENCES `UserCard`(`id_user_card`) ON DELETE RESTRICT ON UPDATE CASCADE;
