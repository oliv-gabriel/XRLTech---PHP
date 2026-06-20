<?php
// db.php
// Configurações do Banco de Dados

// Tenta ler do arquivo .env primeiro (útil para desenvolvimento local)
$envPath = __DIR__ . '/../../.env';
if (file_exists($envPath)) {
    // Usamos um código simples para ler o .env sem precisar de bibliotecas externas
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value, " \t\n\r\0\x0B\"");
        
        if ($name === 'DATABASE_URL') {
            $dbUrl = parse_url($value);
            $host = $dbUrl['host'];
            $port = isset($dbUrl['port']) ? $dbUrl['port'] : 3306;
            $db   = ltrim($dbUrl['path'], '/');
            $user = $dbUrl['user'];
            $pass = $dbUrl['pass'];
        }
    }
}

// Se não encontrou o .env, use estes valores como padrão (para a Kinghost)
if (!isset($host)) {
    $host = 'mysql.xrltech.com.br'; 
    $port = 3306;
    $db   = 'xrltech';
    $user = 'xrltech';
    $pass = 'Ci0108';
}

$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     http_response_code(500);
     die(json_encode(['error' => 'Erro de conexão com o banco de dados: ' . $e->getMessage()]));
}
?>
