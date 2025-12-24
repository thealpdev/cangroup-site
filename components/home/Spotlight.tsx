"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function Spotlight() {
    const [products, setProducts] = useState<any[]>([]);
    const t = useTranslations('Homepage');
    const tProd = useTranslations('Products');
    const locale = useLocale();

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(8));
            const snap = await getDocs(q);
            setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        };
        fetchProducts();
    }, []);

    if (products.length === 0) return null;

    return (
        <section className="py-16 bg-white border-y border-stone-100">
            <div className="container mx-auto px-4">
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-[#C8102E]" />
                        <div>
                            <span className="text-[#C8102E] font-bold tracking-[0.15em] uppercase text-xs block">
                                {t('editorsChoice')}
                            </span>
                            <h2 className="text-2xl font-serif text-stone-900">
                                {t('featuredTitle')}
                            </h2>
                        </div>
                    </div>
                    <Link
                        href="/products"
                        className="hidden md:flex items-center gap-2 text-stone-600 hover:text-[#C8102E] text-sm font-medium transition-colors"
                    >
                        {t('viewAll')}
                        <span>→</span>
                    </Link>
                </div>

                {/* Horizontal Scroll */}
                <div className="relative overflow-hidden -mx-4 px-4">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                        {products.map((item, i) => {
                            const displayName = item[`name_${locale}`] || item.name_de || item.name_en || 'Product';
                            const currencySymbol = item.currency === 'TRY' ? '₺' : item.currency === 'USD' ? '$' : '€';

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    viewport={{ once: true }}
                                    className="min-w-[180px] snap-start"
                                >
                                    <Link href={`/products/${item.id}`} className="group block">
                                        <div className="relative bg-white rounded-lg overflow-hidden border border-stone-200 hover:border-[#C8102E]/30 hover:shadow-lg transition-all duration-300">
                                            {/* Badges */}
                                            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                                                {item.isNew && (
                                                    <span className="px-2 py-0.5 bg-yellow-400 text-white text-[9px] font-bold rounded uppercase">
                                                        {tProd('new')}
                                                    </span>
                                                )}
                                                {item.isSale && (
                                                    <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded uppercase">
                                                        {tProd('sale')}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Image */}
                                            <div className="relative aspect-[3/4] bg-stone-50">
                                                <Image
                                                    src={item.images?.[0] || item.image || '/placeholder.png'}
                                                    alt={displayName}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                {/* Quick View */}
                                                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                    <div className="bg-white/95 backdrop-blur-sm text-stone-900 py-1.5 rounded text-center text-[10px] font-bold uppercase tracking-wider">
                                                        {tProd('view')}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="p-3">
                                                <h3 className="text-xs font-medium text-stone-900 mb-1 line-clamp-2 leading-tight group-hover:text-[#C8102E] transition-colors">
                                                    {displayName}
                                                </h3>

                                                <div className="flex items-center justify-between">
                                                    {item.price && (
                                                        <div className="flex items-baseline gap-1">
                                                            {item.isSale && item.salePrice ? (
                                                                <>
                                                                    <span className="text-sm font-bold text-[#C8102E]">
                                                                        {currencySymbol}{item.salePrice}
                                                                    </span>
                                                                    <span className="text-[10px] text-stone-400 line-through">
                                                                        {currencySymbol}{item.price}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="text-sm font-bold text-stone-900">
                                                                    {currencySymbol}{item.price}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile View All */}
                <div className="md:hidden text-center mt-6">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-[#C8102E] text-sm font-bold uppercase tracking-wider"
                    >
                        {t('viewAll')}
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
