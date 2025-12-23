"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Mail, Phone, ExternalLink, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function ProductActions({ product }: { product: any }) {
    const { addItem, setIsOpen } = useCart();
    const t = useTranslations('Products');

    const handleAddToCart = () => {
        addItem(product);
        setIsOpen(true);
    };

    const handleWhatsApp = () => {
        const phone = "491784057295";
        const message = `Halo, ich interessiere mich für: ${product.name_de || product.name_en} (${product.productCode}).`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="flex flex-col gap-4">
            <Button
                size="lg"
                onClick={handleAddToCart}
                className="h-16 rounded-2xl bg-[#C8102E] hover:bg-[#a00d25] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] uppercase opacity-90 tracking-wider">{t('addToQuote')}</span>
                        <span>{t('requestQuote')}</span>
                    </div>
                </div>
            </Button>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    size="lg"
                    variant="outline"
                    onClick={handleWhatsApp}
                    className="h-14 rounded-xl border-2 border-[#25D366] text-[#25D366] bg-white font-bold hover:bg-[#25D366] hover:text-white transition-all"
                >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    WhatsApp
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-xl border-2 border-stone-100 bg-white text-stone-900 font-bold hover:bg-stone-50 hover:border-stone-200 transition-all"
                >
                    <Phone className="w-5 h-5 mr-2" />
                    {t('call')}
                </Button>
            </div>
        </div>
    );
}
