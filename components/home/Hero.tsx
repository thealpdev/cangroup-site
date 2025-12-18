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
                if (docSnap.exists() && docSnap.data().hero_banner) {
                    setHeroImage(docSnap.data().hero_banner);
                }
            } catch (error) {
                console.error("Error fetching hero image:", error);
            }
        };
        fetchSettings();
    }, []);

    // Default premium image if none set
    const bgImage = heroImage || "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop";

    return (
        <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-stone-100 group">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={bgImage}
                    alt="Hero Banner"
                    fill
                    className="object-cover transition-transform duration-1000 md:group-hover:scale-105"
                    priority
                />
            </div>

            {/* Swiss Red Content Block */}
            <div className="absolute top-1/2 left-0 md:left-12 lg:left-24 -translate-y-1/2 w-full md:w-[500px] z-10 px-6 md:px-0">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-[#C8102E] p-8 md:p-12 text-white shadow-2xl skew-x-0"
                >
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white/90">
                        Official Partner
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight mb-6">
                        Precision <br /> Meet <br /> Passion
                    </h1>
                    <p className="text-white/90 text-lg font-medium leading-relaxed mb-8 max-w-sm">
                        Discover the ultimate collection of professional cutlery. Engineered for excellence.
                    </p>
                    <button className="bg-white text-[#C8102E] px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-stone-900 hover:text-white transition-colors">
                        View Products
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
