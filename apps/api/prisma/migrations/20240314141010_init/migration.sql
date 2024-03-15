-- CreateTable
CREATE TABLE `City` (
    `city_id` VARCHAR(191) NOT NULL,
    `province_id` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `city_name` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `City_city_id_key`(`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Province` (
    `province_id` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Province_province_id_key`(`province_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
