"use client";

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const DEFAULT_COLLECTIONS = [
    {
        title: "The Butcher's Choice",
        subtitle: "Professional Series",
        image: "https://images.unsplash.com/photo-1606859191214-25806e8e2423?q=80&w=1958&auto=format&fit=crop",
        link: "/catalog?category=Butcher"
    },
    {
        title: "Chef's Essentials",
        subtitle: "Culinary Perfection",
        image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2080&auto=format&fit=crop",
        link: "/catalog?category=Chef"
    },
    {
        title: "Sharpening & Care",
        subtitle: "Maintain the Edge",
        image: "https://images.unsplash.com/photo-1588614605030-22d73384f506?q=80&w=1978&auto=format&fit=crop",
        link: "/catalog?category=Accessories"
    }
];

export default function CollectionShowcase() {
    const [collections, setCollections] = useState(DEFAULT_COLLECTIONS);

    useEffect(() => {
        const docRef = doc(db, "settings", "home");
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().collections) {
                const data = docSnap.data().collections;
                if (Array.isArray(data) && data.length === 3) {
                    setCollections(data);
                }
            }
        }, (error) => console.error("Collections fetch error:", error));

        return () => unsubscribe();
    }, []);

    // Ensure we have 3 items even if fetch fails/returns partial
    const displayCols = collections.length === 3 ? collections : DEFAULT_COLLECTIONS;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <span className="text-[#C8102E] font-bold uppercase tracking-widest text-xs">Curated Collections</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c]">Designed for <span className="italic text-stone-400">Purpose</span></h2>
                    </div>
                    <Link href="/catalog" className="hidden md:flex items-center gap-2 text-stone-900 border-b border-stone-900 pb-1 hover:text-[#C8102E] hover:border-[#C8102E] transition-all uppercase text-xs font-bold tracking-widest">
                        View All Collections <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">

                    {/* Item 1: Large (Left) */}
                    <Link href={displayCols[0].link} className="group relative overflow-hidden rounded-xl md:col-span-2 lg:col-span-2 h-[300px] lg:h-full cursor-pointer">
                        <Image
                            src={displayCols[0].image}
                            alt={displayCols[0].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute bottom-0 left-0 p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">{displayCols[0].subtitle}</span>
                            <h3 className="text-3xl font-serif italic">{displayCols[0].title}</h3>
                        </div>
                    </Link>

                    {/* Right Column Stack */}
                    <div className="grid grid-rows-2 gap-6 h-[600px] lg:h-full md:col-span-2 lg:col-span-1">
                        {/* Item 2 */}
                        <Link href={displayCols[1].link} className="group relative overflow-hidden rounded-xl h-full cursor-pointer row-span-1">
                            <Image
                                src={displayCols[1].image}
                                alt={displayCols[1].title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">{displayCols[1].subtitle}</span>
                                <h3 className="text-2xl font-serif italic">{displayCols[1].title}</h3>
                            </div>
                        </Link>

                        {/* Item 3 */}
                        <Link href={displayCols[2].link} className="group relative overflow-hidden rounded-xl h-full cursor-pointer row-span-1">
                            <Image
                                src={displayCols[2].image}
                                alt={displayCols[2].title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">{displayCols[2].subtitle}</span>
                                <h3 className="text-2xl font-serif italic">{displayCols[2].title}</h3>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/catalog" className="inline-flex items-center gap-2 text-stone-900 border-b border-stone-900 pb-1 uppercase text-xs font-bold tracking-widest">
                        View All Collections <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
