"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Product {
    id: string;
    name_de: string;
    description_de: string;
    category: string;
    brand: string;
    price?: string;
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
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300 border border-stone-100"
        >
            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.brand === 'canadam' && (
                    <Badge className="bg-[#C8102E] hover:bg-[#A00C24] text-white border-none uppercase tracking-wider text-[10px] font-bold rounded-full px-3">
                        Canadam
                    </Badge>
                )}
                {product.price && (
                    <Badge variant="outline" className="bg-white/90 backdrop-blur text-stone-900 border-stone-200 uppercase tracking-wider text-[10px] font-bold rounded-full px-3">
                        €{product.price}
                    </Badge>
                )}
            </div>

            {/* Image Area */}
            <div className="relative aspect-square bg-stone-50 p-8 group-hover:bg-stone-100/50 transition-colors">
                {product.images?.[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name_de}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <span className="text-stone-300 font-bold uppercase text-xs">No Image</span>
                    </div>
                )}

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-stone-900 px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#C8102E] hover:text-white">
                        View Details
                    </button>
                </div>
            </div>

            {/* Info Area */}
            <div className="p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E] mb-2">
                    {product.category || 'Collection'}
                </div>
                <h3 className="font-bold text-stone-900 text-lg leading-tight mb-2 group-hover:text-[#C8102E] transition-colors line-clamp-2 min-h-[50px]">
                    {product.name_de}
                </h3>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                    <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                        {product.productCode || 'Item'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#C8102E] transform group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </motion.div>
    );
}
