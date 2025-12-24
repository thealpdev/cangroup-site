"use client";

import { Link } from '@/i18n/navigation';
import { Mail, Phone, ArrowRight, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navbar');
    const tLegal = useTranslations('Legal');

    return (
        <footer className="relative bg-gradient-to-b from-stone-900 via-stone-950 to-black text-white overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,16,46,0.05),transparent_70%)]" />

            <div className="container mx-auto px-4 md:px-6 relative">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 py-16 md:py-24">

                    {/* Brand Column - Wider */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block group">
                            <span className="text-3xl font-serif font-bold tracking-wider">
                                CAN<span className="text-[#C8102E]">GROUP</span>
                            </span>
                        </Link>
                        <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                            {t('brandDesc')}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 pt-4">
                            <a
                                href="mailto:info@cangroup.de"
                                className="flex items-center gap-3 text-stone-400 hover:text-white transition-all duration-300 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#C8102E]/10 flex items-center justify-center group-hover:bg-[#C8102E]/20 transition-colors">
                                    <Mail className="w-4 h-4 text-[#C8102E]" />
                                </div>
                                <span className="text-sm">info@cangroup.de</span>
                            </a>
                            <a
                                href="https://wa.me/4917620438754"
                                className="flex items-center gap-3 text-stone-400 hover:text-white transition-all duration-300 group"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#C8102E]/10 flex items-center justify-center group-hover:bg-[#C8102E]/20 transition-colors">
                                    <Phone className="w-4 h-4 text-[#C8102E]" />
                                </div>
                                <span className="text-sm">WhatsApp: +49 176 20438754</span>
                            </a>
                            <a
                                href="tel:+4960424056139"
                                className="flex items-center gap-3 text-stone-400 hover:text-white transition-all duration-300 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#C8102E]/10 flex items-center justify-center group-hover:bg-[#C8102E]/20 transition-colors">
                                    <Phone className="w-4 h-4 text-[#C8102E]" />
                                </div>
                                <span className="text-sm">Ofis: 06042 4056139</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-white">
                            {tNav('menu') || t('menu')}
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: tNav('home'), href: "/" },
                                { name: tNav('products'), href: "/products" },
                                { name: tNav('about'), href: "/about" },
                                { name: tNav('contact'), href: "/contact" }
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-stone-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-[#C8102E] group-hover:w-4 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-3">
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-white">
                            {t('legal')}
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Impressum", href: "/impressum" },
                                { name: "Datenschutzerklärung", href: "/privacy" },
                                { name: "AGB", href: "/terms" },
                                { name: "Widerrufsrecht", href: "/revocation" }
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-stone-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-[#C8102E] group-hover:w-4 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-2">
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-white">
                            {t('newsletter')}
                        </h4>
                        <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                            {t('subscribeText')}
                        </p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-[#C8102E] focus:bg-white/10 transition-all placeholder:text-stone-600"
                            />
                            <button className="bg-[#C8102E] text-white px-4 py-3 rounded-xl hover:bg-[#a00d25] transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm group">
                                Abonnieren
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-stone-500">
                            &copy; {new Date().getFullYear()} CANGROUP. {t('rights')}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                            <MapPin className="w-3 h-3" />
                            <span>Made with ❤️ in Germany</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
