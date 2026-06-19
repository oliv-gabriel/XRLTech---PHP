<?php
// get_categories.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM Category ORDER BY name ASC");
    $categories = $stmt->fetchAll();
    echo json_encode($categories);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar categorias']);
}
?>
