"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Spotlight() {
    const [products, setProducts] = useState<any[]>([]);
    const t = useTranslations('Homepage');
    const tProd = useTranslations('Products');

    useEffect(() => {
        const fetchProducts = async () => {
            // Fetch latest 8 products
            const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(8));
            const snap = await getDocs(q);
            setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        };
        fetchProducts();
    }, []);

    if (products.length === 0) return null;

    return (
        <section className="py-24 bg-stone-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-12 flex items-end justify-between">
                <div>
                    <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs block mb-2">{t('editorsChoice')}</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#0a0a0a]">{t('featuredTitle')}</h2>
                </div>
                <div className="hidden md:flex gap-2">
                    {/* Navigation hints could go here */}
                </div>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="flex gap-4 md:gap-8 overflow-x-auto pb-12 px-6 md:px-0 container mx-auto scrollbar-hide snap-x items-start">
                {products.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="min-w-[160px] md:min-w-[220px] snap-start group cursor-pointer"
                    >
                        <Link href={`/products/${item.id}`} className="block h-full">
                            {/* Image - Pure & Simple */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#fafafa]">
                                <Image
                                    src={item.images?.[0] || item.image}
                                    alt={item.name_de || item.name_en || 'Product'}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Hover: Quick Add */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="bg-white text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        {tProd('view')}
                                    </div>
                                </div>
                            </div>

                            {/* Text - Clean & Spacious */}
                            <div className="pt-3 text-center md:text-left">
                                <h3 className="font-medium text-stone-900 text-xs md:text-sm leading-tight truncate px-1">
                                    {item.name_de || item.name_en}
                                </h3>
                                <div className="mt-1 text-xs font-bold text-stone-400 px-1 decoration-stone-300 group-hover:text-[#C8102E] transition-colors">
                                    {item.price ? `${item.currency === 'TRY' ? '₺' : '€'}${item.price}` : ''}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
