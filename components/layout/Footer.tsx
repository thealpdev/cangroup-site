"use client";

import { Link } from '@/i18n/navigation'; // Use i18n Link
import { Mail, Phone, ArrowRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navbar');
    const tLegal = useTranslations('Legal'); // Need to add this section or use fallback

    return (
        <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">

                    {/* Brand / Info */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block relative h-10 w-40 mb-2">
                            {/* Ideally, use the logo here if available, or text */}
                            <span className="text-2xl font-serif font-bold tracking-widest text-white">CANGROUP</span>
                        </Link>
                        <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                            Ihr verlässlicher Partner für hochwertiges Schneidwerkzeug. Wir verbinden Solinger Tradition mit globaler Reichweite.
                        </p>
                        <div className="space-y-2 pt-4">
                            <a href="mailto:info@cangroup.de" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                                <Mail className="w-4 h-4 text-[#C8102E] group-hover:scale-110 transition-transform" />
                                <span className="text-sm">info@cangroup.de</span>
                            </a>
                            <a href="https://wa.me/4917620438754" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                                <Phone className="w-4 h-4 text-[#C8102E] group-hover:scale-110 transition-transform" />
                                <span className="text-sm">WhatsApp: +49 176 20438754</span>
                            </a>
                            <a href="tel:+4960424056139" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                                <Phone className="w-4 h-4 text-[#C8102E] group-hover:scale-110 transition-transform" />
                                <span className="text-sm">Ofis: 06042 4056139</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-stone-500">{tNav('menu') || t('menu')}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: tNav('home'), href: "/" },
                                { name: tNav('products'), href: "/products" },
                                { name: tNav('about'), href: "/about" },
                                { name: tNav('contact'), href: "/contact" }
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-stone-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-stone-500">{t('legal')}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Impressum", href: "/impressum" },
                                { name: "Datenschutzerklärung", href: "/privacy" },
                                { name: "AGB", href: "/terms" },
                                { name: "Widerrufsrecht", href: "/revocation" }
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-stone-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Social */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-stone-500">{t('newsletter')}</h4>
                        <p className="text-stone-400 text-sm mb-6">
                            {t('subscribeText')}
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-[#C8102E] transition-colors"
                            />
                            <button className="bg-[#C8102E] text-white px-4 py-2 rounded-lg hover:bg-[#a00d25] transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-stone-500">
                        &copy; {new Date().getFullYear()} CANGROUP. {t('rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
