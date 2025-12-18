"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Header() {
    const [logo, setLogo] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().logo) {
                    setLogo(docSnap.data().logo);
                }
            } catch (error) {
                console.error("Error fetching logo:", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    {logo ? (
                        <div className="relative h-12 w-48">
                            <Image
                                src={logo}
                                alt="CAN GROUP"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="bg-red-600 text-white font-bold px-3 py-1 rounded">
                            CAN GROUP
                        </div>
                    )}
                </Link>
                <nav className="flex gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-red-600 text-foreground/80">
                        Catalog
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-red-600 text-foreground/80">
                        About Us
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-red-600 text-foreground/80">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
