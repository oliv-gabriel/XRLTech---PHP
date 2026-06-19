'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const logoSrc = (mounted && resolvedTheme === 'dark') ? '/logo/logotipo_branco.png' : '/logo/logotipo_azul.png';

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              {mounted ? (
                <Image src={logoSrc} alt="XRLTech" width={120} height={40} className="h-8 w-auto" />
              ) : (
                <div className="h-8 w-[120px] bg-zinc-200 dark:bg-zinc-800 rounded" />
              )}
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Sua parceira de confiança para as tecnologias mais avançadas. Inovação e qualidade em cada detalhe.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-pink-600 transition-colors"
                title="Instagram da Loja"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-6 uppercase text-xs tracking-widest">Loja</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="/produtos" className="hover:text-blue-600 transition-colors">Todos os Produtos</Link></li>
              <li><Link href="/produtos?q=hardware" className="hover:text-blue-600 transition-colors">Hardware</Link></li>
              <li><Link href="/produtos?q=periféricos" className="hover:text-blue-600 transition-colors">Periféricos</Link></li>
              <li><Link href="/produtos?q=gamer" className="hover:text-blue-600 transition-colors">Gaming</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-6 uppercase text-xs tracking-widest">Suporte</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li>
                <a 
                  href="https://wa.me/5500000000000?text=Olá,%20preciso%20de%20suporte%20na%20loja%20XRLTech!" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  Fale Conosco (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-medium">
          <p>© 2026 XRLTech. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
