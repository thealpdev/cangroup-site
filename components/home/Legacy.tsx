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
        <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
            >
                {/* Using a darker, more industrial/craftsmanship focused image */}
                <div
                    className="w-full h-full bg-cover bg-center opacity-40 grayscale-[20%]"
                    style={{ backgroundImage: `url("${content.bgImage}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div style={{ opacity }} className="max-w-5xl mx-auto flex flex-col items-center gap-12">

                    <div className="flex flex-col items-center gap-4">
                        <span className="h-[1px] w-24 bg-[#C8102E]" />
                        <h2 className="text-white/60 font-medium uppercase tracking-[0.4em] text-xs md:text-sm">{content.title}</h2>
                    </div>

                    <p className="text-4xl md:text-7xl text-white font-serif leading-tight italic">
                        "{content.quote}"
                    </p>

                    <p className="max-w-xl text-stone-400 font-light leading-relaxed text-lg">
                        Forged in fire, finished by hand. A tradition of excellence that has defined German craftsmanship for over a century.
                    </p>

                </motion.div>
            </div>
        </section>
    );
}
