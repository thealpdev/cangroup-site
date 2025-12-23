"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu, X, ChevronDown, Instagram, Facebook, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import SidebarMenu from "@/components/layout/SidebarMenu";
import AuthModal from "@/components/auth/AuthModal";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [logo, setLogo] = useState("");

    useEffect(() => {
        const handleScroll = () => {
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
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-500",
                    scrolled
                        ? "bg-white/90 backdrop-blur-md h-20 border-b border-stone-100 shadow-sm"
                        : "bg-transparent h-28 border-b border-white/10"
                )}
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">

                    {/* Left: Menu Trigger */}
                    <div className="flex items-center gap-6 flex-1">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="group flex items-center gap-3 focus:outline-none"
                        >
                            <div className={cn(
                                "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border",
                                scrolled
                                    ? "border-stone-200 bg-stone-50 text-stone-900 group-hover:bg-[#C8102E] group-hover:border-[#C8102E] group-hover:text-white"
                                    : "border-white/20 bg-white/10 text-white group-hover:bg-white group-hover:text-stone-900"
                            )}>
                                <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <span className={cn(
                                "hidden md:inline text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300",
                                scrolled ? "text-stone-900 group-hover:text-[#C8102E]" : "text-white group-hover:text-white/80"
                            )}>
                                Menü
                            </span>
                        </button>
                    </div>

                    {/* Center: Brand Logo */}
                    <div className="flex-1 flex justify-center">
                        <Link href="/" className="relative group">
                            <div className="flex flex-col items-center">
                                {/* Logo Text */}
                                <span className={cn(
                                    "font-serif text-3xl font-black tracking-tight transition-colors duration-500",
                                    scrolled ? "text-[#C8102E]" : "text-white"
                                )}>
                                    CAN<span className={cn("font-light", scrolled ? "text-stone-900" : "text-white/90")}>GROUP</span>
                                </span>
                                {/* Decorative line */}
                                <span className={cn(
                                    "w-0 h-[1px] bg-current transition-all duration-500 group-hover:w-full mt-1",
                                    scrolled ? "text-[#C8102E]" : "text-white"
                                )}></span>
                            </div>
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-6 flex-1">
                        <div className="hidden md:block">
                            <SearchButton scrolled={scrolled} />
                        </div>
                        <UserButton scrolled={scrolled} onAuthOpen={() => setIsAuthOpen(true)} />
                        <CartButton scrolled={scrolled} />
                    </div>

                </div>
            </motion.header>
        </>
    );
}

function UserButton({ scrolled, onAuthOpen }: { scrolled: boolean; onAuthOpen: () => void }) {
    const { user } = useAuth();
    const router = useRouter();

    const handleClick = () => {
        if (user) {
            router.push('/account');
        } else {
            onAuthOpen();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "group flex items-center gap-3 transition-colors duration-300",
                scrolled ? "text-stone-900" : "text-white"
            )}
        >
            <div className={cn(
                "p-2 rounded-full transition-all duration-300 relative",
                scrolled
                    ? "bg-stone-100 group-hover:bg-[#C8102E] group-hover:text-white"
                    : "bg-white/10 group-hover:bg-white group-hover:text-stone-900"
            )}>
                <User className="w-5 h-5" />
                {user && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
            </div>
            {/* Optional label */}
            <span className={cn(
                "hidden lg:block text-xs font-bold uppercase tracking-widest transition-colors",
                scrolled ? "group-hover:text-[#C8102E]" : "group-hover:text-white/80"
            )}>
                {user ? (user.displayName?.split(' ')[0] || 'Hesabım') : 'Giriş'}
            </span>
        </button>
    );
}

function SearchButton({ scrolled }: { scrolled: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
            setQuery("");
        }
    };

    return (
        <div className="relative flex items-center">
            <div className={cn(
                "overflow-hidden transition-all duration-300 flex items-center",
                isOpen ? "w-40 md:w-56 opacity-100 mr-3" : "w-0 opacity-0 mr-0"
            )}>
                <form onSubmit={handleSearch} className="w-full">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Suchen..."
                        className={cn(
                            "w-full bg-transparent border-b text-sm py-1 outline-none placeholder:text-stone-400",
                            scrolled
                                ? "border-stone-300 text-stone-900 focus:border-[#C8102E]"
                                : "border-white/30 text-white focus:border-white"
                        )}
                        onBlur={() => !query && setIsOpen(false)}
                    />
                </form>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group flex items-center justify-center transition-colors duration-300",
                    scrolled ? "text-stone-900" : "text-white"
                )}
            >
                <Search className="w-5 h-5 group-hover:text-[#C8102E] transition-colors" />
            </button>
        </div>
    );
}

function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="relative group">
            <button className={cn(
                "flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 py-2",
                scrolled ? "text-stone-900 hover:text-[#C8102E]" : "text-white hover:text-white/80"
            )}>
                {language}
                <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
            </button>

            {/* Dropdown */}
            <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                <div className="bg-white p-2 rounded-xl border border-stone-100 shadow-xl w-32 flex flex-col gap-1">
                    {['de', 'tr', 'en'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang as any)}
                            className={cn(
                                "w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors",
                                language === lang
                                    ? "bg-red-50 text-[#C8102E]"
                                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                            )}
                        >
                            {lang === 'de' ? 'Deutsch' : lang === 'tr' ? 'Türkçe' : 'English'}
                        </button>
                    ))}
                </div>
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
                "group flex items-center gap-3 transition-colors duration-300",
                scrolled ? "text-stone-900" : "text-white"
            )}
        >
            <div className="relative">
                <div className={cn(
                    "p-2 rounded-full transition-all duration-300",
                    scrolled
                        ? "bg-stone-100 group-hover:bg-[#C8102E] group-hover:text-white"
                        : "bg-white/10 group-hover:bg-white group-hover:text-stone-900"
                )}>
                    <ShoppingBag className="w-5 h-5" />
                </div>
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8102E] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                        {totalItems}
                    </span>
                )}
            </div>
            <span className={cn(
                "hidden md:block text-xs font-bold uppercase tracking-widest transition-colors",
                scrolled ? "group-hover:text-[#C8102E]" : "group-hover:text-white/80"
            )}>
                Anfrage
            </span>
        </button>
    );
}
