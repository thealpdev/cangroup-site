"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    const [heroImage, setHeroImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().hero_banner) {
                    setHeroImage(docSnap.data().hero_banner);
                }
            } catch (error) {
                console.error("Error fetching hero image:", error);
            }
        };
        fetchSettings();
    }, []);

    const bgImage = heroImage || "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop";

    return (
        <div className="relative w-full h-[75vh] md:h-[85vh] min-h-[600px] bg-stone-900 overflow-hidden group">

            {/* Background Layer with Parallax-like scale */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={bgImage}
                    alt="CanGroup Hero"
                    fill
                    className="object-cover transition-transform duration-[20s] ease-in-out group-hover:scale-105 opacity-90"
                    priority
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="relative h-full container mx-auto px-6 flex items-center">
                <div className="max-w-2xl text-white pt-20">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-[2px] bg-[#C8102E]"></span>
                            <span className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-stone-300">
                                Professional Cutlery
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight mb-8">
                            Master <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400">Precision</span>
                        </h1>

                        <p className="text-lg md:text-xl text-stone-300 font-light leading-relaxed mb-10 max-w-lg border-l-2 border-[#C8102E] pl-6">
                            Experience the finest collection of German and Swiss engineering.
                            Built for professionals who demand excellence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group relative px-8 py-4 bg-[#C8102E] text-white font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:bg-[#A00C24]">
                                <span className="relative z-10 flex items-center gap-3">
                                    Explore Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-stone-900 transition-colors">
                                View Brands
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            </motion.div>
        </div>
    );
}
