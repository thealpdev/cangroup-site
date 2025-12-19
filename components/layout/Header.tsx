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
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().general?.logo) {
                setLogo(docSnap.data().general.logo);
            }
        }, (error) => console.error("Logo fetch error:", error));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unsubscribe();
        };
    }, []);

    return (
        <>
            {/* Top Bar - Ultra Premium */}
            <div className="bg-[#1a1a1a] text-white py-2.5">
                <div className="container mx-auto px-6 flex justify-between items-center text-[10px] md:text-xs font-medium tracking-widest uppercase">
                    <span className="hidden md:block text-white/80">Premium Cutlery Solutions</span>
                    <div className="flex items-center gap-6">
                        <a href="tel:+49123456789" className="hover:text-[#C8102E] transition-colors flex items-center gap-2">
                            <Phone className="w-3 h-3" /> Support
                        </a>
                        <a href="mailto:info@cangroup.de" className="hover:text-[#C8102E] transition-colors flex items-center gap-2">
                            <Mail className="w-3 h-3" /> Contact
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-500 border-b",
                    scrolled
                        ? "bg-white/90 backdrop-blur-md h-20 border-stone-200 shadow-sm"
                        : "bg-white h-24 md:h-28 border-transparent"
                )}
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">

                    {/* Mobile Menu */}
                    <button className="lg:hidden p-2 text-stone-900 hover:bg-stone-100 rounded-full transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo - Centered on Mobile, Left on Desktop */}
                    <Link href="/" className="relative h-full w-40 md:w-64 flex items-center justify-center md:justify-start group">
                        <div className={cn(
                            "relative transition-all duration-500",
                            scrolled ? "h-12 w-48" : "h-16 w-64"
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
                    <nav className="hidden lg:flex items-center gap-12">
                        {['Catalog', 'Brands', 'About Us', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Catalog' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                className="text-sm font-bold uppercase tracking-[0.15em] text-stone-900 hover:text-[#C8102E] transition-colors relative group py-2"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C8102E] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-6">
                        <button className="p-2 text-stone-900 hover:text-[#C8102E] hover:bg-stone-50 rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <div className="h-6 w-[1px] bg-stone-200 hidden md:block"></div>
                        <button className="flex items-center gap-3 px-4 py-2 bg-stone-900 text-white rounded-full hover:bg-[#C8102E] transition-all duration-300 shadow-lg shadow-stone-900/10 hover:shadow-red-900/20 group">
                            <ShoppingBag className="w-4 h-4" />
                            <span className="hidden md:block text-xs font-bold uppercase tracking-wider">Inquiry</span>
                        </button>
                    </div>

                </div>
            </header>
        </>
    );
}
