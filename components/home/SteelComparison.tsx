"use client";

import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SteelComparison() {
    const t = useTranslations('Homepage');

    return (
        <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C8102E]/10 skew-x-12 translate-x-1/4"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C8102E] mb-4">
                        Material Excellence
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
                        German Engineering <span className="text-stone-500 mx-2">&</span> Swiss Precision
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Section 1: German Steel (Solingen) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {/* Visual Placeholder for German Steel */}
                        <div className="relative h-48 w-full bg-stone-800 rounded-sm overflow-hidden mb-6 border border-stone-700">
                            <div className="absolute inset-0 flex items-center justify-center text-stone-500 font-bold uppercase tracking-widest">
                                [German Steel Visual]
                            </div>
                            {/* Uncomment when you have an image: 
                  <Image src="/path-to-german-steel.jpg" alt="Solingen Steel" fill className="object-cover opacity-70" /> 
                  */}
                        </div>

                        <div className="h-1 w-20 bg-[#C8102E]"></div>
                        <h4 className="text-3xl font-bold uppercase">{t('steelSolingen')}</h4>
                        <p className="text-stone-300 leading-relaxed font-light text-lg">
                            Renowned worldwide as the "City of Blades". Solingen steel represents the pinnacle of German forging technology. Known for extreme durability, edge retention, and heavy-duty performance in professional kitchens.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <Check className="text-[#C8102E] w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">{t('steelHighCarbon')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="text-[#C8102E] w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">{t('steelDurability')}</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Section 2: Swiss Steel (Victorinox style) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 md:text-right flex flex-col items-end"
                    >
                        {/* Visual Placeholder for Swiss Steel */}
                        <div className="relative h-48 w-full bg-stone-800 rounded-sm overflow-hidden mb-6 border border-stone-700">
                            <div className="absolute inset-0 flex items-center justify-center text-stone-500 font-bold uppercase tracking-widest">
                                [Swiss Steel Visual]
                            </div>
                            {/* Uncomment when you have an image: 
                  <Image src="/path-to-swiss-steel.jpg" alt="Swiss Steel" fill className="object-cover opacity-70" /> 
                  */}
                        </div>

                        <div className="h-1 w-20 bg-white"></div>
                        <h4 className="text-3xl font-bold uppercase">{t('steelSwiss')}</h4>
                        <p className="text-stone-300 leading-relaxed font-light text-lg">
                            Celebrated for precision and corrosion resistance. Swiss steel offers a lighter, razor-sharp edge that is easy to maintain. The choice of professionals who value surgical precision and hygiene.
                        </p>
                        <ul className="space-y-3 w-full flex flex-col items-end">
                            <li className="flex items-center gap-3 flex-row-reverse">
                                <Check className="text-white w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">{t('steelSharpness')}</span>
                            </li>
                            <li className="flex items-center gap-3 flex-row-reverse">
                                <Check className="text-white w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">{t('steelCorrosion')}</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
