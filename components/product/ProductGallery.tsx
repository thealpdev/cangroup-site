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
    const [selectedindex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-4">
            {/* Main Image Stage */}
            <div
                className="relative aspect-square w-full overflow-hidden rounded-2xl bg-stone-100 group cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedindex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[selectedindex]}
                            alt={`${title} - View ${selectedindex + 1}`}
                            fill
                            className={cn(
                                "object-cover object-center transition-transform duration-700",
                                isZoomed ? "scale-150" : "group-hover:scale-110"
                            )}
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Visual Hint */}
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-stone-900" />
                </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={cn(
                                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                                selectedindex === idx
                                    ? "border-[#C8102E] ring-2 ring-[#C8102E]/20"
                                    : "border-transparent hover:border-stone-300 opacity-70 hover:opacity-100"
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
