"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const SLIDES = [
    {
        id: 1,
        title: "Profesyonel\nMükemmellik",
        subtitle: "Dick Premier Plus Serisi",
        image: "https://images.unsplash.com/photo-1593642532744-937508af3952?q=80&w=2070",
        cta: "Koleksiyonu İncele",
        link: "/products"
    },
    {
        id: 2,
        title: "İsviçre\nHassasiyeti",
        subtitle: "Victorinox Fibrox Koleksiyonu",
        image: "https://images.unsplash.com/photo-1588611910609-0d12759e02c6?q=80&w=2070",
        cta: "Keşfet",
        link: "/products?brand=Victorinox"
    },
    {
        id: 3,
        title: "Modern\nTeknoloji",
        subtitle: "Zwilling Enfinity Lüks Seri",
        image: "https://images.unsplash.com/photo-1626202378950-84c47b5fd250?q=80&w=2070",
        cta: "Detayları Gör",
        link: "/products?brand=Zwilling"
    }
];

export default function HeroPremium() {
    const [current, setCurrent] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent(prev => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-[#0a0a0a]">

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={SLIDES[current].image}
                        alt={SLIDES[current].title}
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-[#0a0a0a]/40" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white space-y-8">

                {/* Decorative Line (Changes with slide) */}
                <motion.div
                    key={`line-${current}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-24 w-px bg-white/30"
                />

                {/* Text Content */}
                <div className="space-y-6 max-w-4xl mx-auto">
                    <motion.span
                        key={`sub-${current}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="block text-sm md:text-base font-bold tracking-[0.3em] uppercase text-[#C8102E]"
                    >
                        {SLIDES[current].subtitle}
                    </motion.span>

                    <motion.h1
                        key={`title-${current}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="font-serif text-5xl md:text-7xl lg:text-9xl leading-tight whitespace-pre-line"
                    >
                        {SLIDES[current].title}
                    </motion.h1>
                </div>

                {/* Main CTA */}
                <motion.div
                    key={`cta-${current}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Link
                        href={SLIDES[current].link}
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-[#0a0a0a] text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-[#C8102E] hover:text-white"
                    >
                        <span className="relative z-10">{SLIDES[current].cta}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                </motion.div>

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
