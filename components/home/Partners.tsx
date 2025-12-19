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
        name: string;
        logo: string;
    }

    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        // Dynamic fetch from 'partners' collection
        const q = query(collection(db, "partners"), orderBy("name", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Partner[];
            setPartners(items);
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
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative w-32 h-16 md:w-40 md:h-20"
                        >
                            <Image
                                src={partner.logo}
                                alt={partner.name}
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
