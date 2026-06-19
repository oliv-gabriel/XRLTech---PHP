'use client';

import { ProductCard } from "@/components/ProductCard";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string | null;
  rating: number;
  category?: {
    name: string;
  } | string;
}

interface ProductListProps {
  initialProducts: Product[];
  categories: string[];
}

export function ProductList({ initialProducts, categories }: ProductListProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  
  // Calculate max price from initial products to set slider bounds
  const highestPrice = initialProducts.length > 0 
    ? Math.max(...initialProducts.map(p => p.price)) 
    : 5000;
    
  const [maxPrice, setMaxPrice] = useState<number>(highestPrice);

  // Update maxPrice if highestPrice changes (e.g. products reload)
  useEffect(() => {
    setMaxPrice(highestPrice);
  }, [highestPrice]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, maxPrice, query]);

  const filteredProducts = initialProducts.filter(p => {
    const catName = typeof p.category === 'object' ? p.category.name : p.category;
    const matchesCategory = selectedCategory ? catName === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 space-y-10 shrink-0">
        <div>
          <h3 className="flex items-center gap-2 font-extrabold text-zinc-900 dark:text-zinc-50 mb-6 uppercase text-sm tracking-widest">
            <Filter size={18} className="text-blue-600" /> Filtros
          </h3>
          
          <div className="space-y-6">
            {/* Search Filter */}
            <div>
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-4">Buscar</h4>
              <div className="relative">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nome do produto..." 
                  className="w-full h-10 pl-4 pr-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 ring-blue-500/50 transition-all text-sm outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-4">Categorias</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer ${!selectedCategory ? 'bg-blue-600 text-white font-bold' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                >
                  Todas
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer ${selectedCategory === cat ? 'bg-blue-600 text-white font-bold' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-4">Preço (Até R$ {maxPrice.toLocaleString('pt-BR', { maximumFractionDigits: 0 })})</h4>
              <div className="px-2">
                 <input 
                   type="range" 
                   min="0"
                   max={highestPrice}
                   value={maxPrice}
                   onChange={(e) => setMaxPrice(Number(e.target.value))}
                   className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                 />
                 <div className="flex justify-between mt-2 text-xs text-zinc-500 font-bold">
                   <span>R$ 0</span>
                   <span>R$ {highestPrice.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Listing */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {query ? `Busca: "${query}"` : (selectedCategory || "Todos os Produtos")}
            <span className="ml-3 text-sm font-medium text-zinc-400">({filteredProducts.length} itens)</span>
          </h1>
          
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
              <SlidersHorizontal size={20} />
            </button>
            <select className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 ring-blue-500/50 outline-none">
              <option>Mais recentes</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
              <option>Mais vendidos</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || '',
                    rating: product.rating,
                    category: typeof product.category === 'object' ? product.category.name : (product.category || 'Geral')
                  }} 
                />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  Anterior
                </button>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 mb-4">
              <Filter size={32} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Nenhum produto encontrado</h3>
            <p className="text-zinc-500 mt-2">Tente ajustar o preço, categorias ou buscar por outro termo.</p>
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setMaxPrice(highestPrice);
                if (query) window.location.href = '/produtos';
              }}
              className="mt-6 text-blue-600 font-bold hover:underline cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
