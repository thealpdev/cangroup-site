"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryShowcase() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div>
                        <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs block mb-2">Koleksiyonlar</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#0a0a0a]">Profesyonel Seçimler</h2>
                    </div>
                    <Link href="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0a0a0a]">
                        Tümünü İncele
                        <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-[#C8102E] group-hover:border-[#C8102E] group-hover:text-white transition-all duration-300">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
                    {/* Large Left Card */}
                    <Link href="/products?category=Chef" className="relative group h-full rounded-2xl overflow-hidden block">
                        <Image
                            src="https://images.unsplash.com/photo-1593642632823-8f7853670961?q=80&w=2070"
                            alt="Chef Knives"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute bottom-12 left-8 md:left-12">
                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2 block">Şefin Tercihi</span>
                            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Şef Bıçakları</h3>
                            <div className="inline-flex items-center gap-3 text-white border-b border-whitepb-1 group-hover:border-[#C8102E] transition-colors">
                                <span className="text-sm font-bold uppercase tracking-wider">Koleksiyonu Keşfet</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>

                    {/* Right Column Stack */}
                    <div className="grid grid-rows-2 gap-8 h-full">
                        {/* Top Right */}
                        <Link href="/products?category=Santoku" className="relative group h-full rounded-2xl overflow-hidden block">
                            <Image
                                src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1974"
                                alt="Santoku"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-3xl font-serif text-white mb-2">Santoku Serisi</h3>
                                <p className="text-white/80 text-sm font-medium">Japon Hassasiyeti</p>
                            </div>
                        </Link>

                        {/* Bottom Right */}
                        <Link href="/products?category=Set" className="relative group h-full rounded-2xl overflow-hidden block">
                            <div className="absolute inset-0 bg-stone-100" />
                            <Image
                                src="https://plus.unsplash.com/premium_photo-1664302152998-4a4e515907d7?q=80&w=1976"
                                alt="Knife Sets"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-3xl font-serif text-white mb-2">Bıçak Setleri</h3>
                                <p className="text-white/80 text-sm font-medium">Profesyonel Başlangıç</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
