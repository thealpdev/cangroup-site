"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
        >
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-white border border-stone-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <Image
                        src={displayImage}
                        alt={displayName}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.brand && (
                        <div className="absolute top-4 left-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 border border-stone-200 px-2 py-1 rounded bg-white/80 backdrop-blur-sm">
                                {product.brand}
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <h3 className="font-serif text-lg text-stone-900 group-hover:text-[#C8102E] transition-colors line-clamp-2">
                        {displayName}
                    </h3>
                    {product.price && (
                        <p className="font-mono text-sm text-stone-500 tracking-wider">
                            {currencySymbol}{product.price}
                        </p>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
