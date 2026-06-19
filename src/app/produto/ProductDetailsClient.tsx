'use client';

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, Check, Truck, ShieldCheck, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductFeature {
  name: string;
  value: string;
}

interface ProductDetails {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  rating: number;
  stock: number;
  features?: ProductFeature[] | null;
  category?: {
    name: string;
  };
}

export function ProductDetailsClient({ product }: { product: ProductDetails }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || '',
      category: product.category?.name || 'Geral'
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 lg:p-10 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Imagem do Produto */}
        <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl relative overflow-hidden">
          {product.image ? (
             <Image 
               src={product.image} 
               alt={product.name}
               fill
               className="object-cover"
               priority
             />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
              Sem Imagem
            </div>
          )}
        </div>

        {/* Informações do Produto */}
        <div className="flex flex-col">
          {/* Breadcrumbs Interno */}
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-6">
            <Link href="/produtos" className="hover:text-blue-600 transition-colors">Produtos</Link>
            <ChevronRight size={14} />
            <Link href={`/produtos?categoria=${product.category?.name}`} className="hover:text-blue-600 transition-colors">{product.category?.name}</Link>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-700"} 
                />
              ))}
            </div>
            <span className="text-sm font-bold text-zinc-500">({product.rating}.0) Avaliações</span>
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
            <span className={`text-sm font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
            </span>
          </div>

          <div className="mb-8">
            <span className="text-4xl font-extrabold text-blue-600">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <p className="text-sm text-zinc-500 font-medium mt-2">À vista no PIX ou em até 12x no cartão.</p>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg active:scale-[0.98] ${
              product.stock === 0 
              ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none'
              : added 
                ? 'bg-emerald-500 text-white shadow-emerald-500/25' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
            }`}
          >
            {added ? (
              <><Check size={24} /> Adicionado!</>
            ) : (
              <><ShoppingCart size={24} /> Adicionar ao Carrinho</>
            )}
          </button>

          {/* Badges de Confiança */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
             <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
               <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-blue-600">
                 <Truck size={20} />
               </div>
               <span className="text-sm font-bold">Entrega Expressa</span>
             </div>
             <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
               <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-emerald-600">
                 <ShieldCheck size={20} />
               </div>
               <span className="text-sm font-bold">Garantia de 1 Ano</span>
             </div>
          </div>
          
        </div>
      </div>

      {/* Seção de Descrição e Especificações */}
      <div className="mt-16 pt-16 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6">Descrição do Produto</h2>
          <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {product.description ? (
              <p className="whitespace-pre-wrap">{product.description}</p>
            ) : (
              <p>Nenhuma descrição detalhada disponível para este produto no momento.</p>
            )}
          </div>
        </div>

        {/* Dynamic Characteristics Section */}
        {product.features && Array.isArray(product.features) && product.features.length > 0 && (
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6">Especificações Técnicas</h2>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <tbody>
                  {product.features.map((feature: ProductFeature, index: number) => (
                    <tr 
                      key={index} 
                      className={`border-b border-zinc-200 dark:border-zinc-800 last:border-0 ${index % 2 === 0 ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''}`}
                    >
                      <th className="py-4 px-6 font-bold text-zinc-900 dark:text-zinc-50 w-1/3">
                        {feature.name}
                      </th>
                      <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">
                        {feature.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
