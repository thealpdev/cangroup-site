import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Truck, ExternalLink, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ProductGallery from '@/components/product/ProductGallery';

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
            {/* Top Navigation Bar */}
            <div className="border-b border-stone-100 bg-white sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/products" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Link>
                    <Separator orientation="vertical" className="h-6" />
                    <span className="text-sm text-stone-900 font-medium truncate max-w-[200px] md:max-w-none">
                        {product.name_de || product.name_en || product.name_tr}
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">

                    {/* Left: Sticky Gallery */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-4">
                            <ProductGallery
                                images={product.images || (product.image ? [product.image] : [])}
                                title={product.name_de || product.name_en || "Produkt"}
                            />
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
                                    Artikelnummer: <span className="text-stone-600">{product.productCode}</span>
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
                                    <span className="text-stone-400 font-medium">zzgl. MwSt.</span>
                                </div>
                            ) : (
                                <div className="text-2xl font-bold text-stone-900">Preis auf Anfrage</div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg px-8 flex-1 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <ExternalLink className="w-5 h-5" />
                                        WhatsApp Bestellung
                                    </span>
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 rounded-full border-stone-200 text-stone-900 font-bold text-lg px-8 flex-1 hover:bg-stone-50 transition-all">
                                    <span className="flex items-center justify-center gap-2">
                                        <Mail className="w-5 h-5" />
                                        Angebot anfordern
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* Features & Specs */}
                        <div className="bg-stone-50 rounded-3xl p-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-stone-900 uppercase tracking-widest mb-4">Produktmerkmale</h3>
                                <div className="prose prose-stone max-w-none text-stone-600">
                                    {(product.specs_de || product.specs_en || product.specs_tr || '').split('\n').filter((s: string) => s.trim()).map((spec: string, i: number) => (
                                        <div key={i} className="flex items-start gap-3 mb-2 last:mb-0">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C8102E] shrink-0" />
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                    {(!product.specs_de && !product.specs_en && !product.specs_tr) && <p className="text-stone-400 italic">Keine Merkmale aufgelistet.</p>}
                                </div>
                            </div>

                            {/* New Technical Details Section */}
                            {(product.height || product.length || product.width || product.weight || product.material) && (
                                <>
                                    <Separator className="bg-stone-200" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">

                                        {/* Dimensions Column */}
                                        <div>
                                            <h4 className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-4">Abmessungen</h4>
                                            <dl className="space-y-2">
                                                {product.height && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Höhe</dt>
                                                        <dd className="text-stone-900">{product.height}</dd>
                                                    </div>
                                                )}
                                                {product.length && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Länge</dt>
                                                        <dd className="text-stone-900">{product.length}</dd>
                                                    </div>
                                                )}
                                                {product.width && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Breite</dt>
                                                        <dd className="text-stone-900">{product.width}</dd>
                                                    </div>
                                                )}
                                                {product.weight && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Gewicht</dt>
                                                        <dd className="text-stone-900">{product.weight}</dd>
                                                    </div>
                                                )}
                                            </dl>
                                        </div>

                                        {/* Details Column */}
                                        <div>
                                            <h4 className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-4">Details</h4>
                                            <dl className="space-y-2">
                                                {product.productCode && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Artikelnummer</dt>
                                                        <dd className="text-stone-900">{product.productCode}</dd>
                                                    </div>
                                                )}
                                                {product.origin && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Herkunft</dt>
                                                        <dd className="text-stone-900">{product.origin}</dd>
                                                    </div>
                                                )}
                                                {product.material && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Material</dt>
                                                        <dd className="text-stone-900">{product.material}</dd>
                                                    </div>
                                                )}
                                                {product.bladeLength && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Klingenlänge</dt>
                                                        <dd className="text-stone-900">{product.bladeLength}</dd>
                                                    </div>
                                                )}
                                                {product.edgeType && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Schliff</dt>
                                                        <dd className="text-stone-900">{product.edgeType}</dd>
                                                    </div>
                                                )}
                                                {product.color && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Farbe</dt>
                                                        <dd className="text-stone-900">{product.color}</dd>
                                                    </div>
                                                )}
                                                {product.dishwasherSafe && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Spülmaschinenfest</dt>
                                                        <dd className="text-stone-900">{product.dishwasherSafe === 'yes' ? 'Ja' : 'Nein'}</dd>
                                                    </div>
                                                )}
                                                {product.warranty && (
                                                    <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                                                        <dt className="text-stone-500 font-medium">Garantie</dt>
                                                        <dd className="text-stone-900">{product.warranty}</dd>
                                                    </div>
                                                )}
                                            </dl>
                                        </div>
                                    </div>
                                </>
                            )}

                            <Separator className="bg-stone-200" />

                            <div>
                                <h3 className="text-lg font-bold text-stone-900 uppercase tracking-widest mb-4">Beschreibung</h3>
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
                                    <div className="font-bold text-stone-900 text-sm">Originalprodukt</div>
                                    <div className="text-xs text-stone-400">Händlergarantie</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-stone-100 bg-white">
                                <Truck className="w-8 h-8 text-stone-300" />
                                <div>
                                    <div className="font-bold text-stone-900 text-sm">Schneller Versand</div>
                                    <div className="text-xs text-stone-400">Versand in ganz Europa</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
