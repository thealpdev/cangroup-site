"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, ShoppingBag, Menu } from 'lucide-react';

export default function Header() {
    const [logo, setLogo] = useState<string | null>(null);

    useEffect(() => {
        // Optional: Keep dynamic fetching if they upload a new one later, 
        // but default to the static one we just added.
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
        <>
            {/* Top Utility Bar */}
            <div className="bg-[#C8102E] text-white text-[10px] md:text-xs font-bold tracking-widest uppercase text-center py-2">
                Official Distribution Partner • Global Shipping Available
            </div>

            <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200">
                <div className="container mx-auto px-6 h-24 flex items-center justify-between">

                    {/* Mobile Menu Trigger */}
                    <button className="lg:hidden p-2 text-stone-900">
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="relative h-16 w-48 md:h-20 md:w-64 transition-transform hover:opacity-90">
                        <div className="relative h-full w-full">
                            <Image
                                src={logo || "/can-group-logo.png"}
                                alt="CAN GROUP"
                                fill
                                className="object-contain object-left md:object-center"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-10">
                        <Link href="/" className="text-sm font-bold uppercase tracking-widest text-stone-900 hover:text-[#C8102E] transition-colors relative group">
                            Catalog
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C8102E] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="/about" className="text-sm font-bold uppercase tracking-widest text-stone-900 hover:text-[#C8102E] transition-colors relative group">
                            About Us
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C8102E] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-stone-900 hover:text-[#C8102E] transition-colors relative group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C8102E] transition-all group-hover:w-full"></span>
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <button className="text-stone-900 hover:text-[#C8102E] transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <div className="h-6 w-[1px] bg-stone-200 hidden md:block"></div>
                        <button className="text-stone-900 hover:text-[#C8102E] transition-colors flex items-center gap-2 font-medium">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="hidden md:block text-xs uppercase tracking-wider">Inquiry</span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
