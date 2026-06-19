<?php
// login.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Método não permitido");
    }

    // Lendo dados JSON
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (!$email || !$password) {
        throw new Exception("Email e senha são obrigatórios");
    }

    $stmt = $pdo->prepare("SELECT id, name, email, password, role FROM User WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Gerar um token simples (em produção, use uma biblioteca JWT real)
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode(['id' => $user['id'], 'email' => $user['email'], 'role' => $user['role'], 'exp' => time() + 86400]);
        
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        
        $secret = 'sua_chave_secreta_super_segura'; // Mude isso em produção
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

        unset($user['password']); // Não enviar a senha de volta
        
        echo json_encode([
            'success' => true,
            'user' => $user,
            'token' => $jwt
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Credenciais inválidas']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro no login: ' . $e->getMessage()]);
}
?>
