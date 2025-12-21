"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import SidebarMenu from "@/components/layout/SidebarMenu";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logo, setLogo] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            // Lower threshold for quicker stabilization
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const docRef = doc(db, "settings", "home");
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().general?.logo) {
                setLogo(docSnap.data().general.logo);
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unsubscribe();
        };
    }, []);

    return (
        <>
            <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <header
                className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md h-24 border-b border-stone-100 shadow-sm transition-all duration-300"
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">

                    {/* Left: Menu & Search */}
                    <div className="flex items-center gap-4 md:gap-6 flex-1">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-[#C8102E] transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                            <span className="hidden md:inline">Menü</span>
                        </button>

                        <button
                            className="p-2 rounded-full text-stone-900 hover:bg-stone-50 transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <Link href="/" className="relative h-full flex items-center justify-center group flex-1">
                        <div className="relative h-16 w-64 transition-transform duration-300 hover:scale-105">
                            {/* Logo logic: Always display original logo */}
                            <Image
                                src={logo || "/placeholder-logo.png"}
                                alt="CAN GROUP"
                                fill
                                className="object-contain object-center"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-6 flex-1">
                        <div className="hidden md:block">
                            <LanguageSwitcher scrolled={true} />
                        </div>
                        <CartButton scrolled={true} />
                    </div>

                </div>
            </header>
        </>
    );
}

import { ChevronDown } from 'lucide-react';

function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="relative group">
            <button className={cn(
                "flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors",
                scrolled ? "text-stone-900 hover:text-[#C8102E]" : "text-white hover:text-white/80"
            )}>
                {language.toUpperCase()} <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute top-full right-0 mt-4 w-32 bg-white rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto border border-stone-100">
                <button onClick={() => setLanguage('de')} className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-stone-50 text-stone-900">Deutsch</button>
                <button onClick={() => setLanguage('tr')} className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-stone-50 text-stone-900">Türkçe</button>
                <button onClick={() => setLanguage('en')} className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-stone-50 text-stone-900">English</button>
            </div>
        </div>
    );
}

function CartButton({ scrolled }: { scrolled: boolean }) {
    const { setIsOpen, totalItems } = useCart();
    return (
        <button
            onClick={() => setIsOpen(true)}
            className={cn(
                "relative group flex items-center gap-2 transition-colors",
                scrolled ? "text-stone-900 hover:text-[#C8102E]" : "text-white hover:text-white/80"
            )}
        >
            <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C8102E] text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                        {totalItems}
                    </span>
                )}
            </div>
            <span className="hidden md:inline text-xs font-bold uppercase tracking-widest">
                Anfrage
            </span>
        </button>
    );
}
