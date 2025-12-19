"use client";

import { useRef, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroV2() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    const [content, setContent] = useState({
        title: "Veni Cutlery",
        subtitle: "Where German engineering meets culinary artistry.",
        bgImage: "" // Default is empty to verify if DB update arrives
    });

    useEffect(() => {
        const docRef = doc(db, "settings", "home");
        const unsubscribe = onSnapshot(docRef, (docSnap: any) => {
            if (docSnap.exists() && docSnap.data().hero) {
                const data = docSnap.data().hero;
                // Merge properly to allow updates even if some fields are empty strings
                setContent(prev => ({ ...prev, ...data }));
            }
        }, (error: any) => {
            console.error("Hero content fetch error:", error);
        });

        return () => unsubscribe();
    }, []);

    // Parallax Effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">

            {/* Cinematic Background */}
            <div className="absolute inset-0 w-full h-full opacity-80">
                {content.bgImage && (
                    <Image
                        src={content.bgImage}
                        alt="Luxury Cutlery Background"
                        fill
                        className="object-cover transition-transform duration-[30s] ease-in-out hover:scale-110"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]" />
                <div className="absolute inset-0 bg-black/20" /> {/* Fine grain or consistent dim */}
            </div>

            {/* Floating Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">

                {/* DEBUG: Remove this after fixing */}
                <div className="absolute top-24 left-4 bg-black/50 text-white text-[10px] p-2 rounded z-50">
                    DEBUG BG: {content.bgImage || "EMPTY"}
                </div>

                <motion.div
                    style={{ y: y1, opacity }}
                    className="flex flex-col items-center gap-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="flex items-center gap-6"
                    >
                        <span className="h-[1px] w-12 md:w-24 bg-white/40"></span>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-white/80">
                            Est. 2024 • Solingen
                        </span>
                        <span className="h-[1px] w-12 md:w-24 bg-white/40"></span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                        className="text-6xl md:text-8xl lg:text-[9rem] font-serif italic text-white leading-none tracking-tight drop-shadow-2xl"
                    >
                        Masterpiece
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-stone-300 max-w-lg text-lg md:text-xl font-light leading-relaxed tracking-wide mt-4 drop-shadow-lg"
                    >
                        Where German engineering meets <br className="hidden md:block" />
                        <span className="italic text-white font-normal">culinary artistry.</span>
                    </motion.p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] uppercase tracking-widest text-white/50">Discover</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse"></div>
            </motion.div>
        </div>
    );
}
