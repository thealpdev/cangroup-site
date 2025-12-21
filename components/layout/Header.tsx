"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [logo, setLogo] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Real-time Dynamic Logo
        const docRef = doc(db, "settings", "home"); // Changed to 'home' where SettingsForm saves
        const unsubscribe = onSnapshot(docRef, (docSnap: any) => {
            if (docSnap.exists() && docSnap.data().general?.logo) {
                setLogo(docSnap.data().general.logo);
            }
        }, (error: any) => console.error("Logo fetch error:", error));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unsubscribe();
        };
    }, []);

    return (
        <>
            {/* Main Header */}
            <header
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-500",
                    scrolled
                        ? "bg-[#0a0a0a]/95 backdrop-blur-md h-24 border-b border-white/5 shadow-sm"
                        : "bg-transparent h-32 md:h-40 border-transparent"
                )}
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">

                    {/* Mobile Menu */}
                    <button className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                        <Menu className="w-8 h-8" />
                    </button>

                    {/* Logo - Centered on Mobile, Left on Desktop */}
                    <Link href="/" className="relative h-full flex items-center justify-center md:justify-start group">
                        <div className={cn(
                            "relative transition-all duration-500",
                            scrolled ? "h-20 w-64" : "h-24 md:h-32 w-64 md:w-80" // Increased scrolled size
                        )}>
                            <Image
                                src={logo}
                                alt="CAN GROUP"
                                fill
                                className={cn(
                                    "object-contain object-left transition-all duration-300"
                                    // Removed brightness-0 to keep logo colors (Red) correct on dark bg
                                )}
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centered & Premium */}
                    <nav className="hidden lg:flex items-center gap-16">
                        {['Produkte', 'Über uns', 'Kontakt'].map((item) => (
                            <Link
                                key={item}
                                href={
                                    item === 'Produkte' ? '/products' :
                                        item === 'Über uns' ? '/about' :
                                            item === 'Kontakt' ? '/contact' :
                                                '/'
                                }
                                className={cn(
                                    "text-sm font-bold uppercase tracking-[0.2em] transition-colors relative group py-2",
                                    scrolled ? "text-white hover:text-[#C8102E]" : "text-white hover:text-[#C8102E] drop-shadow-md"
                                )}
                            >
                                {item}
                                <span className={cn(
                                    "absolute bottom-0 left-0 h-[2px] transition-all duration-300 group-hover:w-full w-0",
                                    scrolled ? "bg-[#C8102E]" : "bg-[#C8102E]"
                                )}></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Search Removed */}
                        {/* Favorites Removed */}
                    </div>

                </div>
            </header>
        </>
    );
}
