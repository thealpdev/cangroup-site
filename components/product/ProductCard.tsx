"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from "@/lib/cart-context";
import { ShoppingBag } from "lucide-react";

interface Product {
    id: string;
    name_en?: string;
    name_de?: string;
    name_tr?: string;
    price: string;
    currency: string;
    images?: string[];
    image?: string;
    brand?: string;
    category?: string;
}

interface ProductCardProps {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const currencySymbol = product.currency === 'USD' ? '$' : product.currency === 'TRY' ? '₺' : product.currency === 'GBP' ? '£' : '€';

    // Priority: EN -> DE -> TR -> fallback
    const displayName = product.name_en || product.name_de || product.name_tr || 'Unnamed Product';
    // Fallback image logic
    const displayImage = product.images?.[0] || product.image || '/placeholder-knife.jpg';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
        >
            <Link href={`/products/${product.id}`} className="block h-full">
                <div className="relative aspect-[3/4] mb-4 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(200,16,46,0.08)] transition-all duration-500 overflow-hidden border border-transparent group-hover:border-[#C8102E]/10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-stone-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Image
                        src={displayImage}
                        alt={displayName}
                        fill
                        className="object-contain p-8 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out drop-shadow-sm"
                    />

                    {product.brand && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-stone-100 group-hover:border-[#C8102E]/20 group-hover:text-[#C8102E] transition-colors">
                                {product.brand}
                            </span>
                        </div>
                    )}

                    {/* Quick Action Hint */}
                    <div className="absolute bottom-0 inset-x-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex justify-center gap-2">
                        <button
                            className="bg-white text-stone-900 border-stone-200 border p-3 rounded-full shadow-lg hover:bg-stone-50 hover:scale-110 transition-all"
                            title="Details ansehen"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                        </button>
                        <AddToCartButton product={product} />
                    </div>
                </div>

                <div className="space-y-1 px-2 text-center">
                    <h3 className="font-serif text-lg text-stone-900 group-hover:text-[#C8102E] transition-colors line-clamp-1">
                        {displayName}
                    </h3>
                    {product.price ? (
                        <p className="font-medium text-stone-500 text-sm">
                            {currencySymbol}{product.price}
                        </p>
                    ) : (
                        <p className="font-medium text-stone-400 text-sm italic">
                            Details ansehen
                        </p>
                    )}
                </div>
            </Link>
        </motion.div>
// ... (ProductCard function) ...

function AddToCartButton({ product }: { product: Product }) {
        const { addItem } = useCart();

        return (
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product);
                }}
                className="bg-[#C8102E] text-white p-3 rounded-full shadow-lg hover:bg-[#a00d25] hover:scale-110 transition-all"
                title="In den Warenkorb"
            >
                <ShoppingBag className="w-5 h-5" />
            </button>
        );
    }
