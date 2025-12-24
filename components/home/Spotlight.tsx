"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Sparkles, Eye, TrendingUp } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function Spotlight() {
    const [products, setProducts] = useState<any[]>([]);
    const t = useTranslations('Homepage');
    const tProd = useTranslations('Products');
    const locale = useLocale();

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(6));
            const snap = await getDocs(q);
            setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        };
        fetchProducts();
    }, []);

    if (products.length === 0) return null;

    return (
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-stone-50">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,16,46,0.03),transparent_50%)]" />

            <div className="container mx-auto px-4 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C8102E]/10 to-[#C8102E]/5 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-[#C8102E]" />
                        <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs">
                            {t('editorsChoice')}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-4">
                        {t('featuredTitle')}
                    </h2>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Uzmanlarımız tarafından seçilen, kalite ve performansın zirvesindeki ürünler
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {products.map((item, i) => {
                        const displayName = item[`name_${locale}`] || item.name_de || item.name_en || 'Product';
                        const currencySymbol = item.currency === 'TRY' ? '₺' : item.currency === 'USD' ? '$' : '€';

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Link href={`/products/${item.id}`} className="group block">
                                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 hover:border-[#C8102E]/20">
                                        {/* Badge for New/Sale */}
                                        {item.isNew && (
                                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                {tProd('new')}
                                            </div>
                                        )}
                                        {item.isSale && (
                                            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg">
                                                {tProd('sale')}
                                            </div>
                                        )}

                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
                                            <Image
                                                src={item.images?.[0] || item.image || '/placeholder.png'}
                                                alt={displayName}
                                                fill
                                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                            />

                                            {/* Gradient Overlay on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* View Button */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="bg-white/95 backdrop-blur-sm text-stone-900 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    {tProd('view')}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-5">
                                            <h3 className="font-semibold text-stone-900 text-sm md:text-base mb-2 line-clamp-2 leading-tight group-hover:text-[#C8102E] transition-colors duration-300">
                                                {displayName}
                                            </h3>

                                            <div className="flex items-center justify-between">
                                                {item.price && (
                                                    <div className="flex items-baseline gap-2">
                                                        {item.isSale && item.salePrice ? (
                                                            <>
                                                                <span className="text-lg font-bold text-[#C8102E]">
                                                                    {currencySymbol}{item.salePrice}
                                                                </span>
                                                                <span className="text-sm text-stone-400 line-through">
                                                                    {currencySymbol}{item.price}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-lg font-bold text-stone-900">
                                                                {currencySymbol}{item.price}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {item.brand && (
                                                    <span className="text-xs text-stone-500 uppercase tracking-wider">
                                                        {item.brand}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom Accent Line */}
                                        <div className="h-1 bg-gradient-to-r from-[#C8102E] via-[#C8102E]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-[#C8102E] font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all duration-300 group"
                    >
                        {t('viewAll')}
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
