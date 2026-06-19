'use client';

import { createProduct } from "@/app/actions";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
}

export function ProductForm({ categories }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<{ name: string; value: string }[]>([]);

  const addFeature = () => setFeatures([...features, { name: "", value: "" }]);
  
  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const updateFeature = (index: number, field: 'name' | 'value', val: string) => {
    const newFeatures = [...features];
    newFeatures[index][field] = val;
    setFeatures(newFeatures);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('features', JSON.stringify(features.filter(f => f.name && f.value)));

    try {
      await createProduct(formData);
      alert('Produto cadastrado com sucesso!');
      const form = document.getElementById('product-form') as HTMLFormElement;
      if (form) form.reset();
      setFeatures([]);
    } catch {
      alert('Erro ao cadastrar produto.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form id="product-form" onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Nome do Produto</label>
          <input name="name" required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Preço (R$)</label>
          <input name="price" type="number" step="0.01" required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Categoria</label>
          <select name="categoryId" required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50">
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Estoque Inicial</label>
          <input name="stock" type="number" required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Imagem do Produto</label>
        <input 
          name="imageFile" 
          type="file" 
          accept="image/*"
          className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Descrição</label>
        <textarea name="description" rows={4} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50" />
      </div>

      <div className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Características / Especificações</label>
          <button 
            type="button" 
            onClick={addFeature}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>
        
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <input 
                placeholder="Nome (Ex: Cor, Peso, Resolução)" 
                value={feature.name}
                onChange={(e) => updateFeature(index, 'name', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50 text-sm" 
              />
            </div>
            <div className="flex-1 space-y-2">
              <input 
                placeholder="Valor (Ex: Preto, 1.5kg, 4K)" 
                value={feature.value}
                onChange={(e) => updateFeature(index, 'value', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 ring-blue-500/50 text-sm" 
              />
            </div>
            <button 
              type="button" 
              onClick={() => removeFeature(index)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer mt-0.5"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {features.length === 0 && (
          <p className="text-xs text-zinc-500 italic">Nenhuma característica adicionada. (Opcional)</p>
        )}
      </div>

      <button 
        disabled={isLoading}
        type="submit" 
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? 'Cadastrando...' : 'Cadastrar Produto'}
      </button>
    </form>
  );
}
