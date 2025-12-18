"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';

export default function Header() {
    const [logo, setLogo] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Logo Fetch
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

        // Scroll Listener
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-stone-100 py-2" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2 group">
                    {logo ? (
                        <div className="relative h-10 w-40 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src={logo}
                                alt="CAN GROUP"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="text-2xl font-bold tracking-tighter text-stone-900 group-hover:opacity-80 transition-opacity">
                            CAN<span className="text-stone-400 font-light ml-1">GROUP</span>
                        </div>
                    )}
                </Link>
                <nav className="flex gap-8 text-sm font-medium text-stone-600">
                    <Link href="/" className="hover:text-stone-900 transition-colors uppercase tracking-widest text-xs">
                        Catalog
                    </Link>
                    <Link href="/about" className="hover:text-stone-900 transition-colors uppercase tracking-widest text-xs">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-stone-900 transition-colors uppercase tracking-widest text-xs">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
