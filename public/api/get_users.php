<?php
// get_users.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

try {
    $stmt = $pdo->query("SELECT id, name, email, role, createdAt FROM User ORDER BY createdAt DESC");
    $users = $stmt->fetchAll();
    echo json_encode($users);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar usuários']);
}
?>
