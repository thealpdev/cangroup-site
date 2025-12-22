"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-6">
            {/* Main Image Stage */}
            <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-stone-100 group cursor-zoom-in border border-stone-100 shadow-sm"
                onClick={() => setIsZoomed(!isZoomed)}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[selectedIndex]}
                            alt={`${title} - View ${selectedIndex + 1}`}
                            fill
                            className={cn(
                                "object-cover object-center transition-transform duration-700 ease-in-out will-change-transform",
                                isZoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-105"
                            )}
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Visual Indicators */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900 shadow-sm z-10 border border-stone-200/50">
                    {selectedIndex + 1} / {images.length}
                </div>

                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-stone-200/50 scale-90 group-hover:scale-100">
                    <ZoomIn className="w-5 h-5 text-stone-900" />
                </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={cn(
                                "relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 snap-start",
                                selectedIndex === idx
                                    ? "ring-2 ring-[#C8102E] ring-offset-2 opacity-100 shadow-md scale-105"
                                    : "opacity-60 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
