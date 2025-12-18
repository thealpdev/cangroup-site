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
            className="group relative bg-white border border-stone-100 overflow-hidden cursor-pointer"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
                {product.images?.[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name_de}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-stone-100">
                        <span className="text-stone-300 font-light tracking-widest uppercase text-xs">No Image</span>
                    </div>
                )}

                {/* Brand Badge */}
                {product.brand === 'canadam' && (
                    <div className="absolute top-4 left-4 z-10">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur text-stone-900 border-none font-normal tracking-wide text-xs px-3 py-1 uppercase">Canadam</Badge>
                    </div>
                )}

                {/* Quick Details Overlay (Slide Up) */}
                <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border-t border-stone-100 block">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                            {product.category || 'Kitchen Collection'}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
                        >
                            View Details
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Info Below Card */}
            <div className="p-6 text-center space-y-2 bg-white group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-shadow duration-500 relative z-20">
                <h3 className="font-medium text-stone-900 text-lg leading-snug group-hover:text-stone-600 transition-colors">
                    {product.name_de}
                </h3>
                {/* Price could go here if added later */}
                <div className="w-8 h-[1px] bg-stone-200 mx-auto mt-4 group-hover:w-16 transition-all duration-500" />
            </div>
        </motion.div>
    );
}
