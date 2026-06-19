'use client';

import { createUser } from "./actions";
import { useState } from "react";
import { UserPlus, UserCircle, ShieldCheck, Mail } from "lucide-react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export default function AdminUsersPage({ initialUsers }: { initialUsers: User[] }) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      await createUser(formData);
      alert('Usuário criado com sucesso!');
      (document.getElementById('user-form') as HTMLFormElement).reset();
    } catch {
      alert('Erro ao criar usuário.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Gestão de Usuários</h1>
        <p className="text-zinc-500 mt-1">Controle quem tem acesso ao painel e à loja.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Form Column */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <UserPlus size={24} />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Novo Usuário</h2>
          </div>
          <form id="user-form" action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Nome Completo</label>
              <input name="name" required className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">E-mail</label>
              <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Senha</label>
              <input name="password" type="password" required className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Nível de Acesso</label>
              <select name="role" required className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50 transition-all">
                <option value="USER">Usuário Comum (Cliente)</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
            <button 
              disabled={isPending}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-blue-500/20"
            >
              {isPending ? 'Criando...' : 'Cadastrar Usuário'}
            </button>
          </form>
        </section>

        {/* List Column */}
        <section className="xl:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Usuários Cadastrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialUsers.map((user) => (
              <div key={user.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex items-start gap-4">
                <div className={`p-3 rounded-xl ${user.role === 'ADMIN' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-400'}`}>
                  {user.role === 'ADMIN' ? <ShieldCheck size={24} /> : <UserCircle size={24} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-900 dark:text-zinc-50 truncate">{user.name || 'Sem nome'}</p>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                    <Mail size={12} />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <span className={`inline-block mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${user.role === 'ADMIN' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
