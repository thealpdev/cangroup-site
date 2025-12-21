"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Spotlight() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch Categories
        const fetchCategories = async () => {
            const q = query(collection(db, "categories"), orderBy("name", "asc"));
            const snap = await getDocs(q);
            setCategories(snap.docs.map(d => ({ id: d.id, name: d.data().name })));
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        setLoading(true);
        let q;
        if (selectedCategory === 'all') {
            q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(12));
        } else {
            q = query(collection(db, "products"), where("category", "==", selectedCategory), limit(12));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [selectedCategory]);

    if (products.length === 0) return null;

    return (
        <section className="py-32 bg-[#fff] text-[#1c1c1c] overflow-hidden">
            <div className="container mx-auto px-4 mb-12 flex flex-col items-center justify-center text-center">
                <div>
                    <span className="text-stone-400 font-medium uppercase tracking-[0.2em] text-xs">KEŞFET</span>
                    <h2 className="text-5xl md:text-6xl font-serif mt-6 text-[#0a0a0a]">Tüm <span className="italic text-stone-300">Ürünler</span></h2>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-2xl">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${selectedCategory === 'all' ? 'bg-[#C8102E] text-white shadow-lg' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                    >
                        Tümü
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat.name ? 'bg-[#C8102E] text-white shadow-lg' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="flex gap-8 md:gap-12 overflow-x-auto pb-12 px-4 md:px-12 scrollbar-hide snap-x items-center">
                {products.map((item, i) => (
                    <motion.div
                        key={item.id}
                        className="min-w-[220px] max-w-[220px] snap-center flex-shrink-0 group cursor-pointer relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <Link href={`/products/${item.id}`} className="block h-full">
                            {/* Card Container with Hover Lift */}
                            <div className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 ease-in-out h-full flex flex-col">

                                {/* Image Area */}
                                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                                    <Image
                                        src={item.images?.[0] || item.image}
                                        alt={item.name_de || item.name_en || 'Product'}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay Gradient on Hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                    {/* Action Button - Appears on Hover */}
                                    <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-[#C8102E] hover:text-white transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest text-[#C8102E] uppercase mb-1">
                                            {item.brand || 'CanMarkt'}
                                        </p>
                                        <h3 className="text-sm font-bold text-stone-900 line-clamp-2 leading-tight group-hover:text-[#C8102E] transition-colors">
                                            {item.name_de || item.name_en}
                                        </h3>
                                    </div>

                                    {item.price ? (
                                        <p className="text-lg font-bold text-stone-900">
                                            {item.currency === 'USD' ? '$' : item.currency === 'TRY' ? '₺' : item.currency === 'GBP' ? '£' : '€'}
                                            {item.price}
                                        </p>
                                    ) : (
                                        <span className="text-xs text-stone-400 font-medium">Fiyat Gör</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {/* View All Ends Card */}
                <div className="min-w-[200px] flex items-center justify-center snap-center">
                    <Link href="/products" className="group flex flex-col items-center gap-4 p-8">
                        <div className="w-16 h-16 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] group-hover:text-white transition-all duration-300">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-[#0a0a0a] transition-colors">Tümünü Gör</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
