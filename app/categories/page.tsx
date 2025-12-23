'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, ArrowRight } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    image_url?: string;
    description?: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Try sorting by order if it exists, otherwise by name
                const q = query(collection(db, "categories"), orderBy("name", "asc"));
                const snapshot = await getDocs(q);
                const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Category[];
                setCategories(items);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#C8102E] animate-spin mb-4" />
                <p className="text-stone-500 font-medium animate-pulse">Kategoriler yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Keşfet
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#0a0a0a] mb-4">
                        Koleksiyonlar
                    </h1>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        Profesyonel mutfaklar ve şefler için özenle seçilmiş, üstün kaliteli bıçak ve ekipman kategorilerimizi keşfedin.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${encodeURIComponent(category.name)}`}
                            className="group relative h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 bg-stone-200">
                                {category.image_url ? (
                                    <Image
                                        src={category.image_url}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">
                                        <ArrowRight className="w-12 h-12" />
                                    </div>
                                )}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h2 className="text-3xl font-serif font-bold mb-2 group-hover:text-[#C8102E] transition-colors">
                                        {category.name}
                                    </h2>
                                    <p className="text-white/70 line-clamp-2 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500">
                                        {category.description || "Bu koleksiyondaki özel ürünleri inceleyin."}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                                        <span>İncele</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
