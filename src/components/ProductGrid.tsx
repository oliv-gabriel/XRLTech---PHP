import { ProductCard } from './ProductCard';

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

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Destaques</h2>
            <p className="text-zinc-500 mt-2">Os produtos mais desejados do momento.</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline cursor-pointer">Ver todos</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
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
      </div>
    </section>
  );
}
