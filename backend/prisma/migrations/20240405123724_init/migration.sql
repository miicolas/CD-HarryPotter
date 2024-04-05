-- CreateTable
CREATE TABLE `Card` (
    `id_card` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `house` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `actor` VARCHAR(191) NOT NULL,
    `power` VARCHAR(191) NOT NULL,
    `rarity` DOUBLE NOT NULL,

    PRIMARY KEY (`id_card`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCard` (
    `id_user_card` INTEGER NOT NULL AUTO_INCREMENT,
    `id_card` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_user_card`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstDraw` BOOLEAN NOT NULL DEFAULT false,
    `lastDraw` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Friend` (
    `id_frienship` INTEGER NOT NULL AUTO_INCREMENT,
    `userID1` INTEGER NOT NULL,
    `userID2` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`id_frienship`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCard` ADD CONSTRAINT `UserCard_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCard` ADD CONSTRAINT `UserCard_id_card_fkey` FOREIGN KEY (`id_card`) REFERENCES `Card`(`id_card`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friend` ADD CONSTRAINT `Friend_userID1_fkey` FOREIGN KEY (`userID1`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friend` ADD CONSTRAINT `Friend_userID2_fkey` FOREIGN KEY (`userID2`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
