"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroPremium() {
    return (
        <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-[#0a0a0a]">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                {/* Fallback Image / Video Placeholder */}
                <Image
                    src="https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070&auto=format&fit=crop"
                    alt="Premium Culinary Art"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white space-y-8">

                {/* Decorative Line */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-24 w-px bg-white/20"
                />

                {/* Main Heading */}
                <div className="space-y-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="block text-sm font-bold tracking-[0.3em] uppercase text-[#C8102E]"
                    >
                        Profesyonel Mutfak Çözümleri
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight"
                    >
                        Mükemmelliği <br /> Keşfedin
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-lg md:text-xl text-stone-300 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Dünyanın en prestijli markalarıyla mutfağınıza değer katın.
                        Dick, Victorinox, Zwilling ve daha fazlası.
                    </motion.p>
                </div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row items-center gap-6 pt-8"
                >
                    <Link
                        href="/products"
                        className="group relative px-8 py-4 bg-white text-[#0a0a0a] text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-[#C8102E] hover:text-white"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Koleksiyonu İncele <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>

                    <Link
                        href="/contact"
                        className="text-white text-sm font-bold uppercase tracking-widest hover:text-[#C8102E] transition-colors relative group"
                    >
                        İletişime Geç
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C8102E] transition-all duration-300 group-hover:w-full" />
                    </Link>
                </motion.div>

            </div>

            {/* Bottom Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-stone-400">Keşfet</span>
                <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
}
