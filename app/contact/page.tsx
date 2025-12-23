"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto space-y-6"
                    >
                        <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-sm block">
                            Kontakt
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif text-[#0a0a0a] leading-tight">
                            Wir sind für Sie da.
                        </h1>
                        <p className="text-xl text-stone-600 leading-relaxed">
                            Haben Sie Fragen zu unseren Produkten oder wünschen Sie eine Partnerschaft?
                            Kontaktieren Sie uns.
                        </p>
                    </motion.div>
                </section>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-12"
                        >
                            <div className="bg-stone-50 p-8 rounded-3xl space-y-8">
                                <h3 className="text-2xl font-serif text-[#0a0a0a]">Kontaktinformationen</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C8102E] shadow-sm group-hover:scale-110 transition-transform">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold uppercase tracking-wider text-stone-400 mb-1">Anschrift</span>
                                            <p className="text-lg text-[#0a0a0a] font-medium leading-relaxed">
                                                CANGROUP<br />
                                                Neustadt 8<br />
                                                63654 Büdingen, Deutschland
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C8102E] shadow-sm group-hover:scale-110 transition-transform">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold uppercase tracking-wider text-stone-400 mb-1">Telefon / WhatsApp</span>
                                            <p className="text-lg text-[#0a0a0a] font-medium">
                                                <span className="text-stone-500 text-sm">Ofis:</span> 06042 4056139
                                            </p>
                                            <p className="text-lg text-[#0a0a0a] font-medium">
                                                <span className="text-stone-500 text-sm">WhatsApp:</span> +49 0176 20438754
                                            </p>
                                            <p className="text-sm text-stone-500 mt-1">Mo-Fr: 09:00 - 18:00 Uhr</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C8102E] shadow-sm group-hover:scale-110 transition-transform">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold uppercase tracking-wider text-stone-400 mb-1">E-Mail</span>
                                            <a href="mailto:info@cangroup.de" className="text-lg text-[#0a0a0a] font-medium hover:text-[#C8102E] transition-colors">
                                                info@cangroup.de
                                            </a>
                                            <br />
                                            <a href="mailto:cangroup@canmarkt.de" className="text-lg text-[#0a0a0a] font-medium hover:text-[#C8102E] transition-colors">
                                                cangroup@canmarkt.de
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Map or Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative h-[400px] lg:h-auto rounded-3xl overflow-hidden shadow-2xl bg-stone-100"
                        >
                            {/* Placeholder for Map or Office Image */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.646484376484!2d9.1121!3d50.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd21c33b4b4b4b%3A0x4b4b4b4b4b4b4b4b!2sNeustadt%208%2C%2063654%20B%C3%BCdingen%2C%20Germany!5e0!3m2!1sen!2sde!4v1620000000000!5m2!1sen!2sde"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) contrast(1.2)' }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none border-4 border-white/20 rounded-3xl"></div>
                        </motion.div>

                    </div>
                </div>
            </main>
        </div>
    );
}
