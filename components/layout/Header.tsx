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
                        ? "bg-[#0a0a0a]/95 backdrop-blur-md h-24 border-b border-white/5 shadow-sm"
                        : "bg-transparent h-32 md:h-40 border-transparent"
                )}
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">

                    {/* Mobile Menu */}
                    <button className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                        <Menu className="w-8 h-8" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="relative h-full flex items-center justify-center md:justify-start group">
                        <div className={cn(
                            "relative transition-all duration-500",
                            scrolled ? "h-20 w-64" : "h-24 md:h-32 w-64 md:w-80"
                        )}>
                            <Image
                                src={logo}
                                alt="CAN GROUP"
                                fill
                                className="object-contain object-left transition-all duration-300"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-12">

                        {/* Products Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsProductHovered(true)}
                            onMouseLeave={() => setIsProductHovered(false)}
                        >
                            <Link
                                href="/products"
                                className={cn(
                                    "flex items-center gap-1 text-sm font-bold uppercase tracking-[0.2em] transition-colors py-4",
                                    scrolled ? "text-white hover:text-[#C8102E]" : "text-white hover:text-[#C8102E] drop-shadow-md"
                                )}
                            >
                                Produkte <ChevronDown className="w-4 h-4" />
                            </Link>

                            {/* Mega Menu / Dropdown */}
                            <div className={cn(
                                "absolute top-full left-0 w-64 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl p-4 transition-all duration-300 origin-top transform",
                                isProductHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            )}>
                                <div className="flex flex-col gap-2">
                                    <Link href="/products" className="text-white hover:text-[#C8102E] text-sm py-2 px-2 rounded hover:bg-white/5 transition-colors">
                                        Alle Produkte
                                    </Link>
                                    <div className="h-px bg-white/10 my-1" />
                                    {categories.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={`/products?category=${cat.name}`}
                                            className="text-stone-300 hover:text-white hover:bg-white/5 py-2 px-2 rounded text-sm transition-colors"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                    {categories.length === 0 && (
                                        <span className="text-stone-500 text-xs px-2">Kategori bulunamadı</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Other Links */}
                        {['Über uns', 'Kontakt'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Kontakt' ? '/contact' : '/about'}
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
                        <LanguageSwitcher />
                        <CartButton />
                    </div>

                </div>
            </header>
        </>
    );
}

function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="relative group">
            <button className="flex items-center gap-1 text-white text-xs font-bold uppercase tracking-widest hover:text-[#C8102E] transition-colors">
                {language.toUpperCase()} <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-20 bg-white rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <button onClick={() => setLanguage('de')} className="block w-full text-left px-4 py-2 text-xs font-bold hover:bg-stone-50 text-stone-900">DE</button>
                <button onClick={() => setLanguage('tr')} className="block w-full text-left px-4 py-2 text-xs font-bold hover:bg-stone-50 text-stone-900">TR</button>
                <button onClick={() => setLanguage('en')} className="block w-full text-left px-4 py-2 text-xs font-bold hover:bg-stone-50 text-stone-900">EN</button>
            </div>
        </div>
    );
}

function CartButton() {
    const { setIsOpen, totalItems } = useCart();
    return (
        <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors group"
        >
            <ShoppingBag className="w-6 h-6 group-hover:text-[#C8102E] transition-colors" />
            {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#C8102E] text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-[#0a0a0a]">
                    {totalItems}
                </span>
            )}
        </button>
    );
}
