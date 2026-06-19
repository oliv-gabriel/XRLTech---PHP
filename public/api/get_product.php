<?php
// get_product.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

try {
    $id = $_GET['id'] ?? '';
    if (!$id) throw new Exception("ID do produto não fornecido");
    
    $query = "SELECT p.*, c.name as categoryName, d.name as departmentName, d.id as departmentId 
              FROM Product p 
              LEFT JOIN Category c ON p.categoryId = c.id 
              LEFT JOIN Department d ON c.departmentId = d.id
              WHERE p.id = ?";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute([$id]);
    $product = $stmt->fetch();
    
    if (!$product) {
        echo json_encode(null);
        exit;
    }
    
    // Convertendo campos
    $product['price'] = (float)$product['price'];
    $product['stock'] = (int)$product['stock'];
    $product['rating'] = (int)$product['rating'];
    if ($product['features']) {
        $product['features'] = json_decode($product['features']);
    }
    
    // Simular o objeto category e department aninhado
    if ($product['categoryId']) {
        $product['category'] = [
            'id' => $product['categoryId'],
            'name' => $product['categoryName'],
            'departmentId' => $product['departmentId'],
            'department' => [
                'id' => $product['departmentId'],
                'name' => $product['departmentName']
            ]
        ];
    }
    unset($product['categoryName']);
    unset($product['departmentName']);
    unset($product['departmentId']);

    echo json_encode($product);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar produto: ' . $e->getMessage()]);
}
?>
