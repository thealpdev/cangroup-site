"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslations, useLocale } from 'next-intl';

export default function CategoryShowcase() {
    const t = useTranslations('Homepage');
    const locale = useLocale();

    const DEFAULT_COLLECTIONS = [
        {
            title_de: "Professionelle Messer", title_tr: t('collectionChef'), title_en: "Professional Knives", title_fr: "Couteaux Professionnels",
            subtitle_de: "Für Profis", subtitle_tr: t('subtitleChef'), subtitle_en: "For Professionals", subtitle_fr: "Pour les Professionnels",
            image: "https://images.unsplash.com/photo-1593642632823-8f7853670961?q=80&w=2070",
            link: "/products?category=Chef"
        },
        {
            title_de: "Santoku Serie", title_tr: t('collectionSantoku'), title_en: "Santoku Series", title_fr: "Série Santoku",
            subtitle_de: "Japanische Präzision", subtitle_tr: t('subtitleSantoku'), subtitle_en: "Japanese Precision", subtitle_fr: "Précision Japonaise",
            image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1974",
            link: "/products?category=Santoku"
        },
        {
            title_de: "Messer Sets", title_tr: t('collectionSets'), title_en: "Knife Sets", title_fr: "Ensembles de Couteaux",
            subtitle_de: "Professioneller Start", subtitle_tr: t('subtitleSets'), subtitle_en: "Professional Start", subtitle_fr: "Début Professionnel",
            image: "https://images.unsplash.com/photo-1664302152998-4a4e515907d7?q=80&w=1976",
            link: "/products?category=Set"
        }
    ];

    const [collections, setCollections] = useState(DEFAULT_COLLECTIONS);

    useEffect(() => {
        const docRef = doc(db, "settings", "global");
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().collections?.length === 3) {
                setCollections(docSnap.data().collections);
            } else {
                setCollections(DEFAULT_COLLECTIONS);
            }
        });
        return () => unsubscribe();
    }, []);

    // Get localized content with fallback to German
    const getLocalizedCollection = (collection: any) => {
        return {
            title: collection[`title_${locale}`] || collection.title_de || collection.title || '',
            subtitle: collection[`subtitle_${locale}`] || collection.subtitle_de || collection.subtitle || '',
            image: collection.image,
            link: collection.link
        };
    };

    const leftBox = getLocalizedCollection(collections[0]);
    const topRight = getLocalizedCollection(collections[1]);
    const bottomRight = getLocalizedCollection(collections[2]);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div>
                        <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs block mb-2">{t('categoriesTitle')}</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#0a0a0a]">{t('professionalPicks')}</h2>
                    </div>
                    <Link href="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0a0a0a]">
                        {t('viewAll')}
                        <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-[#C8102E] group-hover:border-[#C8102E] group-hover:text-white transition-all duration-300">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
                    {/* Large Left Card */}
                    <Link href={leftBox.link} className="relative group h-full rounded-2xl overflow-hidden block">
                        <Image
                            src={leftBox.image}
                            alt={leftBox.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute bottom-12 left-8 md:left-12">
                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2 block">{leftBox.subtitle}</span>
                            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">{leftBox.title}</h3>
                            <div className="inline-flex items-center gap-3 text-white border-b border-white pb-1 group-hover:border-[#C8102E] transition-colors">
                                <span className="text-sm font-bold uppercase tracking-wider">{t('discoverCollection')}</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>

                    {/* Right Column Stack */}
                    <div className="grid grid-rows-2 gap-8 h-full">
                        {/* Top Right */}
                        <Link href={topRight.link} className="relative group h-full rounded-2xl overflow-hidden block">
                            <Image
                                src={topRight.image}
                                alt={topRight.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-3xl font-serif text-white mb-2">{topRight.title}</h3>
                                <p className="text-white/80 text-sm font-medium">{topRight.subtitle}</p>
                            </div>
                        </Link>

                        {/* Bottom Right */}
                        <Link href={bottomRight.link} className="relative group h-full rounded-2xl overflow-hidden block">
                            <div className="absolute inset-0 bg-stone-100" />
                            {bottomRight.image && (
                                <Image
                                    src={bottomRight.image}
                                    alt={bottomRight.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-3xl font-serif text-white mb-2">{bottomRight.title}</h3>
                                <p className="text-white/80 text-sm font-medium">{bottomRight.subtitle}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
