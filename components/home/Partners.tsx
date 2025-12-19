"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const PARTNERS = [
    { name: "Victorinox", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Victorinox_logo.svg/2560px-Victorinox_logo.svg.png" },
    { name: "Zwilling", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Zwilling_J._A._Henckels_Logo.svg/1200px-Zwilling_J._A._Henckels_Logo.svg.png" },
    { name: "Wüsthof", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/W%C3%BCsthof_logo.svg/2560px-W%C3%BCsthof_logo.svg.png" },
    { name: "Solingen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Solingen_Logo.svg/1200px-Solingen_Logo.svg.png" }, // Placeholder for generic Solingen mark
    { name: "Dick", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0kSqg-u7uVqZ6y4C4hP8y8xA8a8c8b8d8e8&s" }, // Placeholder
];

export default function Partners() {
    return (
        <section className="py-20 bg-stone-50 border-t border-stone-100">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <span className="text-stone-400 font-medium uppercase tracking-[0.3em] text-[10px]">Trusted Partners</span>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                    {PARTNERS.map((partner, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="relative w-32 h-16 md:w-48 md:h-24 mix-blend-multiply"
                        >
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
