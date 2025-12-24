"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

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
        <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-[#C8102E]" />
                        <span className="text-[#C8102E] font-semibold tracking-wider uppercase text-xs">
                            {t('editorsChoice')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
                        {t('featuredTitle')}
                    </h2>
                    <p className="text-stone-500 text-sm max-w-xl mx-auto">
                        En beğenilen ve önerilen ürünlerimiz
                    </p>
                </div>

                {/* 6 Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8">
                    {products.map((item, i) => {
                        const displayName = item[`name_${locale}`] || item.name_de || item.name_en || 'Product';
                        const currencySymbol = item.currency === 'TRY' ? '₺' : item.currency === 'USD' ? '$' : '€';

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <Link href={`/products/${item.id}`} className="group block h-full">
                                    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100">
                                        {/* Badges - Soft */}
                                        {(item.isNew || item.isSale) && (
                                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                                                {item.isNew && (
                                                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[9px] font-semibold rounded-lg shadow-sm">
                                                        {tProd('new')}
                                                    </span>
                                                )}
                                                {item.isSale && (
                                                    <span className="px-2.5 py-1 bg-red-100 text-red-600 text-[9px] font-semibold rounded-lg shadow-sm">
                                                        {tProd('sale')}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Image - Soft */}
                                        <div className="relative aspect-square bg-stone-50 overflow-hidden">
                                            <Image
                                                src={item.images?.[0] || item.image || '/placeholder.png'}
                                                alt={displayName}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {/* Soft Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Info */}
                                        <div className="p-3">
                                            <h3 className="text-xs font-medium text-stone-800 mb-2 line-clamp-2 leading-snug group-hover:text-[#C8102E] transition-colors duration-300">
                                                {displayName}
                                            </h3>

                                            {item.price && (
                                                <div className="flex items-baseline gap-1.5">
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
                                                        <span className="text-sm font-semibold text-stone-700">
                                                            {currencySymbol}{item.price}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Button - Soft */}
                <div className="text-center">
                    <Link href="/products">
                        <Button
                            variant="outline"
                            className="group rounded-full px-8 py-6 border-2 border-stone-200 hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <span className="font-semibold tracking-wide">{t('viewAll')}</span>
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
