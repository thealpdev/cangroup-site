"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronRight, Heart, User, HelpCircle } from 'lucide-react';

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_ITEMS = [
    { label: "Anasayfa", href: "/" },
    { label: "Ürünler", href: "/products" },
    { label: "Koleksiyonlar", href: "/categories" },
];

const SECONDARY_LINKS = [
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "/contact" },
];

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 left-0 w-full md:w-[450px] bg-[#0a0a0a] text-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-8 md:p-10 border-b border-white/5">
                            <Link href="/" className="text-2xl font-serif tracking-tighter" onClick={onClose}>
                                CAN<span className="text-[#C8102E]">GROUP</span>
                            </Link>
                            <button
                                onClick={onClose}
                                className="group p-2 -mr-2 text-stone-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-10 px-8 md:px-12 space-y-12">
                            {/* Primary Navigation */}
                            <nav className="space-y-6">
                                {MENU_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        className="block group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-4xl md:text-5xl font-light tracking-wide text-stone-300 group-hover:text-white transition-colors duration-500">
                                                {item.label}
                                            </span>
                                            <ChevronRight className="w-6 h-6 text-[#C8102E] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                                        </div>
                                    </Link>
                                ))}
                            </nav>

                            {/* Secondary Navigation */}
                            <nav className="space-y-4 pt-6 border-t border-white/5">
                                {SECONDARY_LINKS.map(link => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={onClose}
                                        className="block text-lg text-stone-500 hover:text-white transition-colors tracking-wider"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Utility Links */}
                            <div className="pt-6 space-y-6">
                                <div className="space-y-4">
                                    <Link href="/wishlist" onClick={onClose} className="flex items-center gap-4 text-stone-400 hover:text-[#C8102E] transition-colors group">
                                        <Heart className="w-5 h-5" />
                                        <span className="font-light tracking-wider">Favori Listesi</span>
                                    </Link>
                                    <Link href="/help" onClick={onClose} className="flex items-center gap-4 text-stone-400 hover:text-white transition-colors group">
                                        <HelpCircle className="w-5 h-5" />
                                        <span className="font-light tracking-wider">Yardım & İletişim</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Footer Button */}
                        <div className="p-8 border-t border-white/5 bg-[#0a0a0a]">
                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="flex items-center justify-between w-full p-4 border border-stone-800 hover:border-[#C8102E] hover:bg-[#C8102E]/5 rounded-lg group transition-all duration-300"
                            >
                                <span className="font-medium tracking-widest text-sm uppercase text-white">Teklif Listem</span>
                                <ChevronRight className="w-4 h-4 text-[#C8102E] transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}

            {/* Global Styles for Scrollbar Hiding inside this component scope if possible, 
                but tailwind 'no-scrollbar' class usually needs plugin or custom css. 
                We will use inline style for specific override or standard css-in-js approach 
            */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </AnimatePresence>
    );
}
