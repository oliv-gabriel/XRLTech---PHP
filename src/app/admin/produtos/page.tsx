'use client';
import { ProductForm } from "@/components/ProductForm";
import { getCategories } from "@/app/actions";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Gerenciar Produtos</h1>
        <p className="text-zinc-500 mt-1">Cadastre novos itens para sua loja.</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold">Novo Produto</h2>
          <ProductForm categories={categories} />
        </section>
      </div>
    </div>
  );
}
