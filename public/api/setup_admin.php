<?php
// setup_admin.php
// ATENÇÃO: Apague este arquivo após criar o primeiro administrador!

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
    $email = 'admin@xrltech.com';
    $password = 'admin123';
    $name = 'Administrador XRL';
    
    // Verifica se já existe um admin
    $stmt = $pdo->prepare("SELECT id FROM User WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => true, 'message' => 'O usuário admin já existe! E-mail: ' . $email]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $id = gen_uuid();

    $stmt = $pdo->prepare("INSERT INTO User (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'ADMIN', NOW(), NOW())");
    $stmt->execute([$id, $name, $email, $hashedPassword]);

    echo json_encode([
        'success' => true, 
        'message' => 'Administrador criado com sucesso!',
        'email' => $email,
        'senha' => $password,
        'AVISO' => 'APAGUE ESTE ARQUIVO (setup_admin.php) POR SEGURANÇA IMEDIATAMENTE!'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao criar usuário: ' . $e->getMessage()]);
}
?>
