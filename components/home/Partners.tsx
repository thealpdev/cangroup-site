"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

interface Partner {
    id: string;
    imageUrl: string;
}

export default function Partners() {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const q = query(collection(db, "partners"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                setPartners(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Partner)));
            } catch (error) {
                console.error("Error fetching partners:", error);
            }
        };
        fetchPartners();
    }, []);

    if (partners.length === 0) return null;

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold mb-8 text-stone-800">Trusted Partners</h3>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                    {partners.map(partner => (
                        <div key={partner.id} className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                            <Image
                                src={partner.imageUrl}
                                alt="Partner Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
