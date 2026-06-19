'use client';
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { getProducts } from "./actions";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getProducts(8);
      setProducts(data);
    }
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductGrid products={products} />
        
        {/* About Section */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                 <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-bold italic">
                   [Imagem Institucional XRLTech]
                 </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Por que escolher a XRLTech?</h2>
                <p className="text-zinc-500 leading-relaxed">
                  Na XRLTech, acreditamos que a tecnologia deve ser acessível e de alta qualidade. 
                  Trabalhamos apenas com as melhores marcas do mercado para garantir que seu setup seja imbatível.
                </p>
                <ul className="space-y-4">
                  {[
                    "Entrega rápida em todo o Brasil",
                    "Garantia oficial em todos os produtos",
                    "Atendimento especializado via chat",
                    "Melhores preços do mercado de tecnologia"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
