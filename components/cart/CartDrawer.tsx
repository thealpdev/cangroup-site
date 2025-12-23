"use client";

import { useTranslations } from "next-intl";

import { useCart } from "@/lib/cart-context";
import { X, Trash2, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
    const { items, removeItem, isOpen, setIsOpen, totalItems } = useCart();
    const t = useTranslations('Cart');
    const tCommon = useTranslations('Common');

    if (!isOpen) return null;

    const handleWhatsAppQuote = () => {
        const phone = "491784057295"; // Updated to real number
        let message = "*Hallo CanGroup, ich möchte ein Angebot für folgende Produkte anfordern:* \n\n";

        items.forEach((item, i) => {
            message += `${i + 1}. ${item.name} (${item.brand}) - ${item.quantity}x\n`;
            message += `   Code: ${item.productCode}\n\n`;
        });

        message += "Bitte kontaktieren Sie mich.";

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleEmailQuote = () => {
        const subject = "Angebotsanfrage: CanGroup";
        let body = "Hallo CanGroup,\n\nIch möchte ein unverbindliches Angebot für folgende Produkte anfordern:\n\n";

        items.forEach((item, i) => {
            body += `${i + 1}. ${item.name} (${item.brand})\n`;
            body += `   Code: ${item.productCode}\n`;
            body += `   Menge: ${item.quantity}x\n\n`;
        });

        body += "Bitte kontaktieren Sie mich.\n\nMit freundlichen Grüßen";

        window.open(`mailto:info@canmarkt.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div className={cn(
                "fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header */}
                <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                    <div>
                        <h2 className="text-xl font-bold font-serif text-[#0a0a0a]">{t('title')}</h2>
                        <p className="text-xs text-stone-500">{totalItems} Produkte</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-stone-500" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-300">
                                <Trash2 className="w-8 h-8" />
                            </div>
                            <p className="text-stone-500 font-medium">{t('empty')}</p>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Produkte durchsuchen
                            </Button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-20 h-20 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 flex-shrink-0">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-[8px] text-stone-400">{tCommon('noImage')}</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-bold text-[#C8102E] uppercase tracking-wider mb-1">{item.brand}</p>
                                            <h4 className="text-sm font-bold text-stone-900 line-clamp-2 leading-tight">{item.name}</h4>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-stone-400 hover:text-red-600 transition-colors p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600 font-mono">
                                            {item.productCode}
                                        </div>
                                        <div className="text-sm font-bold">
                                            {item.quantity}x
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-stone-100 bg-stone-50 space-y-3">
                        <Button
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-900/10 h-12 text-sm font-bold uppercase tracking-wider gap-2"
                            onClick={handleWhatsAppQuote}
                        >
                            <MessageCircle className="w-5 h-5" />
                            {t('whatsappBtn')}
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-stone-300 text-stone-600 hover:bg-white hover:text-[#0a0a0a]"
                            onClick={handleEmailQuote}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            {t('emailBtn')}
                        </Button>
                        <p className="text-[10px] text-center text-stone-400 pt-2">
                            {t('disclaimer')}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
