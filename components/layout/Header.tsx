"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";

import { ChevronDown } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [logo, setLogo] = useState("");
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
    const [isProductHovered, setIsProductHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Fetch Logo
        const docRef = doc(db, "settings", "home");
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().general?.logo) {
                setLogo(docSnap.data().general.logo);
            }
        });

        // Fetch Categories
        const fetchCategories = async () => {
            const q = query(collection(db, "categories"), orderBy("name", "asc"));
            const snap = await getDocs(q);
            setCategories(snap.docs.map(d => ({ id: d.id, name: d.data().name })));
        };
        fetchCategories();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unsubscribe();
        };
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-500",
                    scrolled
                        ? "bg-white/95 backdrop-blur-md h-20 border-b border-stone-100 shadow-sm"
                        : "bg-transparent h-32 border-transparent"
                )}
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">

                    {/* Mobile Menu */}
                    <button className={cn(
                        "lg:hidden p-2 rounded-full transition-colors",
                        scrolled ? "text-stone-900 hover:bg-stone-100" : "text-white hover:bg-white/10"
                    )}>
                        <Menu className="w-8 h-8" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="relative h-full flex items-center justify-center md:justify-start group">
                        <div className={cn(
                            "relative transition-all duration-500",
                            scrolled ? "h-12 w-48" : "h-20 w-64"
                        )}>
                            <Image
                                src={logo}
                                alt="CAN GROUP"
                                fill
                                className={cn(
                                    "object-contain object-left transition-all duration-300",
                                    scrolled ? "brightness-0" : "brightness-0 invert"
                                    // Assuming logo is colored/dark. We invert it for dark hero, make it black for white header. 
                                    // If logo is already white, this needs adjustment. 
                                    // Let's assume the uploaded logo is colored or dark.
                                )}
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">

                        {/* Products Dropdown */}
                        <div
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setIsProductHovered(true)}
                            onMouseLeave={() => setIsProductHovered(false)}
                        >
                            <Link
                                href="/products"
                                className={cn(
                                    "flex items-center gap-1 text-xs font-bold uppercase tracking-[0.15em] transition-colors",
                                    scrolled ? "text-stone-900 hover:text-[#C8102E]" : "text-white hover:text-white/80"
                                )}
                            >
                                Produkte <ChevronDown className="w-3 h-3" />
                            </Link>

                            {/* Mega Menu */}
                            <div className={cn(
                                "absolute top-full -left-4 w-64 bg-white border border-stone-100 rounded-lg shadow-xl p-2 transition-all duration-300 origin-top transform",
                                isProductHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            )}>
                                <div className="flex flex-col">
                                    <Link href="/products" className="text-stone-900 hover:bg-stone-50 text-sm font-medium py-2.5 px-4 rounded-md transition-colors flex items-center justify-between">
                                        Alle Produkte
                                        <ChevronDown className="-rotate-90 w-3 h-3 text-stone-400" />
                                    </Link>
                                    <div className="h-px bg-stone-100 my-1" />
                                    {categories.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={`/products?category=${cat.name}`}
                                            className="text-stone-500 hover:text-[#C8102E] hover:bg-stone-50 py-2 px-4 rounded-md text-sm transition-colors"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Other Links */}
                        {['Über uns', 'Kontakt'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Kontakt' ? '/contact' : '/about'}
                                className={cn(
                                    "text-xs font-bold uppercase tracking-[0.15em] transition-colors relative group py-2",
                                    scrolled ? "text-stone-900 hover:text-[#C8102E]" : "text-white hover:text-white/80"
                                )}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <LanguageSwitcher scrolled={scrolled} />
                        <div className="h-4 w-px bg-current opacity-20 hidden md:block" />
                        <CartButton scrolled={scrolled} />
                    </div>

                </div>
            </header>
        </>
    );
}

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
                <div className="px-4 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Select Language</div>
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
