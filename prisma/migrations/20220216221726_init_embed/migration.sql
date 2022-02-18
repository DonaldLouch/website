-- CreateTable
CREATE TABLE `Embed` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `embedLink` VARCHAR(191) NOT NULL,
    `options` TEXT NULL,
    `note` TEXT NULL,
    `addedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `orderNumber` INTEGER NULL,

    UNIQUE INDEX `Embed_orderNumber_key`(`orderNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
