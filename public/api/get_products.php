<?php
// get_products.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Ajuste em produção

require 'db.php';

try {
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
    
    $query = "SELECT p.*, c.name as categoryName 
              FROM Product p 
              LEFT JOIN Category c ON p.categoryId = c.id 
              ORDER BY p.createdAt DESC";
              
    if ($limit) {
        $query .= " LIMIT $limit";
    }
    
    $stmt = $pdo->query($query);
    $products = $stmt->fetchAll();
    
    // Convertendo campos
    foreach ($products as &$product) {
        $product['price'] = (float)$product['price'];
        $product['stock'] = (int)$product['stock'];
        $product['rating'] = (int)$product['rating'];
        if ($product['features']) {
            $product['features'] = json_decode($product['features']);
        }
        
        // Simular o objeto category aninhado como no Prisma
        if ($product['categoryId']) {
            $product['category'] = [
                'id' => $product['categoryId'],
                'name' => $product['categoryName']
            ];
        }
        unset($product['categoryName']);
    }

    echo json_encode($products);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar produtos: ' . $e->getMessage()]);
}
?>
