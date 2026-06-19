'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 py-20 lg:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            A Próxima Geração da <span className="text-blue-600">Tecnologia</span> Está Aqui.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
            Descubra os melhores gadgets, hardware e acessórios na XRLTech. 
            Qualidade premium e inovação para o seu setup.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/produtos" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center gap-2"
            >
              Comprar Agora <ArrowRight size={20} />
            </Link>
            <Link 
              href="#" 
              className="px-8 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] rounded-full -mr-64 pointer-events-none" />
    </section>
  );
}
