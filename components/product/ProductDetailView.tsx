
"use client";

import { useLanguage } from '@/lib/language-context';
import { ArrowLeft, ShieldCheck, Truck, Package } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ProductGallery from '@/components/product/ProductGallery';
import ProductActions from '@/components/product/ProductActions';
import StickyProductBar from '@/components/product/StickyProductBar';
import RelatedProducts from '@/components/product/RelatedProducts';
import { motion } from 'framer-motion';

// Helper to get currency symbol
const getCurrencySymbol = (code?: string) => {
    switch (code) {
        case 'USD': return '$';
        case 'TRY': return '₺';
        case 'GBP': return '£';
        default: return '€';
    }
};

interface ProductDetailViewProps {
    product: any; // Type strictly if possible, using 'any' to match current flow for now
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
    const { language, t } = useLanguage();

    const getName = () => (product as any)[`name_${language}`] || product.name_de || product.name_en;
    const getDescription = () => (product as any)[`description_${language}`] || product.description_de || product.description_en;
    const getSpecs = () => (product as any)[`specs_${language}`] || product.specs_de || product.specs_en || '';

    const currencySymbol = getCurrencySymbol(product.currency);

    return (
        <div className="min-h-screen bg-white pb-32">
            {/* Mobile Sticky Bar */}
            <StickyProductBar product={product} currencySymbol={currencySymbol} />

            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-stone-100 transition-all duration-300">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/products"
                            className="group flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium"
                        >
                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-[#C8102E] group-hover:text-white transition-all duration-300">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="hidden sm:inline">{language === 'tr' ? 'Kataloğa Dön' : language === 'de' ? 'Zurück zum Katalog' : 'Back to Catalog'}</span>
                        </Link>
                        <Separator orientation="vertical" className="h-6 hidden sm:block" />
                        <span className="hidden sm:inline text-sm text-stone-900 font-medium truncate max-w-[200px] md:max-w-md">
                            {getName()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">

                    {/* Left Column: Gallery (7 Cols) */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24 space-y-8">
                            <ProductGallery
                                images={product.images || (product.image ? [product.image] : [])}
                                title={getName()}
                            />

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-[#C8102E]" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-900">
                                        {language === 'tr' ? 'Orijinal Ürün' : language === 'de' ? 'Originalprodukt' : 'Original Product'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2 border-l border-r border-stone-200">
                                    <Truck className="w-6 h-6 text-[#C8102E]" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-900">
                                        {language === 'tr' ? 'Hızlı Kargo' : language === 'de' ? 'Schneller Versand' : 'Fast Shipping'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Package className="w-6 h-6 text-[#C8102E]" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-900">
                                        {language === 'tr' ? 'Güvenli Paket' : language === 'de' ? 'Sichere Verpackung' : 'Secure Packaging'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info (5 Cols) */}
                    <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

                        {/* Header Info */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge className="bg-[#C8102E] hover:bg-[#a00d25] text-white uppercase font-bold tracking-widest rounded-md px-3 py-1 text-[10px]">
                                    {product.brand || 'CanMarkt'}
                                </Badge>
                                {product.category && (
                                    <Badge variant="outline" className="text-stone-500 border-stone-200 uppercase font-bold tracking-wider rounded-md px-3 py-1 text-[10px]">
                                        {product.category}
                                    </Badge>
                                )}
                                <span className="text-[10px] font-mono text-stone-400 ml-auto">
                                    SKU: {product.productCode || 'N/A'}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0a0a0a] leading-[1.1]">
                                {getName()}
                            </h1>

                            <div className="flex items-baseline gap-4 pt-2 border-b border-stone-100 pb-6">
                                {product.price ? (
                                    <>
                                        <span className="text-4xl md:text-5xl font-bold text-[#C8102E] tracking-tight">
                                            {currencySymbol}{product.price}
                                        </span>
                                        <span className="text-sm font-medium text-stone-400 uppercase tracking-wide">
                                            {language === 'tr' ? '+ KDV Dahil' : language === 'de' ? 'inkl. MwSt.' : 'VAT Included'}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-stone-900">
                                        {language === 'tr' ? 'Fiyat Teklifi Alın' : language === 'de' ? 'Preis auf Anfrage' : 'Get a Quote'}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description Preview */}
                        <div className="prose prose-stone prose-sm text-stone-600 leading-relaxed">
                            <p className="line-clamp-3">
                                {getDescription()}
                            </p>
                        </div>

                        {/* Actions */}
                        <ProductActions product={product} />

                        {/* Accordion Details */}
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="features">
                                <AccordionTrigger className="text-stone-900 font-bold uppercase tracking-wider text-xs">
                                    {language === 'tr' ? 'Ürün Özellikleri' : language === 'de' ? 'Produkteigenschaften' : 'Product Features'}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pt-4">
                                        {getSpecs().split('\n').filter((s: string) => s.trim()).map((spec: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#C8102E] mt-2 shrink-0" />
                                                <span className="text-stone-600 font-medium">{spec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="description">
                                <AccordionTrigger className="text-stone-900 font-bold uppercase tracking-wider text-xs">
                                    {language === 'tr' ? 'Detaylı Açıklama' : language === 'de' ? 'Detaillierte Beschreibung' : 'Detailed Description'}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="prose prose-stone prose-sm pt-4">
                                        <p>{getDescription()}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="shipping">
                                <AccordionTrigger className="text-stone-900 font-bold uppercase tracking-wider text-xs">
                                    {language === 'tr' ? 'Teslimat ve İade' : language === 'de' ? 'Versand & Rückgabe' : 'Shipping & Returns'}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="text-stone-600 pt-4 space-y-2">
                                        <p>{language === 'tr' ? 'Tüm siparişler sigortalı kargo ile gönderilir.' : language === 'de' ? 'Alle Bestellungen werden versichert versendet.' : 'All orders are shipped with insurance.'}</p>
                                        <p>{language === 'tr' ? '14 gün içinde koşulsuz iade hakkınız mevcuttur.' : language === 'de' ? 'Rückgabe innerhalb von 14 Tagen möglich.' : 'Returns accepted within 14 days.'}</p>
                                        <p className="text-[#C8102E] font-bold">{language === 'tr' ? 'Kurumsal fatura mevcuttur.' : language === 'de' ? 'Firmenrechnung verfügbar.' : 'Corporate invoice available.'}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-24">
                    <RelatedProducts
                        currentProductId={product.id}
                        category={product.category}
                        brand={product.brand}
                    />
                </div>
            </div>
        </div>
    );
}
