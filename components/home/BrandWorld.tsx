"use client";

import Image from "next/image";
import Link from "next/link";

const BRANDS = [
    { name: "F. Dick", logo: "dick", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070" },
    { name: "Victorinox", logo: "victorinox", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070" },
    { name: "Zwilling", logo: "zwilling", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070" },
    { name: "Wüsthof", logo: "wusthof", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070" },
];

export default function BrandWorld() {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24 space-y-4">
                    <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs">Partnerlerimiz</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-[#0a0a0a]">Dünya Markaları</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-100 border border-stone-100">
                    {BRANDS.map((brand, i) => (
                        <div key={i} className="group relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden bg-white">
                            {/* Brand Image Background */}
                            <div className="absolute inset-0 bg-[#0a0a0a]">
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                                />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {brand.name}
                                </h3>
                                <Link
                                    href={`/products?brand=${brand.name}`}
                                    className="bg-white text-[#0a0a0a] px-8 py-3 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 hover:bg-[#C8102E] hover:text-white"
                                >
                                    Ürünleri Gör
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
