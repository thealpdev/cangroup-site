"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu } from 'lucide-react';

export default function Header() {
    // Logic removed to prevent flickering (old logo overwriting new one)
    // We are now strictly using the user-provided high-res logo.

    return (
        <>
            {/* Top Utility Bar */}
            <div className="bg-[#C8102E] text-white text-[10px] md:text-xs font-bold tracking-widest uppercase text-center py-2">
                Official Distribution Partner • Global Shipping Available
            </div>

            <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200 shadow-sm">
                <div className="container mx-auto px-6 h-28 flex items-center justify-between">

                    {/* Mobile Menu Trigger */}
                    <button className="lg:hidden p-2 text-stone-900">
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo - INCREASED SIZE & HARDCODED */}
                    <Link href="/" className="relative h-24 w-80 md:h-28 md:w-96 transition-transform hover:opacity-90 -ml-4">
                        <div className="relative h-full w-full">
                            <Image
                                src="/can-group-logo-black.jpg"
                                alt="CAN GROUP"
                                fill
                                className="object-contain object-left"
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
