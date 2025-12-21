"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCart } from "@/lib/cart-context";

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_ITEMS = [
    { label: "ANASAYFA", href: "/" },
    { label: "ÜRÜNLER", href: "/products" },
    { label: "KATEGORİLER", href: "/categories" },
];

const SECONDARY_LINKS = [
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "/contact" },
    { label: "Mağazalar", href: "/stores" },
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
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 left-0 w-full md:w-[400px] bg-black text-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <Link href="/" className="text-2xl font-serif tracking-tight font-bold">
                                CAN GROUP
                            </Link>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto py-8 px-6 space-y-12">

                            {/* Primary Navigation */}
                            <nav className="space-y-6">
                                {MENU_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        className="flex items-center justify-between text-2xl font-bold tracking-wide group hover:text-[#C8102E] transition-colors"
                                    >
                                        {item.label}
                                        <ChevronRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                ))}
                            </nav>

                            {/* Secondary Navigation */}
                            <nav className="space-y-4">
                                {SECONDARY_LINKS.map(link => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={onClose}
                                        className="block text-lg text-stone-300 hover:text-white transition-colors font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Utility Links */}
                            <div className="pt-8 border-t border-white/10 space-y-4">
                                <Link href="/wishlist" className="flex items-center gap-4 text-stone-300 hover:text-white transition-colors">
                                    <Heart className="w-5 h-5" />
                                    <span>Favori Listesi</span>
                                </Link>
                                <Link href="/account" className="flex items-center gap-4 text-stone-300 hover:text-white transition-colors">
                                    <User className="w-5 h-5" />
                                    <span>Hesabım</span>
                                </Link>
                                <Link href="/help" className="flex items-center gap-4 text-stone-300 hover:text-white transition-colors">
                                    <HelpCircle className="w-5 h-5" />
                                    <span>Yardım ve İletişim</span>
                                </Link>
                                <Link href="/stores" className="flex items-center gap-4 text-stone-300 hover:text-white transition-colors">
                                    <MapPin className="w-5 h-5" />
                                    <span>Mağazalar</span>
                                </Link>
                            </div>
                        </div>

                        {/* Footer Button */}
                        <div className="p-6 border-t border-white/10">
                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="flex items-center justify-center w-full bg-[#C8102E] text-white font-bold py-4 rounded text-sm tracking-widest hover:bg-[#a00d25] transition-colors uppercase"
                            >
                                Teklif Listem
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
