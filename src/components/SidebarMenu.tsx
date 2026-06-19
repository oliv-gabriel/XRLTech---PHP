'use client';

import { X, ChevronRight, Laptop, MousePointer2, Monitor, Headphones, Layout, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDepartments } from '@/app/actions';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
  categories: Category[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  "Hardware": <Laptop size={20} />,
  "Periféricos": <MousePointer2 size={20} />,
  "Monitores": <Monitor size={20} />,
  "Áudio": <Headphones size={20} />,
  "Cadeiras & Mesas": <Layout size={20} />,
};

export function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function loadDepts() {
      const data = await getDepartments() as Department[];
      setDepartments(data);
    }
    loadDepts();
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white dark:bg-zinc-950 z-[110] shadow-2xl transition-transform duration-300 ease-in-out h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-8">
            {/* Mobile Main Nav */}
            <div className="lg:hidden space-y-1 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              <Link
                href="/produtos"
                onClick={onClose}
                className="block px-4 py-3 rounded-xl text-sm font-bold text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
              >
                Todos os Produtos
              </Link>
              <Link
                href="#"
                onClick={onClose}
                className="block px-4 py-3 rounded-xl text-sm font-bold text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
              >
                Ofertas
              </Link>
              <Link
                href="#"
                onClick={onClose}
                className="block px-4 py-3 rounded-xl text-sm font-bold text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
              >
                Sobre nós
              </Link>
            </div>

            <div className="space-y-6">
              {departments.map((dept) => (
                <div key={dept.id} className="space-y-3">
                  <div className="flex items-center gap-3 px-2 py-1 text-blue-600 font-extrabold uppercase text-xs tracking-widest">
                    {ICON_MAP[dept.name] || <LayoutGrid size={20} />}
                    {dept.name}
                  </div>
                  <div className="space-y-1">
                    {dept.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href="/produtos"
                        onClick={onClose}
                        className="group flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
                      >
                        {cat.name}
                        <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shrink-0">
            <p className="text-xs text-zinc-500 text-center font-medium">
              XRLTech - Sua loja de tecnologia
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
