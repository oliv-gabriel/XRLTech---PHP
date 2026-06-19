<?php
// create_department.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

function gen_uuid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Método não permitido");
    }

    $name = $_POST['name'] ?? '';
    if (!$name) throw new Exception("Nome é obrigatório");

    $id = gen_uuid();

    $stmt = $pdo->prepare("INSERT INTO Department (id, name, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())");
    $stmt->execute([$id, $name]);

    echo json_encode(['success' => true, 'id' => $id]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao criar departamento: ' . $e->getMessage()]);
}
?>
