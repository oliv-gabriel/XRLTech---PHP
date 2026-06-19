'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Search, ShoppingCart, User, Menu, LayoutGrid } from 'lucide-react';
import { SidebarMenu } from './SidebarMenu';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';

export function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/produtos`);
    }
  };

  // Use resolvedTheme to handle system preference correctly
  const currentTheme = mounted ? resolvedTheme : 'light';
  const logoSrc = currentTheme === 'dark' ? '/logo/logotipo_branco.png' : '/logo/logotipo_azul.png';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          {mounted ? (
            <Image 
              src={logoSrc} 
              alt="XRLTech Logo" 
              width={120} 
              height={40} 
              priority
              className="h-8 w-auto"
            />
          ) : (
            <div className="h-8 w-[120px] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/produtos" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Produtos</Link>
          
          {/* Sidebar Trigger Departamentos */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all cursor-pointer font-bold text-zinc-900 dark:text-zinc-100 border-none group"
          >
            <LayoutGrid size={18} className="group-hover:scale-110 transition-transform" />
            Departamentos
          </button>

          <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Ofertas</Link>
          <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Sobre</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link 
            href="/carrinho"
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative"
          >
            <ShoppingCart size={20} />
            {mounted && cartItemsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
