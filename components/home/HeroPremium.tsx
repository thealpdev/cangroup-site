"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useTranslations, useLocale } from "next-intl";

export default function HeroPremium() {
    const [current, setCurrent] = useState(0);
    const [slides, setSlides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const t = useTranslations('Homepage');
    const locale = useLocale();

    useEffect(() => {
        const q = query(collection(db, "hero"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (items.length > 0) {
                setSlides(items);
            } else {
                // Fallback demo slide
                setSlides([
                    {
                        id: 'demo',
                        title_de: t('heroTitle'),
                        subtitle_de: t('heroSubtitle'),
                        cta_de: t('heroCta'),
                        title_tr: t('heroTitle'),
                        subtitle_tr: t('heroSubtitle'),
                        cta_tr: t('heroCta'),
                        title_en: t('heroTitle'),
                        subtitle_en: t('heroSubtitle'),
                        cta_en: t('heroCta'),
                        title_fr: t('heroTitle'),
                        subtitle_fr: t('heroSubtitle'),
                        cta_fr: t('heroCta'),
                        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070",
                        link: "/products"
                    }
                ]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [t]);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        if (slides.length <= 1) return;
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        if (slides.length <= 1) return;
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    if (loading) return <div className="h-screen bg-black" />;

    // If no slides, show demo slide
    if (slides.length === 0) {
        const demoSlide = {
            id: 'demo',
            title_de: 'Professionelle Messer',
            title_tr: 'Profesyonel B çaklar',
            title_en: 'Professional Knives',
            title_fr: 'Couteaux Professionnels',
            subtitle_de: 'PREMIUM QUALITÄT',
            subtitle_tr: 'PREMIUM KALİTE',
            subtitle_en: 'PREMIUM QUALITY',
            subtitle_fr: 'QUALITÉ PREMIUM',
            cta_de: 'Jetzt Entdecken',
            cta_tr: 'Şimdi Keşfet',
            cta_en: 'Discover Now',
            cta_fr: 'Découvrir',
            image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070",
            link: "/products"
        };
        const title = demoSlide[`title_${locale}` as keyof typeof demoSlide] || demoSlide.title_de;
        const subtitle = demoSlide[`subtitle_${locale}` as keyof typeof demoSlide] || demoSlide.subtitle_de;
        const cta = demoSlide[`cta_${locale}` as keyof typeof demoSlide] || demoSlide.cta_de;

        return (
            <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={demoSlide.image}
                        alt={String(title)}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
                </div>
                <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
                    <p className="text-[#C8102E] font-bold tracking-[0.3em] uppercase mb-6 text-sm md:text-base drop-shadow-lg">
                        {subtitle}
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-10 leading-tight drop-shadow-2xl">
                        {title}
                    </h1>
                    <Link
                        href={demoSlide.link}
                        className="inline-flex items-center gap-4 bg-white text-[#0a0a0a] px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#C8102E] hover:text-white transition-all duration-300 group shadow-xl"
                    >
                        {cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
        );
    }

    const slide = slides[current] || slides[0];

    // Get localized content with fallback to German
    const title = slide[`title_${locale}`] || slide.title_de || slide.title || '';
    const subtitle = slide[`subtitle_${locale}`] || slide.subtitle_de || slide.subtitle || '';
    const cta = slide[`cta_${locale}`] || slide.cta_de || slide.cta || t('heroCta');

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
            {/* Background Image Slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id + current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={slide.image}
                        alt={title || "Hero"}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 20, ease: "linear" }}
                        className="absolute inset-0 bg-transparent"
                    />
                    {/* Enhanced gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
                <motion.div
                    key={`text-${current}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-4xl"
                >
                    {subtitle && (
                        <p className="text-[#C8102E] font-bold tracking-[0.3em] uppercase mb-6 text-sm md:text-base drop-shadow-lg">
                            {subtitle}
                        </p>
                    )}

                    {title && (
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-10 leading-tight drop-shadow-2xl">
                            {title}
                        </h1>
                    )}

                    {slide.link && (
                        <Link
                            href={slide.link}
                            className="inline-flex items-center gap-4 bg-white text-[#0a0a0a] px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#C8102E] hover:text-white transition-all duration-300 group shadow-xl"
                        >
                            {cta}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </motion.div>
            </div>

            {/* Slider Navigation (Dots) */}
            {slides.length > 1 && (
                <div className="absolute bottom-12 left-0 w-full z-20 flex justify-center gap-4">
                    {slides.map((_, idx) => (
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
            )}

            {/* Slider Arrows */}
            {slides.length > 1 && (
                <>
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-20 hidden md:block">
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-20 hidden md:block">
                        <ChevronRight className="w-10 h-10" />
                    </button>
                </>
            )}
        </section>
    );
}
