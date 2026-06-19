'use client';

import { AdminSidebar } from "@/components/AdminSidebar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user || user.role !== 'ADMIN') {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user || user.role !== 'ADMIN') {
    return null; // ou um loader
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Placeholder */}
        <header className="h-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-end px-8 shrink-0">
          <div className="flex items-center gap-4">
             <div className="text-right">
               <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{user.name || 'Admin XRL'}</p>
               <p className="text-[10px] text-zinc-500">Logado como Administrador</p>
             </div>
             <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
               {user.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
             </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
