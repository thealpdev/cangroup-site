```javascript
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HeroPremium() {
    const [current, setCurrent] = useState(0);
    const [slides, setSlides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "hero"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (items.length > 0) {
                setSlides(items);
            } else {
                // Fallback demo slide if admin is empty
                setSlides([
                    {
                        id: 'demo',
                        title: "Profesyonel Mutfak",
                        subtitle: "CanMarkt Kalitesiyle",
                        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070",
                        link: "/products",
                        cta: "Alışverişe Başla"
                    }
                ]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    if (loading) return <div className="h-screen bg-black" />;
    
    // Safety check
    if (slides.length === 0) return null;
    const slide = slides[current] || slides[0];

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Background Image Slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id + current} // Force re-render key
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <Image 
                         src={slide.image}
                         alt={slide.title || "Hero"}
                         fill
                         className="object-cover opacity-60"
                         priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/60" />
                </motion.div>
            </AnimatePresence>

            {/* Content Content - Centered */}
            <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
                <motion.div
                    key={`text - ${ current } `}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
            </div>

            {/* Slider Navigation (Dots) */}
            <div className="absolute bottom-12 left-0 w-full z-20 flex justify-center gap-4">
                {SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={cn(
                            "w-12 h-1 transition-all duration-300",
                            idx === current ? "bg-white" : "bg-white/20 hover:bg-white/40"
                        )}
                    />
                ))}
            </div>

            {/* Slider Arrows */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-20 hidden md:block">
                <ChevronLeft className="w-10 h-10" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-20 hidden md:block">
                <ChevronRight className="w-10 h-10" />
            </button>
        </section>
    );
}
