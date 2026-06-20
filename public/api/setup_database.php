<?php
// setup_database.php
// ATENÇÃO: Apague este arquivo após criar as tabelas!

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

try {
    // Tabela User
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `User` (
          `id` varchar(191) NOT NULL,
          `name` varchar(191) DEFAULT NULL,
          `email` varchar(191) NOT NULL,
          `password` varchar(191) NOT NULL,
          `role` varchar(10) NOT NULL DEFAULT 'USER',
          `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `updatedAt` datetime NOT NULL,
          PRIMARY KEY (`id`),
          UNIQUE KEY `User_email_key` (`email`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Tabela Department
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `Department` (
          `id` varchar(191) NOT NULL,
          `name` varchar(191) NOT NULL,
          `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `updatedAt` datetime NOT NULL,
          PRIMARY KEY (`id`),
          UNIQUE KEY `Department_name_key` (`name`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Tabela Category
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `Category` (
          `id` varchar(191) NOT NULL,
          `name` varchar(191) NOT NULL,
          `departmentId` varchar(191) NOT NULL,
          `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `updatedAt` datetime NOT NULL,
          PRIMARY KEY (`id`),
          UNIQUE KEY `Category_name_departmentId_key` (`name`,`departmentId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Tabela Product
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `Product` (
          `id` varchar(191) NOT NULL,
          `name` varchar(191) NOT NULL,
          `description` text,
          `price` decimal(10,2) NOT NULL,
          `image` varchar(191) DEFAULT NULL,
          `rating` int(11) NOT NULL DEFAULT '5',
          `stock` int(11) NOT NULL DEFAULT '0',
          `features` json DEFAULT NULL,
          `categoryId` varchar(191) NOT NULL,
          `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `updatedAt` datetime NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    echo json_encode([
        'success' => true, 
        'message' => 'Tabelas criadas com sucesso no banco de dados!',
        'AVISO' => 'APAGUE ESTE ARQUIVO (setup_database.php) IMEDIATAMENTE POR SEGURANÇA!'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao criar tabelas: ' . $e->getMessage()]);
}
?>
