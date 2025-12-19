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
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-6">
                    <div className="space-y-6">
                        <span className="text-stone-500 font-medium uppercase tracking-[0.2em] text-xs">Curated Collections</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-[#0a0a0a] leading-[0.9]">
                            Designed for <br /> <span className="italic text-stone-300">Purpose</span>
                        </h2>
                    </div>
                </div>

                {/* Minimalist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 min-h-[80vh]">

                    {/* Left: Dominant Item */}
                    <div className="md:col-span-2 relative group overflow-hidden cursor-pointer">
                        <Link href={displayCols[0].link} className="block w-full h-full min-h-[400px]">
                            <Image
                                src={displayCols[0].image}
                                alt={displayCols[0].title}
                                fill
                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                <span className="text-xs uppercase tracking-[0.2em] mb-2 block">{displayCols[0].subtitle}</span>
                                <h3 className="text-4xl md:text-5xl font-serif italic">{displayCols[0].title}</h3>
                            </div>
                        </Link>
                    </div>

                    {/* Right: Stacked Items */}
                    <div className="flex flex-col gap-4 lg:gap-8">
                        {/* Top Right */}
                        <div className="flex-1 relative group overflow-hidden cursor-pointer min-h-[300px]">
                            <Link href={displayCols[1].link} className="block w-full h-full">
                                <Image
                                    src={displayCols[1].image}
                                    alt={displayCols[1].title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                                <div className="absolute bottom-8 left-8 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                    <span className="text-xs uppercase tracking-[0.2em] mb-2 block">{displayCols[1].subtitle}</span>
                                    <h3 className="text-3xl font-serif italic">{displayCols[1].title}</h3>
                                </div>
                            </Link>
                        </div>

                        {/* Bottom Right */}
                        <div className="flex-1 relative group overflow-hidden cursor-pointer min-h-[300px]">
                            <Link href={displayCols[2].link} className="block w-full h-full">
                                <Image
                                    src={displayCols[2].image}
                                    alt={displayCols[2].title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                                <div className="absolute bottom-8 left-8 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                    <span className="text-xs uppercase tracking-[0.2em] mb-2 block">{displayCols[2].subtitle}</span>
                                    <h3 className="text-3xl font-serif italic">{displayCols[2].title}</h3>
                                </div>
                            </Link>
                        </div>
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
