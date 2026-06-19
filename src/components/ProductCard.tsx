'use client';

import { ShoppingCart, Star, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

interface ProductProps {
  id: string | number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

export function ProductCard({ product }: { product: ProductProps }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-xl transition-all flex flex-col">
      <Link href={`/produto?id=${product.id}`} className="aspect-square bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden block">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 group-hover:scale-110 transition-transform duration-500">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <button 
          onClick={handleAddToCart}
          className={`absolute bottom-4 right-4 p-3 rounded-full transition-all duration-300 shadow-lg cursor-pointer z-10 ${added ? 'bg-emerald-500 text-white translate-y-0 opacity-100' : 'bg-blue-600 text-white translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}
        >
          {added ? <Check size={20} /> : <ShoppingCart size={20} />}
        </button>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{product.category}</span>
        <Link href={`/produto?id=${product.id}`} className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 transition-colors line-clamp-2">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mt-2 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-700"} 
            />
          ))}
          <span className="text-xs text-zinc-500 ml-1">({product.rating}.0)</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
