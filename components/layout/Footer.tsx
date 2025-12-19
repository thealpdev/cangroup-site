import Link from 'next/link';
import { Mail, Phone, ArrowRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
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
                            <a href="tel:+49123456789" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                                <Phone className="w-4 h-4 text-[#C8102E] group-hover:scale-110 transition-transform" />
                                <span className="text-sm">+49 (0) 123 456 789</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-stone-500">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Startseite", href: "/" },
                                { name: "Produkte", href: "/products" },
                                { name: "Über uns", href: "/about" },
                                { name: "Kontakt", href: "/contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-stone-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-stone-500">Rechtliches</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Impressum", href: "/impressum" },
                                { name: "Datenschutzerklärung", href: "/privacy" },
                                { name: "AGB", href: "/terms" },
                                { name: "Widerrufsrecht", href: "/revocation" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-stone-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Social */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-stone-500">Newsletter</h4>
                        <p className="text-stone-400 text-sm mb-6">
                            Abonnieren Sie unseren Newsletter für exklusive Angebote und Neuigkeiten.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="E-Mail Adresse"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-[#C8102E] transition-colors"
                            />
                            <button className="bg-[#C8102E] text-white px-4 py-2 rounded-lg hover:bg-[#a00d25] transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex gap-4 mt-8">
                            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-white hover:text-[#0a0a0a] transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-stone-500">
                        &copy; {new Date().getFullYear()} CANGROUP. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex gap-6">
                        {/* Payment Icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
