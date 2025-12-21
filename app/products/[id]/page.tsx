import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Truck, ExternalLink, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ProductGallery from '@/components/product/ProductGallery';
import ProductActions from '@/components/product/ProductActions';

// Helper to get currency symbol
const getCurrencySymbol = (code?: string) => {
    switch (code) {
        case 'USD': return '$';
        case 'TRY': return '₺';
        case 'GBP': return '£';
        default: return '€';
    }
};

// Force dynamic rendering to ensure new products appear immediately
export const dynamic = "force-dynamic";

async function getProduct(id: string) {
    console.log("Fetching product with ID:", id); // Debug log
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as any;
        }
        console.warn("Product not found in Firestore:", id);
        return null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
    // Next.js 15+ requires awaiting params
    const params = await props.params;
    const product = await getProduct(params.id);

    if (!product) {
        return notFound();
    }

    const currencySymbol = getCurrencySymbol(product.currency);

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation Bar - Sticky & Frosted */}
            <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-stone-100">
                <div className="container mx-auto px-4 h-16 flex items-center gap-4">
                    <Link
                        href="/products"
                        className="group flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium"
                    >
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="hidden sm:inline">Kataloğa Dön</span>
                    </Link>
                    <Separator orientation="vertical" className="h-6" />
                    <span className="text-sm text-stone-900 font-medium truncate max-w-[200px] md:max-w-md">
                        {product.name_de || product.name_en || product.name_tr}
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">

                    {/* Left: Sticky Gallery */}
                    <div className="relative">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-stone-50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <ProductGallery
                                    images={product.images || (product.image ? [product.image] : [])}
                                    title={product.name_de || product.name_en || "Produkt"}
                                />
                            </div>

                            {/* Trust Badges - Desktop */}
                            <div className="hidden lg:grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100/50">
                                    <ShieldCheck className="w-6 h-6 text-[#C8102E]" />
                                    <div>
                                        <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">Garanti</div>
                                        <div className="text-[11px] text-stone-500">Orijinal Ürün Garantisi</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100/50">
                                    <Truck className="w-6 h-6 text-[#C8102E]" />
                                    <div>
                                        <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">Teslimat</div>
                                        <div className="text-[11px] text-stone-500">Hızlı & Güvenli Kargo</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                        {/* Breadcrumbs / Badges */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="outline" className="border-[#C8102E] text-[#C8102E] uppercase font-extrabold tracking-widest rounded-full h-7 px-3 text-[10px]">
                                {product.brand}
                            </Badge>
                            {product.category && (
                                <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-200 uppercase font-bold tracking-wider rounded-full h-7 px-3 text-[10px]">
                                    {product.category}
                                </Badge>
                            )}
                            {product.productCode && (
                                <span className="text-[10px] font-mono text-stone-400 bg-stone-50 px-2 py-1 rounded-md border border-stone-100">
                                    SKU: {product.productCode}
                                </span>
                            )}
                        </div>

                        {/* Title & Price */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 leading-[0.95] tracking-tight">
                                {product.name_de}
                            </h1>

                            <div className="pt-2">
                                {product.price ? (
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-5xl md:text-6xl font-bold text-[#C8102E] tracking-tighter">
                                            {currencySymbol}{product.price}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-stone-400">+ KDV</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-3xl font-bold text-stone-900">Fiyat Teklifi Alın</div>
                                )}
                            </div>
                        </div>

                        <Separator className="bg-stone-100" />

                        {/* Action Buttons */}
                        <ProductActions product={product} />

                        {/* Specs Box */}
                        <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100/50">
                            <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-widest mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#C8102E]"></span>
                                Ürün Özellikleri
                            </h3>

                            <div className="space-y-4">
                                {(product.specs_de || product.specs_en || product.specs_tr || '').split('\n').filter((s: string) => s.trim()).map((spec: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 group">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-[#C8102E] transition-colors">
                                            <Check className="w-3 h-3 text-[#C8102E]" />
                                        </div>
                                        <span className="text-stone-600 leading-relaxed font-medium">{spec}</span>
                                    </div>
                                ))}
                                {(!product.specs_de && !product.specs_en && !product.specs_tr) && (
                                    <p className="text-stone-400 italic">Genel özellik bulunamadı.</p>
                                )}
                            </div>
                        </div>

                        {/* Technical Details Grid */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-sm">
                            {/* Dimensions */}
                            {(product.height || product.length || product.width || product.weight) && (
                                <div className="space-y-3">
                                    <h4 className="font-bold text-stone-900 border-b border-stone-200 pb-2 mb-2">Boyutlar & Ağırlık</h4>
                                    {product.height && <div className="flex justify-between"><span className="text-stone-500">Yükseklik</span> <span className="font-medium text-stone-900">{product.height}</span></div>}
                                    {product.length && <div className="flex justify-between"><span className="text-stone-500">Uzunluk</span> <span className="font-medium text-stone-900">{product.length}</span></div>}
                                    {product.width && <div className="flex justify-between"><span className="text-stone-500">Genişlik</span> <span className="font-medium text-stone-900">{product.width}</span></div>}
                                    {product.weight && <div className="flex justify-between"><span className="text-stone-500">Ağırlık</span> <span className="font-medium text-stone-900">{product.weight}</span></div>}
                                </div>
                            )}

                            {/* Details */}
                            {(product.material || product.origin || product.bladeLength || product.color) && (
                                <div className="space-y-3">
                                    <h4 className="font-bold text-stone-900 border-b border-stone-200 pb-2 mb-2">Teknik Detaylar</h4>
                                    {product.material && <div className="flex justify-between"><span className="text-stone-500">Malzeme</span> <span className="font-medium text-stone-900 truncate ml-2" title={product.material}>{product.material}</span></div>}
                                    {product.origin && <div className="flex justify-between"><span className="text-stone-500">Menşei</span> <span className="font-medium text-stone-900">{product.origin}</span></div>}
                                    {product.bladeLength && <div className="flex justify-between"><span className="text-stone-500">Bıçak Uzunluğu</span> <span className="font-medium text-stone-900">{product.bladeLength}</span></div>}
                                    {product.color && <div className="flex justify-between"><span className="text-stone-500">Renk</span> <span className="font-medium text-stone-900">{product.color}</span></div>}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-bold text-stone-900 mb-4">Açıklama</h3>
                            <div className="prose prose-stone prose-sm max-w-none text-stone-500 leading-loose">
                                <p>{product.description_de || product.description_tr || product.description_en}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
