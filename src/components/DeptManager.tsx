'use client';

import { createDepartment, createCategory } from "@/app/actions";
import { useState } from "react";
import { Plus, Layers, TrendingUp } from "lucide-react";

interface Department {
  id: string;
  name: string;
}

interface DeptManagerProps {
  departments: Department[];
}

export function DeptManager({ departments }: DeptManagerProps) {
  const [isPendingDept, setIsPendingDept] = useState(false);
  const [isPendingCat, setIsPendingCat] = useState(false);

  async function handleDeptSubmit(formData: FormData) {
    setIsPendingDept(true);
    try {
      await createDepartment(formData);
      alert('Departamento criado!');
      (document.getElementById('dept-form') as HTMLFormElement).reset();
    } catch {
      alert('Erro ao criar departamento.');
    } finally {
      setIsPendingDept(false);
    }
  }

  async function handleCatSubmit(formData: FormData) {
    setIsPendingCat(true);
    try {
      await createCategory(formData);
      alert('Categoria criada!');
      (document.getElementById('cat-form') as HTMLFormElement).reset();
    } catch {
      alert('Erro ao criar categoria.');
    } finally {
      setIsPendingCat(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Department Form */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-purple-600">
          <TrendingUp size={24} />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Novo Departamento</h2>
        </div>
        <form id="dept-form" action={handleDeptSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Nome do Departamento</label>
            <input 
              name="name" 
              required 
              placeholder="Ex: Hardware, Periféricos..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-purple-500/50 transition-all" 
            />
          </div>
          <button 
            disabled={isPendingDept}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={18} /> {isPendingDept ? 'Criando...' : 'Criar Departamento'}
          </button>
        </form>
      </section>

      {/* Category Form */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-emerald-600">
          <Layers size={24} />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Nova Categoria</h2>
        </div>
        <form id="cat-form" action={handleCatSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Departamento Pai</label>
            <select 
              name="departmentId" 
              required 
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-emerald-500/50 transition-all"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Nome da Categoria</label>
            <input 
              name="name" 
              required 
              placeholder="Ex: Processadores, Mouses..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-emerald-500/50 transition-all" 
            />
          </div>
          <button 
            disabled={isPendingCat}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={18} /> {isPendingCat ? 'Criando...' : 'Criar Categoria'}
          </button>
        </form>
      </section>
    </div>
  );
}
