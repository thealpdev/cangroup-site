"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Mail, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
    {
        question: "Siparişimi nasıl takip edebilirim?",
        answer: "Siparişinizi verdikten sonra size gönderilen e-postadaki kargo takip numarası ile veya 'Hesabım' sayfasından sipariş durumunuzu anlık olarak takip edebilirsiniz."
    },
    {
        question: "İade politikanız nedir?",
        answer: "Satın aldığınız ürünleri, kullanılmamış ve orijinal ambalajında olması şartıyla 14 gün içinde iade edebilirsiniz. İade süreci için lütfen müşteri hizmetlerimizle iletişime geçin."
    },
    {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer: "Kredi kartı, banka havalesi ve PayPal gibi güvenli ödeme yöntemlerini kabul ediyoruz. Tüm işlemleriniz 256-bit SSL şifreleme ile güvence altındadır."
    },
    {
        question: "Yurtdışına gönderim yapıyor musunuz?",
        answer: "Evet, başta Avrupa ülkeleri olmak üzere birçok ülkeye gönderim yapmaktayız. Gönderim ücretleri ve süreleri, bulunduğunuz ülkeye göre değişiklik gösterebilir."
    },
    {
        question: "Bıçaklarımın bakımı nasıl yapılmalı?",
        answer: "Profesyonel bıçaklarınızı her kullanımdan sonra elde yıkamanızı ve hemen kurulamanızı öneririz. Bulaşık makinesi, bıçakların keskinliğine ve yapısına zarar verebilir."
    }
];

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero */}
            <div className="bg-[#0a0a0a] text-white pt-32 pb-20 px-6">
                <div className="container mx-auto text-center max-w-3xl">
                    <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                        Destek Merkezi
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6">Nasıl yardımcı olabiliriz?</h1>
                    <p className="text-white/60 text-lg leading-relaxed">
                        Sıkça sorulan soruları aşağıda bulabilir veya doğrudan bizimle iletişime geçebilirsiniz.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* FAQ Section */}
                    <div className="lg:col-span-8 space-y-6">
                        <h2 className="text-2xl font-serif font-bold mb-8">Sıkça Sorulan Sorular</h2>
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => (
                                <Accordion key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>

                    {/* Contact Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 sticky top-24">
                            <h3 className="text-xl font-serif font-bold mb-6">İletişime Geçin</h3>

                            <div className="space-y-6">
                                <Link href="/contact" className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#C8102E] group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-stone-900 block">E-Posta</span>
                                        <span className="text-sm text-stone-500">info@cangroup.de</span>
                                    </div>
                                </Link>

                                <div className="flex items-start gap-4 group cursor-default">
                                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#C8102E] group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-stone-900 block">WhatsApp / Telefon</span>
                                        <span className="text-sm text-stone-500">+49 0176 20438754</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group cursor-default">
                                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#C8102E] group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-stone-900 block">Canlı Destek</span>
                                        <span className="text-sm text-stone-500">09:00 - 18:00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-stone-100">
                                <Link
                                    href="/contact"
                                    className="block w-full text-center bg-[#C8102E] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#a00d25] transition-colors"
                                >
                                    Bize Ulaşın
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function Accordion({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors"
            >
                <span className="font-bold text-stone-900">{question}</span>
                {isOpen ? <Minus className="w-5 h-5 text-[#C8102E]" /> : <Plus className="w-5 h-5 text-stone-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-stone-600 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
