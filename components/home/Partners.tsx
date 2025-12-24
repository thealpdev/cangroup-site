"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslations } from 'next-intl';
import { Award } from 'lucide-react';

export default function Partners() {
    const [partners, setPartners] = useState<any[]>([]);
    const t = useTranslations('Homepage');

    useEffect(() => {
        const q = query(collection(db, "partners"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPartners(items);
        });
        return () => unsubscribe();
    }, []);

    if (partners.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-stone-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-[#C8102E]" />
                        <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs">
                            {t('partnersSubtitle')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
                        {t('partnersTitle')}
                    </h2>
                </motion.div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="relative aspect-square bg-white rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all duration-300 p-6 flex items-center justify-center overflow-hidden">
                                {/* Subtle hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-stone-50/0 to-stone-100/0 group-hover:from-stone-50/50 group-hover:to-stone-100/30 transition-all duration-500" />

                                <div className="relative w-full h-full">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            {partner.name && (
                                <p className="text-center text-xs text-stone-500 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    {partner.name}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
