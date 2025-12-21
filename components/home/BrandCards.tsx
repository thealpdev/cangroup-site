"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BRANDS = [
    {
        name: "ZWILLING",
        description: "Her Öğünü Dolu Dolu Yaşayın. 1731'de Almanya'da Kuruldu.",
        image: "https://images.unsplash.com/photo-1593642532744-937508af3952?q=80&w=2070",
        logo: "/brands/zwilling-logo.png", // We might need to use placeholders or text if logos aren't available
        link: "/products?brand=Zwilling"
    },
    {
        name: "STAUB",
        description: "STAUB, keyifli sofralarda yemekleri sevgiyle paylaşmayı sevenler içindir.",
        image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070",
        logo: "/brands/staub-logo.png",
        link: "/products?brand=Staub"
    },
    {
        name: "BALLARINI",
        description: "Sizin için üretildi. İtalyan mutfağının zarafeti.",
        image: "https://images.unsplash.com/photo-1588611910609-0d12759e02c6?q=80&w=2070",
        logo: "/brands/ballarini-logo.png",
        link: "/products?brand=Ballarini"
    }
];

export default function BrandCards() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] uppercase tracking-wider">Tüm Markalarımız</h2>
                    <div className="h-1 w-24 bg-[#C8102E] mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BRANDS.map((brand, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            {/* Card Image */}
                            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden">
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Logo Overlay (Simulated with text/box if logo image missing for now) */}
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    {/* In a real scenario we'd use the actual logo image. For now, using a stylized box. */}
                                </div>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 shadow-lg">
                                    <span className="font-bold text-[#C8102E] text-xl tracking-widest">{brand.name}</span>
                                </div>
                            </div>

                            {/* Text Content */}
                            <p className="text-stone-600 mb-6 max-w-xs leading-relaxed font-medium">
                                {brand.description}
                            </p>

                            {/* Button */}
                            <Link
                                href={brand.link}
                                className="border border-stone-900 text-stone-900 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
                            >
                                {brand.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
