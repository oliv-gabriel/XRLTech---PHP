// Funções do cliente que se comunicam com as APIs PHP
// Removido 'use server' pois agora roda no cliente durante fetch

// URL base das APIs PHP (em produção pode ser relativo ou absoluto)
const API_BASE = '/api';

export async function getProducts(limit?: number) {
  try {
    const url = limit ? `${API_BASE}/get_products.php?limit=${limit}` : `${API_BASE}/get_products.php`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro na requisição");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export async function getDepartments() {
  try {
    const response = await fetch(`${API_BASE}/get_departments.php`);
    if (!response.ok) throw new Error("Erro na requisição");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar departamentos:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE}/get_categories.php`);
    if (!response.ok) throw new Error("Erro na requisição");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
}

export async function createProduct(formData: FormData) {
  try {
    const response = await fetch(`${API_BASE}/create_product.php`, {
      method: 'POST',
      body: formData // multipart/form-data automático
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || "Falha ao cadastrar produto");
    }
    return data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw new Error("Falha ao cadastrar produto");
  }
}

export async function createDepartment(formData: FormData) {
  try {
    const response = await fetch(`${API_BASE}/create_department.php`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || "Falha ao criar departamento");
    }
    return data;
  } catch (error) {
    console.error("Erro ao criar departamento:", error);
    throw new Error("Falha ao criar departamento");
  }
}

export async function createCategory(formData: FormData) {
  try {
    const response = await fetch(`${API_BASE}/create_category.php`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || "Falha ao criar categoria");
    }
    return data;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw new Error("Falha ao criar categoria");
  }
}
