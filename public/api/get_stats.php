<?php
// get_stats.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

try {
    $stats = [
        'productCount' => 0,
        'categoryCount' => 0,
        'departmentCount' => 0,
        'userCount' => 0,
    ];

    $stmt = $pdo->query("SELECT COUNT(*) FROM Product");
    $stats['productCount'] = (int)$stmt->fetchColumn();

    $stmt = $pdo->query("SELECT COUNT(*) FROM Category");
    $stats['categoryCount'] = (int)$stmt->fetchColumn();

    $stmt = $pdo->query("SELECT COUNT(*) FROM Department");
    $stats['departmentCount'] = (int)$stmt->fetchColumn();

    $stmt = $pdo->query("SELECT COUNT(*) FROM User");
    $stats['userCount'] = (int)$stmt->fetchColumn();

    echo json_encode($stats);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar estatísticas']);
}
?>
