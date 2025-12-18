"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
    const [heroImage, setHeroImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().heroImage) {
                    setHeroImage(docSnap.data().heroImage);
                }
            } catch (error) {
                console.error("Error fetching hero image:", error);
            }
        };
        fetchSettings();
    }, []);

    const bgImage = heroImage || "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop"; // Premium placeholder (Dark Knife)

    return (
        <div className="relative w-full h-[85vh] overflow-hidden">
            {/* Background  */}
            <div className="absolute inset-0">
                <Image
                    src={bgImage}
                    alt="Premium Knife Collection"
                    fill
                    className="object-cover brightness-[0.7] scale-105" // Slight zoom and dark
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-4xl space-y-8"
                >
                    <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-stone-300 font-light">
                        Official Wholesale Distribution
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl font-serif">
                        Mastery in <br />
                        <span className="italic font-light text-stone-200">Every Blade</span>
                    </h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <button className="px-10 py-4 border border-white/30 text-white rounded-none uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 mt-8 backdrop-blur-sm">
                            Explore Collection
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
            </motion.div>
        </div>
    );
}
