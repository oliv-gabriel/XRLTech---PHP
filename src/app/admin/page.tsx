'use client';
import { Package, Layers, Users, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    productCount: 0,
    categoryCount: 0,
    departmentCount: 0,
    userCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch('/api/get_stats.php');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const STATS = [
    { name: 'Produtos', value: stats.productCount, icon: <Package size={24} className="text-blue-600" />, color: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Categorias', value: stats.categoryCount, icon: <Layers size={24} className="text-emerald-600" />, color: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { name: 'Departamentos', value: stats.departmentCount, icon: <TrendingUp size={24} className="text-purple-600" />, color: 'bg-purple-50 dark:bg-purple-900/20' },
    { name: 'Usuários', value: stats.userCount, icon: <Users size={24} className="text-amber-600" />, color: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  if (loading) return <div className="p-8">Carregando painel...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Visão geral da sua loja XRLTech.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.name}</p>
                <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">Bem-vindo ao Painel Administrativo</h2>
        <p className="text-zinc-500 leading-relaxed max-w-2xl">
          Aqui você poderá gerenciar todo o inventário da XRLTech. 
          Use o menu lateral para cadastrar novos produtos, organizar departamentos ou gerenciar os perfis de acesso.
        </p>
      </div>
    </div>
  );
}
