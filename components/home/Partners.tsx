"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Partners() {
    // Defines the shape of a Partner object
    interface Partner {
        id: string;
        imageUrl: string;
        name?: string;
        order?: number;
    }

    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        // Fetch all (simple query, sort client side to avoid index issues for now)
        const q = query(collection(db, "partners"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Partner[];
            // Sort by order: undefined/0 goes to end (999)
            setPartners(items.sort((a, b) => (a.order || 999) - (b.order || 999)));
        });

        return () => unsubscribe();
    }, []);

    if (partners.length === 0) return null;

    return (
        <section className="py-24 bg-stone-50/50 border-b border-stone-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C8102E] mb-2 block">Markalarımız</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Güvenilir İş Ortakları</h2>
                </div>

                {/* Logo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {partners.map((partner, index) => (
                        <Link
                            key={partner.id}
                            href={`/products?search=${encodeURIComponent(partner.name || '')}`}
                            className="group block"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="relative h-32 bg-white rounded-xl border border-stone-100 shadow-sm flex items-center justify-center p-6 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(200,16,46,0.1)] group-hover:border-[#C8102E]/20"
                            >
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#C8102E]/0 via-[#C8102E]/0 to-[#C8102E]/0 group-hover:via-[#C8102E]/5 transition-all duration-500 rounded-xl" />

                                <div className={cn(
                                    "relative w-full h-full transition-all duration-300 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0",
                                    partner.order === 1 ? "scale-110" : "scale-100"
                                )}>
                                    <Image
                                        src={partner.imageUrl}
                                        alt={partner.name || 'Partner'}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
