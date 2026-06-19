<?php
// create_product.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

function gen_uuid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Método não permitido");
    }

    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? 0;
    $categoryId = $_POST['categoryId'] ?? '';
    $stock = $_POST['stock'] ?? 0;
    $description = $_POST['description'] ?? '';
    $featuresStr = $_POST['features'] ?? '';
    
    $features = null;
    if ($featuresStr) {
        // Valida se é um JSON válido
        json_decode($featuresStr);
        if (json_last_error() === JSON_ERROR_NONE) {
            $features = $featuresStr;
        }
    }

    $productId = gen_uuid();
    $imagePath = '';

    if (isset($_FILES['imageFile']) && $_FILES['imageFile']['size'] > 0) {
        $file = $_FILES['imageFile'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        if (!$ext) $ext = 'jpg';
        
        $fileName = $productId . '.' . $ext;
        $uploadDir = __DIR__ . '/../uploads/';
        
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $filePath = $uploadDir . $fileName;
        
        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            $imagePath = '/uploads/' . $fileName;
        }
    }

    $stmt = $pdo->prepare("INSERT INTO Product (id, name, price, categoryId, stock, image, description, features, createdAt, updatedAt) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
                           
    $stmt->execute([
        $productId, 
        $name, 
        $price, 
        $categoryId, 
        $stock, 
        $imagePath, 
        $description, 
        $features
    ]);

    echo json_encode(['success' => true, 'id' => $productId]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao criar produto: ' . $e->getMessage()]);
}
?>
