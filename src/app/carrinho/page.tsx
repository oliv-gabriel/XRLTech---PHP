'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const shipping = subtotal > 0 ? 25.00 : 0; // Simulated shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    const phoneNumber = "559284590004"; // SUBSTITUA PELO SEU NÚMERO COM DDD
    
    let message = `*Novo Pedido - XRLTech*\n\n`;
    message += `Olá! Gostaria de finalizar o pedido abaixo:\n\n`;
    
    items.forEach((item) => {
      message += `• *${item.name}* (x${item.quantity})\n`;
      message += `  R$ ${(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n`;
    });
    
    message += `--------------------------\n`;
    message += `*Subtotal:* R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    message += `*Frete:* R$ ${shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    message += `*TOTAL:* R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
              <ShoppingBag size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Seu Carrinho</h1>
          </div>

          {items.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-16 text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                <ShoppingBag size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Seu carrinho está vazio</h2>
                <p className="text-zinc-500">Parece que você ainda não adicionou nenhum produto tecnológico.</p>
              </div>
              <Link 
                href="/produtos" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20"
              >
                Explorar Produtos <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-all">
                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-2xl relative overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest mb-1">{item.category}</p>
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-50 truncate mb-1">{item.name}</h3>
                      <p className="text-sm font-bold text-zinc-400">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 bg-zinc-50 dark:bg-zinc-800 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-colors cursor-pointer text-zinc-500"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-extrabold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-colors cursor-pointer text-zinc-500"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex flex-col items-end gap-1 min-w-[120px]">
                      <p className="font-extrabold text-zinc-900 dark:text-zinc-50">
                        R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 transition-colors p-2 cursor-pointer"
                        title="Remover item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sticky top-24 shadow-sm">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">Resumo do Pedido</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-zinc-500 font-medium">
                      <span>Subtotal ({getTotalItems()} itens)</span>
                      <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500 font-medium">
                      <span>Frete Estimado</span>
                      <span>R$ {shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-zinc-900 dark:text-zinc-50">Total</span>
                      <span className="text-2xl font-extrabold text-blue-600">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] mb-4 cursor-pointer"
                  >
                    Finalizar Compra via WhatsApp
                  </button>
                  
                  <Link 
                    href="/produtos" 
                    className="block text-center text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Continuar Comprando
                  </Link>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-6 flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900 dark:text-blue-400 text-sm">Compra Segura XRL</p>
                    <p className="text-xs text-blue-700 dark:text-blue-500 mt-0.5">Seus dados estão protegidos por criptografia de ponta a ponta.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
