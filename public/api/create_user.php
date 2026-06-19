<?php
// create_user.php
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
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? 'USER';

    if (!$email || !$password) {
        throw new Exception("Email e senha são obrigatórios");
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $id = gen_uuid();

    $stmt = $pdo->prepare("INSERT INTO User (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())");
    $stmt->execute([$id, $name, $email, $hashedPassword, $role]);

    echo json_encode(['success' => true, 'id' => $id]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao criar usuário: ' . $e->getMessage()]);
}
?>
