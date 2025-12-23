"use client";

import { useWishlist, WishlistItem } from "@/lib/wishlist-context";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function WishlistPage() {
    const { items, removeItem } = useWishlist();
    const { addItem } = useCart();

    const handleAddToCart = (item: WishlistItem) => {
        addItem({
            id: item.id,
            productNumber: item.productNumber,
            name_en: item.name_tr, // Mapping for cart compatibility
            name_de: item.name_tr,
            name_tr: item.name_tr,
            price: item.price,
            currency: 'EUR', // Assuming default
            image: item.image,
            images: item.image ? [item.image] : [],
            slug: item.slug
        });
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-stone-50 pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
                    <Heart className="w-8 h-8 text-stone-300" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">Favori Listeniz Boş</h1>
                <p className="text-stone-500 mb-8 max-w-md">
                    Henüz favori listenize ürün eklemediniz. Koleksiyonumuzu keşfedin ve beğendiğiniz ürünleri kaydedin.
                </p>
                <Link
                    href="/products"
                    className="bg-[#C8102E] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-[#a00d25] transition-colors"
                >
                    Koleksiyonu Keşfet
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Kişisel
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#0a0a0a]">
                        Favori Listem ({items.length})
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="relative aspect-[3/4] bg-stone-100 p-8">
                                <Link href={`/products/${item.slug}`}>
                                    <Image
                                        src={item.image || '/placeholder-knife.jpg'}
                                        alt={item.name_tr}
                                        fill
                                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="absolute top-4 right-4 p-2 bg-white rounded-full text-[#C8102E] shadow-sm hover:bg-red-50 transition-colors"
                                    title="Listeden Kaldır"
                                >
                                    <Heart className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                            <div className="p-6">
                                <Link href={`/products/${item.slug}`}>
                                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 truncate group-hover:text-[#C8102E] transition-colors">
                                        {item.name_tr}
                                    </h3>
                                </Link>
                                <p className="text-[#C8102E] font-bold mb-4">€{item.price}</p>

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="w-full flex items-center justify-center gap-2 bg-[#0a0a0a] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#C8102E] transition-colors"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Sepete Ekle
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
