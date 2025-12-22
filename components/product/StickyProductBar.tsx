"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag } from 'lucide-react';

interface StickyProductBarProps {
    product: any;
    currencySymbol: string;
}

export default function StickyProductBar({ product, currencySymbol }: StickyProductBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { addItem, setIsOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            // Show bar when scrolled past 600px (approx height of main hero)
            const show = window.scrollY > 600;
            setIsVisible(show);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAddToCart = () => {
        addItem(product);
        setIsOpen(true);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-stone-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4 md:hidden"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="text-xs font-medium text-stone-500 truncate">{product.name_de}</div>
                            <div className="text-[#C8102E] font-bold">
                                {currencySymbol}{product.price}
                            </div>
                        </div>
                        <Button
                            onClick={handleAddToCart}
                            className="bg-[#C8102E] hover:bg-[#a00d25] text-white rounded-xl px-6 font-bold shadow-lg shadow-red-900/20"
                        >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Sepete Ekle
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
