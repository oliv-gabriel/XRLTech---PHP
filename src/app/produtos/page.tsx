'use client';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getProducts, getCategories } from "../actions";
import { ProductList } from "@/components/ProductList";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        setProducts(productsData);
        // Extrair nomes únicos de categorias
        const uniqueNames = Array.from(new Set(categoriesData.map((c: any) => c.name))) as string[];
        setCategories(uniqueNames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950/50">
        {/* Breadcrumbs */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-xs font-medium text-zinc-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Início</Link>
            <ChevronRight size={14} />
            <span className="text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Produtos</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-20 font-bold text-zinc-500">Carregando produtos...</div>
          ) : (
            <ProductList initialProducts={products} categories={categories} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
