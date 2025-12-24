"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { getLocalizedProductName } from '@/lib/product-utils';

interface Product {
    id: string;
    name_de: string; name_tr: string; name_en: string; name_fr?: string;
    description_de: string; description_tr: string; description_en: string; description_fr?: string;
    category: string;
    brand: string;
    productCode?: string;
    price?: number | string;
    currency?: string;
    images: string[];
}

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const locale = useLocale();
    const productName = getLocalizedProductName(product, locale);

    return (
        <Link href={`/products/${product.id}`} className="block">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
            >
                {/* Image Area - Floating */}
                <div className="relative aspect-[4/5] bg-stone-50 overflow-hidden mb-6 rounded-lg">
                    {/* Brand Tag - Minimal & Top Left */}
                    {product.brand === 'canadam' && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/90 px-3 py-1">
                                Canadam
                            </span>
                        </div>
                    )}

                    {/* Image */}
                    <div className="relative w-full h-full p-8 transition-all duration-700 group-hover:scale-105">
                        {product.images?.[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={productName}
                                fill
                                className="object-contain mix-blend-multiply"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <span className="text-stone-300 font-bold uppercase text-[10px] tracking-widest">No Image</span>
                            </div>
                        )}
                    </div>

                    {/* Minimal Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-stone-900 text-xs font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            Details
                        </span>
                    </div>
                </div>

                {/* Info Area - Clean Typography */}
                <div className="text-center space-y-2">
                    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
                        {product.category || 'Collection'}
                    </div>

                    <h3 className="font-serif text-xl italic text-stone-900 group-hover:text-[#C8102E] transition-colors duration-300 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                        {productName}
                    </h3>

                    {product.price && (
                        <div className="text-xs font-bold tracking-widest text-[#0a0a0a]">
                            {product.currency === 'USD' ? '$' : product.currency === 'TRY' ? '₺' : product.currency === 'GBP' ? '£' : '€'}
                            {product.price}
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
