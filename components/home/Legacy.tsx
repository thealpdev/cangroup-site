"use client";

import { useRef, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Legacy() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

    const [content, setContent] = useState({
        title: "The Legacy",
        quote: "We don't just sell knives. We deliver tradition.",
        bgImage: "https://images.unsplash.com/photo-1567606403217-10874e532a32?q=80&w=2670&auto=format&fit=crop"
    });

    useEffect(() => {
        const docRef = doc(db, "settings", "home");
        const unsubscribe = onSnapshot(docRef, (docSnap: any) => {
            if (docSnap.exists() && docSnap.data().legacy) {
                const data = docSnap.data().legacy;
                setContent(prev => ({ ...prev, ...data }));
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <section ref={ref} className="relative h-[80vh] overflow-hidden flex items-center justify-center">
            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
            >
                {/* Using a darker, more industrial/craftsmanship focused image */}
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${content.bgImage}")` }}
                />
                <div className="absolute inset-0 bg-black/60" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div style={{ opacity }} className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-[#C8102E] font-bold uppercase tracking-[0.5em] text-sm md:text-base">{content.title}</h2>

                    <p className="text-3xl md:text-5xl lg:text-6xl text-white font-serif leading-tight">
                        {content.quote}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-white/80">
                        <div className="space-y-2">
                            <div className="text-3xl font-bold font-serif text-white">100+</div>
                            <div className="text-xs uppercase tracking-widest text-[#C8102E]">Years of History</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold font-serif text-white">58</div>
                            <div className="text-xs uppercase tracking-widest text-[#C8102E]">HRC Hardness</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold font-serif text-white">Lifetime</div>
                            <div className="text-xs uppercase tracking-widest text-[#C8102E]">Warranty</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
