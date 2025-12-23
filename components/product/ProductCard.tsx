"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from 'react';

interface Product {
    id: string;
    name_en?: string; name_de?: string; name_tr?: string;
    price: string; currency: string;
    images?: string[]; image?: string;
    brand?: string; category?: string;
    productCode?: string;
    // New fields
    stock?: string;
    isNew?: boolean;
    isSale?: boolean;
    salePrice?: string;
}

interface ProductCardProps {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const currencySymbol = product.currency === 'USD' ? '$' : product.currency === 'TRY' ? '₺' : product.currency === 'GBP' ? '£' : '€';
    const displayName = product.name_en || product.name_de || product.name_tr || 'Unnamed Product';
    const displayImage = product.images?.[0] || product.image || '/placeholder-knife.jpg';

    // Logic
    const isOutOfStock = parseInt(product.stock || '0') <= 0;
    const isSale = product.isSale && product.salePrice;

    // Calculate Discount
    let discountPercent = 0;
    if (isSale && product.price && product.salePrice) {
        discountPercent = Math.round(((parseFloat(product.price) - parseFloat(product.salePrice)) / parseFloat(product.price)) * 100);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group relative ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`}
        >
            <div className="absolute top-4 right-4 z-20">
                <FavoriteButton product={product} />
            </div>

            {/* BADGES */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start pointer-events-none">
                {product.brand && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-stone-100">
                        {product.brand}
                    </span>
                )}
                {product.isNew && !isOutOfStock && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full shadow-sm border border-blue-100">
                        YENİ
                    </span>
                )}
                {isSale && !isOutOfStock && discountPercent > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#C8102E] px-3 py-1.5 rounded-full shadow-sm">
                        %{discountPercent} İNDİRİM
                    </span>
                )}
            </div>

            <Link href={`/products/${product.id}`} className="block h-full">
                <div className="relative aspect-[3/4] mb-4 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(200,16,46,0.08)] transition-all duration-500 overflow-hidden border border-transparent group-hover:border-[#C8102E]/10">

                    {/* Out of Stock Overlay */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 z-30 bg-stone-100/60 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="bg-stone-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rotate-[-10deg]">
                                TÜKENDİ
                            </span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-tr from-stone-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Image
                        src={displayImage}
                        alt={displayName}
                        fill
                        className="object-contain p-8 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out drop-shadow-sm"
                    />

                    {/* Quick Action Hint */}
                    {!isOutOfStock && (
                        <div className="absolute bottom-0 inset-x-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex justify-center gap-2 z-20">
                            <button
                                className="bg-white text-stone-900 border-stone-200 border p-3 rounded-full shadow-lg hover:bg-stone-50 hover:scale-110 transition-all"
                                title="İncele"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                            </button>
                            <AddToCartButton product={product} />
                        </div>
                    )}
                </div>

                <div className="space-y-1 px-2 text-center">
                    <h3 className="font-serif text-lg text-stone-900 group-hover:text-[#C8102E] transition-colors line-clamp-1">
                        {displayName}
                    </h3>

                    {/* Price Display */}
                    <div className="flex items-center justify-center gap-2 text-sm">
                        {isSale ? (
                            <>
                                <span className="text-stone-400 line-through decoration-stone-400">
                                    {currencySymbol}{product.price}
                                </span>
                                <span className="font-bold text-[#C8102E]">
                                    {currencySymbol}{product.salePrice}
                                </span>
                            </>
                        ) : (
                            <span className="font-medium text-stone-500">
                                {currencySymbol}{product.price}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart();

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
            }}
            className="bg-[#C8102E] text-white p-3 rounded-full shadow-lg hover:bg-[#a00d25] hover:scale-110 transition-all"
            title="In den Warenkorb"
        >
            <ShoppingBag className="w-5 h-5" />
        </button>
    );
}

function FavoriteButton({ product }: { product: Product }) {
    const { isInWishlist, toggleItem } = useWishlist();
    const isFav = isInWishlist(product.id);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        toggleItem({
            id: product.id,
            productNumber: product.productCode || product.id, // Fallback
            name_tr: product.name_tr || product.name_en || product.name_de || '',
            price: product.isSale ? product.salePrice || product.price : product.price,
            image: product.images?.[0] || product.image,
            slug: product.id
        });
    };

    return (
        <button
            onClick={handleToggle}
            className={`p-2 rounded-full backdrop-blur-sm transition-all shadow-sm border ${isFav
                ? "bg-red-50 border-red-100 text-[#C8102E]"
                : "bg-white/80 border-stone-200 text-stone-400 hover:text-[#C8102E] hover:border-[#C8102E]/30"
                }`}
        >
            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
        </button>
    );
}
