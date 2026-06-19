'use client';
import { getUsers } from "./actions";
import UserManagement from "./UserManagement";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return <UserManagement initialUsers={users} />;
}
