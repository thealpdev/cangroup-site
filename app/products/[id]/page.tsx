import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Truck, ExternalLink, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Helper to get currency symbol
const getCurrencySymbol = (code?: string) => {
    switch (code) {
        case 'USD': return '$';
        case 'TRY': return '₺';
        case 'GBP': return '£';
        default: return '€';
    }
};

async function getProduct(id: string) {
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as any;
        }
        return null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) {
        return notFound();
    }

    const currencySymbol = getCurrencySymbol(product.currency);

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation Bar */}
            <div className="border-b border-stone-100 bg-white sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Catalog
                    </Link>
                    <Separator orientation="vertical" className="h-6" />
                    <span className="text-sm text-stone-900 font-medium truncate max-w-[200px] md:max-w-none">
                        {product.name_de || product.name_tr || product.name_en}
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">

                    {/* Left: Sticky Gallery */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-4">
                            <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-50 border border-stone-100 shadow-sm cursor-zoom-in group">
                                {product.images?.[0] ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name_de}
                                        fill
                                        className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                                        priority
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-stone-300 font-bold tracking-widest uppercase">No Image</div>
                                )}
                            </div>

                            {/* Thumbnails (Simple implementation for now) */}
                            {product.images?.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.map((img: string, i: number) => (
                                        <div key={i} className={`relative aspect-square rounded-2xl overflow-hidden border cursor-pointer transition-all ${i === 0 ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-100 hover:border-stone-300'}`}>
                                            <Image src={img} alt="Thumbnail" fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="border-[#C8102E] text-[#C8102E] uppercase font-bold tracking-wider rounded-md h-6 px-2">
                                    {product.brand}
                                </Badge>
                                {product.category && (
                                    <Badge variant="secondary" className="bg-stone-100 text-stone-500 uppercase font-bold tracking-wider rounded-md h-6 px-2">
                                        {product.category}
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 leading-[1.1] tracking-tight">
                                {product.name_de}
                            </h1>
                            {product.productCode && (
                                <p className="text-stone-400 font-mono text-sm uppercase tracking-widest">
                                    Code: <span className="text-stone-600">{product.productCode}</span>
                                </p>
                            )}
                        </div>

                        <Separator />

                        {/* Price & CTA */}
                        <div className="flex flex-col gap-6">
                            {product.price ? (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-stone-900 tracking-tighter">
                                        {currencySymbol}{product.price}
                                    </span>
                                    <span className="text-stone-400 font-medium">excl. VAT</span>
                                </div>
                            ) : (
                                <div className="text-2xl font-bold text-stone-900">Price on Request</div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg px-8 flex-1 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <ExternalLink className="w-5 h-5" />
                                        WhatsApp Sipariş
                                    </span>
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 rounded-full border-stone-200 text-stone-900 font-bold text-lg px-8 flex-1 hover:bg-stone-50 transition-all">
                                    <span className="flex items-center justify-center gap-2">
                                        <Mail className="w-5 h-5" />
                                        Teklif Al
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* Features & Specs */}
                        <div className="bg-stone-50 rounded-3xl p-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-stone-900 uppercase tracking-widest mb-4">Ürün Özellikleri</h3>
                                <div className="prose prose-stone max-w-none text-stone-600">
                                    {(product.specs_de || product.specs_tr || product.specs_en || '').split('\n').map((spec: string, i: number) => (
                                        <div key={i} className="flex items-start gap-3 mb-2 last:mb-0">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C8102E] shrink-0" />
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                    {(!product.specs_de && !product.specs_tr) && <p className="text-stone-400 italic">No specific features listed.</p>}
                                </div>
                            </div>

                            <Separator className="bg-stone-200" />

                            <div>
                                <h3 className="text-lg font-bold text-stone-900 uppercase tracking-widest mb-4">Açıklama</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    {product.description_de || product.description_tr || product.description_en}
                                </p>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-stone-100 bg-white">
                                <ShieldCheck className="w-8 h-8 text-stone-300" />
                                <div>
                                    <div className="font-bold text-stone-900 text-sm">Orijinal Ürün</div>
                                    <div className="text-xs text-stone-400">Yetkili Satıcı Garantisi</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-stone-100 bg-white">
                                <Truck className="w-8 h-8 text-stone-300" />
                                <div>
                                    <div className="font-bold text-stone-900 text-sm">Hızlı Teslimat</div>
                                    <div className="text-xs text-stone-400">Tüm Avrupa'ya Kargo</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
