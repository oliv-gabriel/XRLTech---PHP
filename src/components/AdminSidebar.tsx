'use client';

import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Users, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
  { name: 'Produtos', href: '/admin/produtos', icon: <Package size={20} /> },
  { name: 'Departamentos', href: '/admin/departamentos', icon: <Layers size={20} /> },
  { name: 'Usuários', href: '/admin/usuarios', icon: <Users size={20} /> },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          X
        </div>
        <span className="font-extrabold text-lg tracking-tight">XRL<span className="text-blue-600">Admin</span></span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {item.name}
              </div>
              <ChevronRight size={14} className={`transition-transform ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer border-none bg-transparent"
        >
          <LogOut size={20} />
          Sair do Painel
        </button>
      </div>
    </aside>
  );
}
