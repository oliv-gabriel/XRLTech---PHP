// Funções do cliente que se comunicam com as APIs PHP

const API_BASE = '/api';

export async function getProductById(id: string) {
  try {
    const response = await fetch(`${API_BASE}/get_product.php?id=${id}`);
    if (!response.ok) throw new Error("Erro na requisição");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}
