'use client';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProductById } from "./actions";
import { ProductDetailsClient } from "./ProductDetailsClient";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function ProductPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (id) {
        const data = await getProductById(id);
        setProduct(data);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 font-bold text-zinc-500">Carregando detalhes...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Produto não encontrado</h2>
        <Link href="/produtos" className="text-blue-600 hover:underline mt-4 inline-block">Voltar para a loja</Link>
      </div>
    );
  }

  return <ProductDetailsClient product={product} />;
}

export default function ProductDetailsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950/50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Suspense fallback={<div className="text-center py-20">Carregando...</div>}>
            <ProductPageContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
