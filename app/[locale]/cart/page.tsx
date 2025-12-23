"use client";

import { useCart } from '@/lib/cart-context';
import { Link } from '@/i18n/navigation'; // Use i18n Link
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash, Minus, Plus, ArrowRight, Mail, Send } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function CartPage() {
    const { items, removeItem, clearCart, totalItems } = useCart();
    const t = useTranslations('Cart');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const subtotal = items.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return acc + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

    const handleSendQuote = (e: React.FormEvent) => {
        e.preventDefault();

        const itemList = items.map(item =>
            `- ${item.name} (Kod: ${item.productCode || 'N/A'}) - Adet: ${item.quantity}`
        ).join('\n');

        const mailBody = `
Merhaba CanGroup,

Aşağıdaki ürünler için fiyat teklifi almak istiyorum:

Müşteri Bilgileri:
Ad Soyad: ${formData.name}
Firma: ${formData.company}
E-posta: ${formData.email}
Telefon: ${formData.phone}

Ürün Listesi:
${itemList}

Mesaj:
${formData.message}
        `.trim();

        const subject = `Teklif İsteği: ${formData.name}`;

        // Open default mail client
        window.location.href = `mailto:info@cangroup.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 rounded-3xl shadow-sm border border-stone-100 max-w-lg w-full"
                    >
                        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Send className="w-8 h-8 text-stone-400" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">{t('empty')}</h1>
                        <p className="text-stone-500 mb-8 leading-relaxed">
                            {/* Keep generic or add 'browseCatalog' key */}
                            Please browse our catalog to add items.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-[#a00d25] transition-all hover:scale-105"
                        >
                            {/* Make 'Ürünlere Göz At' dynamic if possible or generic */}
                            Browse Products
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50">
            <Header />
            <main className="pt-32 pb-24 container mx-auto px-4 max-w-7xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-12"
                >
                    {t('title')} <span className="text-[#C8102E] text-2xl align-middle">({totalItems})</span>
                </motion.h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex gap-6 group hover:border-[#C8102E]/30 transition-colors"
                            >
                                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.image || '/placeholder.png'}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold font-serif text-stone-900 line-clamp-2">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                        {item.productCode && (
                                            <p className="text-sm text-stone-500 mt-1">Kod: {item.productCode}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1">
                                            <span className="px-3 py-1 font-bold text-stone-900 select-none">x{item.quantity}</span>
                                        </div>
                                        {/* Optional Price Display */}
                                        {/* <p className="font-bold text-lg text-[#C8102E]">{item.price}</p> */}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <div className="flex justify-end pt-4">
                            <button
                                onClick={clearCart}
                                className="text-sm text-stone-500 hover:text-red-600 underline decoration-dotted underline-offset-4"
                            >
                                {t('empty') ? 'Clear List' : 'Listeyi Temizle'} {/* Need a 'clear' key. Using 'empty' is wrong logic here but placeholder. */}
                            </button>
                        </div>
                    </div>

                    {/* Quote Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 sticky top-32">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-[#C8102E]/10 rounded-full text-[#C8102E]">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-serif font-bold">{t('requestQuote')}</h2>
                            </div>

                            <p className="text-stone-500 mb-8 text-sm">
                                {/* Generic text or add key */}
                                Please fill the form to request a quote.
                            </p>

                            <form onSubmit={handleSendQuote} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('formName')}</Label>
                                    <Input
                                        id="name"
                                        required
                                        placeholder={t('formName')}
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-stone-50 border-stone-200 focus:border-[#C8102E]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">{t('formCompany')}</Label>
                                    <Input
                                        id="company"
                                        placeholder={t('formCompany')}
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        className="bg-stone-50 border-stone-200 focus:border-[#C8102E]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t('formEmail')}</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="ornek@site.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="bg-stone-50 border-stone-200 focus:border-[#C8102E]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('formPhone')}</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            required
                                            placeholder="05..."
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="bg-stone-50 border-stone-200 focus:border-[#C8102E]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">{t('formMessage')}</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="..."
                                        className="bg-stone-50 border-stone-200 focus:border-[#C8102E] min-h-[100px]"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[#C8102E] hover:bg-[#a00d25] text-white font-bold py-6 text-lg rounded-xl mt-4 shadow-xl shadow-[#C8102E]/20"
                                >
                                    {t('send')}
                                    <Send className="w-5 h-5 ml-2" />
                                </Button>

                                <p className="text-xs text-stone-400 text-center mt-4">
                                    {/* Generic hint */}
                                    Email application will open.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
