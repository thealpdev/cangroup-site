"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FEATURED = [
    {
        id: "demo-1",
        name: "Santoku Damascus",
        price: "€249",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop", // Placeholder
        tag: "Best Seller"
    },
    {
        id: "demo-2",
        name: "Chef's Classic 20cm",
        price: "€89",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop",
        tag: "Essential"
    },
    {
        id: "demo-3",
        name: "Boning Knife Flex",
        price: "€45",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop",
        tag: "Pro Choice"
    },
    {
        id: "demo-4",
        name: "Slicing Knife 30cm",
        price: "€110",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop",
        tag: "New Arrival"
    }
];

export default function Spotlight() {
    const containerRef = useRef(null);

    return (
        <section className="py-24 bg-[#111] text-white overflow-hidden">
            <div className="container mx-auto px-4 mb-12 flex items-end justify-between">
                <div>
                    <span className="text-[#C8102E] font-bold uppercase tracking-widest text-xs">In the Spotlight</span>
                    <h2 className="text-4xl font-serif mt-4">Curator's <span className="italic text-stone-500">Pick</span></h2>
                </div>

                <div className="flex gap-2">
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                        ←
                    </button>
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                        →
                    </button>
                </div>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="flex gap-6 overflow-x-auto pb-12 px-4 container mx-auto scrollbar-hide snap-x">
                {FEATURED.map((item, i) => (
                    <motion.div
                        key={i}
                        className="min-w-[300px] md:min-w-[400px] snap-center"
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative aspect-[3/4] bg-[#1a1a1a] rounded-xl overflow-hidden mb-6 group cursor-pointer">
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-white/10 backdrop-blur text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                                    {item.tag}
                                </span>
                            </div>
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                                <span className="text-white uppercase text-xs font-bold tracking-widest flex items-center gap-2">
                                    View Product <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif italic mb-1">{item.name}</h3>
                            <p className="text-stone-500 font-mono text-sm">{item.price}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
