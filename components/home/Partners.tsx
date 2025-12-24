"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';

export default function Partners() {
    const [partners, setPartners] = useState<any[]>([]);
    const t = useTranslations('Homepage');

    useEffect(() => {
        const q = query(collection(db, "partners"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('🔍 Partners from Firebase:', items);
            setPartners(items);
        });
        return () => unsubscribe();
    }, []);

    // Debug: Always show section to see what's happening
    // if (partners.length === 0) return null;

    return (
        <section className="relative py-24 bg-gradient-to-b from-stone-50 to-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,16,46,0.03),transparent_60%)]" />

            <div className="container mx-auto px-4 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4 border border-stone-200">
                        <Sparkles className="w-4 h-4 text-[#C8102E]" />
                        <span className="text-[#C8102E] font-bold tracking-[0.15em] uppercase text-xs">
                            {t('partnersSubtitle')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-3">
                        {t('partnersTitle')}
                    </h2>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Weltklasse-Marken, denen Profis vertrauen
                    </p>
                </motion.div>

                {/* Horizontal Scroll Logo Container */}
                <div className="relative max-w-7xl mx-auto">
                    <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
                        {partners.map((partner, i) => (
                            <motion.div
                                key={partner.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group flex-shrink-0"
                                style={{ minWidth: '280px', width: '280px' }}
                            >
                                <div className="relative h-40 bg-white rounded-2xl border-2 border-stone-100 hover:border-[#C8102E]/20 hover:shadow-xl transition-all duration-500 p-8 flex items-center justify-center overflow-hidden">
                                    {/* Subtle gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-stone-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Logo */}
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {partner.logo ? (
                                            <img
                                                src={partner.logo}
                                                alt={partner.name || 'Partner'}
                                                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                                loading="lazy"
                                                crossOrigin="anonymous"
                                                onLoad={() => console.log('✅ Logo loaded:', partner.name)}
                                                onError={(e) => {
                                                    console.error('❌ Logo failed:', partner.name, partner.logo);
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-16 h-16 mx-auto mb-2 bg-stone-100 rounded-full flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-stone-400">
                                                        {partner.name?.[0] || '?'}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-semibold text-stone-600">
                                                    {partner.name || 'Partner'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Partner name */}
                                {partner.name && (
                                    <p className="text-center text-sm text-stone-500 mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {partner.name}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom accent */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-stone-400 uppercase tracking-wider">
                        Und viele weitere Premium-Partner
                    </p>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
