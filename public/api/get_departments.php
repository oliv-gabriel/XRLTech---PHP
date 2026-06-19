<?php
// get_departments.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM Department ORDER BY name ASC");
    $departments = $stmt->fetchAll();
    
    // Buscar categorias para cada departamento (simulando include: { categories: true })
    foreach ($departments as &$dept) {
        $catStmt = $pdo->prepare("SELECT * FROM Category WHERE departmentId = ?");
        $catStmt->execute([$dept['id']]);
        $dept['categories'] = $catStmt->fetchAll();
    }

    echo json_encode($departments);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar departamentos']);
}
?>
