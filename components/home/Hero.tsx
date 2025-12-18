"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

export default function Hero() {
    const [heroImage, setHeroImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().heroImage) {
                    setHeroImage(docSnap.data().heroImage);
                }
            } catch (error) {
                console.error("Error fetching hero image:", error);
            }
        };
        fetchSettings();
    }, []);

    if (!heroImage) {
        // Fallback or empty state if no image is uploaded yet
        return (
            <div className="bg-stone-900 text-white py-20 text-center">
                <h2 className="text-4xl font-bold">Premium Knife Collection</h2>
                <p className="mt-4 text-stone-400">Official Distributor</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden mb-12">
            <Image
                src={heroImage}
                alt="Hero Banner"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white space-y-4 p-4">
                    <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Premium Quality</h2>
                    <p className="text-lg md:text-xl font-light drop-shadow-md">Professional Wholesale Distribution</p>
                </div>
            </div>
        </div>
    );
}
