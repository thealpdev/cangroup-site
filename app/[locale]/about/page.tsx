"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Globe, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-32">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-sm block"
                        >
                            Über uns
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif text-[#0a0a0a] leading-tight"
                        >
                            Qualität, Vertrauen und <br />
                            <span className="italic text-stone-400">Nachhaltige Partnerschaften.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto"
                        >
                            CANGROUP ist eine Marke, die sich auf den Großhandel von Produkten spezialisiert hat und in der Branche durch Qualität, Vertrauen und nachhaltige Partnerschaften hervorsticht. Seit unserer Gründung handeln wir mit der Mission, unseren Kunden hochwertige Produkte anzubieten.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="relative w-full h-[60vh] mt-16 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Using a reliable placeholder if local assets are missing */}
                        <Image
                            src="https://images.unsplash.com/photo-1588510886022-df37340d0460?q=80&w=2670&auto=format&fit=crop"
                            alt="Qualität und Handwerk"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>
                </section>

                {/* Values Grid */}
                <section className="container mx-auto px-4 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Qualität", desc: "Produkte, die nach hohen Qualitätsstandards hergestellt werden und strenge Kontrollprozesse durchlaufen." },
                            { icon: Users, title: "Vertrauen", desc: "Wir versprechen unseren Geschäftspartnern eine vertrauensvolle und langfristige Zusammenarbeit." },
                            { icon: Globe, title: "Effizienz", desc: "Starkes Lieferkettenmanagement und termingerechte Lieferung für globale Märkte." },
                            { icon: Award, title: "Innovation", desc: "Innovative Lösungen und nachhaltige Wachstumsstrategien für eine führende Position." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-stone-50 rounded-2xl hover:bg-[#0a0a0a] hover:text-white group transition-colors duration-500 cursor-default">
                                <item.icon className="w-10 h-10 text-[#C8102E] mb-6" />
                                <h3 className="text-xl font-bold mb-3 font-serif">{item.title}</h3>
                                <p className="text-stone-500 group-hover:text-stone-400 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Story Text */}
                <section className="container mx-auto px-4 mb-20">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-square bg-stone-100 rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1590422749897-424a1da51717?q=80&w=2574&auto=format&fit=crop"
                                alt="Unsere Vision"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-4xl font-serif text-[#0a0a0a]">Mission & Vision</h2>
                            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
                                <p>
                                    <strong>Unsere Mission:</strong> Es ist unsere Mission, ein zuverlässiger Geschäftspartner im Bereich des Großhandels sowohl auf nationalen als auch internationalen Märkten zu sein und dabei Qualität, Effizienz und Kundenzufriedenheit auf höchstem Niveau zu gewährleisten.
                                </p>
                                <p>
                                    <strong>Unsere Vision:</strong> Wir streben danach, mit innovativen Lösungen eine führende Position in der Branche zu erreichen und eine Marke zu sein, die ihren Geschäftspartnern einen echten Mehrwert bietet.
                                </p>
                                <p>
                                    Mit unserem professionellen Team versprechen wir unseren Geschäftspartnern nicht nur Produkte, sondern auch eine vertrauensvolle und langfristige Zusammenarbeit.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
