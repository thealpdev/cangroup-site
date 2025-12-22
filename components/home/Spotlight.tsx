"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Spotlight() {
    const [products, setProducts] = useState<any[]>([]);

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
                    <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs block mb-2">Editor's Choice</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#0a0a0a]">Öne Çıkanlar</h2>
                </div>
                <div className="hidden md:flex gap-2">
                    {/* Navigation hints could go here */}
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto pb-12 gap-6 px-4 md:px-0 container mx-auto snap-x scrollbar-hide">
                {products.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="min-w-[280px] md:min-w-[320px] snap-center group"
                    >
                        <Link href={`/products/${item.id}`} className="block h-full bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                                <Image
                                    src={item.images?.[0] || item.image}
                                    alt={item.name_de || item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay Actions */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                                    <Button className="w-full bg-white text-black hover:bg-[#C8102E] hover:text-white border-none font-bold">
                                        İncele
                                    </Button>
                                </div>
                                {/* Badge */}
                                <div className="absolute top-4 left-4 bg-[#C8102E] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                    Yeni
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                                <h3 className="font-bold text-stone-900 text-lg leading-tight mb-2 group-hover:text-[#C8102E] transition-colors">
                                    {item.name_de || item.name_en}
                                </h3>
                                <div className="mt-auto pt-4 border-t border-stone-50 flex items-center justify-between">
                                    <span className="text-xl font-bold text-stone-900">
                                        {item.price ? `€${item.price}` : 'Fiyat Sorunuz'}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
