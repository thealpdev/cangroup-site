"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface Product {
    id: string;
    name_de: string;
    description_de: string;
    category: string;
    brand: string;
    images: string[];
}

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white border border-stone-200 hover:border-[#C8102E] transition-colors duration-300 cursor-pointer"
        >
            {/* Brand Badge - Classic Style */}
            {product.brand === 'canadam' && (
                <div className="absolute top-0 left-0 z-10">
                    <div className="bg-[#C8102E] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                        Canadam
                    </div>
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-white p-8">
                {product.images?.[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name_de}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-stone-50">
                        <span className="text-stone-300 font-bold uppercase text-xs">No Image</span>
                    </div>
                )}
            </div>

            {/* Info Section - Sharp & Structured */}
            <div className="p-6 border-t border-stone-100 bg-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E] mb-2">
                    {product.category || 'Collection'}
                </p>
                <h3 className="font-bold text-stone-900 text-lg leading-tight mb-4 group-hover:text-[#C8102E] transition-colors">
                    {product.name_de}
                </h3>
                <button className="w-full py-3 border border-stone-200 text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                    View Details
                </button>
            </div>
        </motion.div>
    );
}
