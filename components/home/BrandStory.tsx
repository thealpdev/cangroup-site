"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function BrandStory() {
    return (
        <section className="relative py-20 overflow-hidden bg-[#0a0a0a] text-white my-0">
            {/* Background Texture/Image */}
            <div
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536409893998-35616b23b827?q=80&w=2660')] bg-cover bg-center bg-fixed opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

            <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <span className="text-[#C8102E] text-xs font-bold uppercase tracking-[0.3em] block">
                        Our Legacy
                    </span>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
                        Mutfakta <span className="italic text-stone-400">Mükemmellik</span> <br />
                        Bir Seçim Değil, <span className="text-[#C8102E]">Standarttır.</span>
                    </h2>

                    <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
                        1990'dan beri dünyanın en iyi şefleri için en keskin çelikleri işliyoruz.
                        CanMarkt, sadece bir bıçak satıcısı değil, mutfak sanatının bir parçasıdır.
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-white border border-white/20 bg-white/5 hover:bg-white hover:text-black px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest">Hikayemizi Oku</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
