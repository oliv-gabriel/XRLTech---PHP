'use client';
import { DeptManager } from "@/components/DeptManager";
import { getDepartments } from "@/app/actions";
import { useEffect, useState } from "react";

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getDepartments();
      setDepartments(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Departamentos & Categorias</h1>
        <p className="text-zinc-500 mt-1">Organize a estrutura de navegação da sua loja.</p>
      </div>

      <DeptManager departments={departments} />
    </div>
  );
}
