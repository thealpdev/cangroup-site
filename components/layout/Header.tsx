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
    const [logo, setLogo] = useState("/can-group-logo-black.jpg");

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
                        ? "bg-white/95 backdrop-blur-md h-24 border-b border-stone-100 shadow-sm"
                        : "bg-transparent h-32 md:h-40 border-transparent"
                )}
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">

                    {/* Mobile Menu */}
                    <button className="lg:hidden p-2 text-stone-900 hover:bg-stone-100 rounded-full transition-colors">
                        <Menu className="w-8 h-8" />
                    </button>

                    {/* Logo - Centered on Mobile, Left on Desktop */}
                    <Link href="/" className="relative h-full flex items-center justify-center md:justify-start group">
                        <div className={cn(
                            "relative transition-all duration-500",
                            scrolled ? "h-20 w-64" : "h-24 w-72 md:w-96"
                        )}>
                            <Image
                                src={logo}
                                alt="CAN GROUP"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centered & Premium */}
                    <nav className="hidden lg:flex items-center gap-16">
                        {['Catalog', 'Brands', 'About Us', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Catalog' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                className={cn(
                                    "text-sm font-bold uppercase tracking-[0.2em] transition-colors relative group py-2",
                                    scrolled ? "text-stone-900 hover:text-[#C8102E]" : "text-white hover:text-[#C8102E] drop-shadow-md"
                                )}
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C8102E] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <button className={cn(
                            "p-2 rounded-full transition-colors",
                            scrolled ? "text-stone-900 hover:bg-stone-50" : "text-white hover:bg-white/10"
                        )}>
                            <Search className="w-6 h-6" />
                        </button>

                        <div className={cn(
                            "h-8 w-[1px] hidden md:block",
                            scrolled ? "bg-stone-200" : "bg-white/30"
                        )}></div>

                        <button className={cn(
                            "flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 shadow-lg group",
                            scrolled
                                ? "bg-[#0a0a0a] text-white hover:bg-[#C8102E] hover:shadow-red-900/20"
                                : "bg-white text-[#0a0a0a] hover:bg-[#C8102E] hover:text-white hover:shadow-xl"
                        )}>
                            <ShoppingBag className="w-5 h-5" />
                            <span className="hidden md:block text-xs font-bold uppercase tracking-widest">Inquiry</span>
                        </button>
                    </div>

                </div>
            </header>
        </>
    );
}
