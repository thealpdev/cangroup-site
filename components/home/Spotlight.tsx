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
    return (
        <section className="py-32 bg-[#fff] text-[#1c1c1c] overflow-hidden">
            <div className="container mx-auto px-4 mb-20 flex items-end justify-center text-center">
                <div>
                    <span className="text-stone-400 font-medium uppercase tracking-[0.2em] text-xs">In the Spotlight</span>
                    <h2 className="text-5xl md:text-6xl font-serif mt-6 text-[#0a0a0a]">Curator's <span className="italic text-stone-300">Choice</span></h2>
                </div>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="flex gap-8 md:gap-12 overflow-x-auto pb-12 px-4 md:px-12 scrollbar-hide snap-x items-center">
                {FEATURED.map((item, i) => (
                    <motion.div
                        key={i}
                        className="min-w-[280px] md:min-w-[350px] snap-center flex-shrink-0 group cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                    >
                        <Link href={`/products/${item.id}`} className="block">
                            <div className="relative aspect-[3/4] bg-stone-50 overflow-hidden mb-8">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover object-center grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />

                                {/* Minimal Tag */}
                                <div className="absolute top-0 left-0 p-6">
                                    <span className="text-[10px] uppercase tracking-widest text-[#0a0a0a] font-bold mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {item.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-serif italic text-[#0a0a0a] group-hover:text-[#C8102E] transition-colors duration-300">{item.name}</h3>
                                <p className="text-stone-400 font-mono text-sm tracking-widest">{item.price}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {/* View All Ends Card */}
                <div className="min-w-[200px] flex items-center justify-center snap-center">
                    <Link href="/catalog" className="group flex flex-col items-center gap-4 p-8">
                        <div className="w-16 h-16 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] group-hover:text-white transition-all duration-300">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-[#0a0a0a] transition-colors">View All</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
