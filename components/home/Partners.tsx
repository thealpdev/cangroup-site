"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

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
        <section className="py-24 bg-white border-b border-stone-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Trusted Partners</span>
                </div>

                {/* Logo Grid */}
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 group/list">
                    {partners.map((partner) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative w-32 h-16 md:w-40 md:h-20 transition-all duration-500 opacity-60 grayscale group-hover/list:opacity-30 hover:!opacity-100 hover:!grayscale-0 hover:scale-110 cursor-pointer"
                        >
                            <Image
                                src={partner.imageUrl}
                                alt={partner.name || 'Partner'}
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
