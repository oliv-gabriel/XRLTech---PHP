// Funções do cliente que se comunicam com as APIs PHP

const API_BASE = '/api';

export async function createUser(formData: FormData) {
  try {
    const response = await fetch(`${API_BASE}/create_user.php`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || "Falha ao criar usuário");
    }
    return data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new Error("Falha ao criar usuário");
  }
}

export async function getUsers() {
  try {
    const response = await fetch(`${API_BASE}/get_users.php`);
    if (!response.ok) throw new Error("Erro na requisição");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}
