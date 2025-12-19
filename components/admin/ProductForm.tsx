"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/admin/ImageUpload';
import { Loader2, Save, Tag, Coins, Hash, Ruler } from 'lucide-react';

const BRANDS = [
    { id: 'canadam', name: 'Canadam' },
    { id: 'dick', name: 'Dick' },
    { id: 'victorinox', name: 'Victorinox' },
    { id: 'zwilling', name: 'Zwilling' },
    { id: 'solingen', name: 'Solingen' },
    { id: 'euroflex', name: 'Euroflex' },
    { id: 'other', name: 'Diğer' }
];

const CURRENCIES = [
    { id: 'EUR', symbol: '€', name: 'Euro (EUR)' },
    { id: 'USD', symbol: '$', name: 'Amerikan Doları (USD)' },
    { id: 'TRY', symbol: '₺', name: 'Türk Lirası (TRY)' },
    { id: 'GBP', symbol: '£', name: 'İngiliz Sterlini (GBP)' },
];

interface ProductFormData {
    productCode: string;
    productNumber: string;
    name_de: string; name_tr: string; name_en: string;
    description_de: string; description_tr: string; description_en: string;
    specs_de: string; specs_tr: string; specs_en: string;
    brand: string;
    category: string;
    price: string;
    currency: string;
    images: string[];
}

export default function ProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

    const [formData, setFormData] = useState<ProductFormData>({
        productCode: '', productNumber: '',
        name_de: '', name_tr: '', name_en: '',
        description_de: '', description_tr: '', description_en: '',
        specs_de: '', specs_tr: '', specs_en: '',
        brand: 'canadam', category: '',
        price: '', currency: 'EUR',
        images: []
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const q = query(collection(db, "categories"), orderBy("name", "asc"));
            const snapshot = await getDocs(q);
            setCategories(snapshot.docs.map(d => ({ id: d.id, name: d.data().name })));
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (images.length === 0) { alert("En az bir görsel yüklemelisiniz."); return; }
            if (!formData.name_tr) { alert("Türkçe ürün adı zorunludur."); return; }

            await addDoc(collection(db, "products"), {
                ...formData,
                images: images,
                createdAt: serverTimestamp(),
            });

            alert("Ürün başarıyla oluşturuldu! ✅");

            // Reset form
            setFormData({
                productCode: '', productNumber: '',
                name_de: '', name_tr: '', name_en: '',
                description_de: '', description_tr: '', description_en: '',
                specs_de: '', specs_tr: '', specs_en: '',
                brand: 'canadam', category: '',
                price: '', currency: 'EUR',
                images: []
            });
            setImages([]);
            router.refresh();

        } catch (error) {
            console.error(error);
            alert("Ürün oluşturulurken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Content */}
            <div className="lg:col-span-2 space-y-6">

                {/* 1. Images & Identity */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="rounded-2xl border-none shadow-sm md:col-span-2">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                                <Tag className="w-5 h-5 text-[#C8102E]" />
                                Ürün Görselleri
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ImageUpload
                                value={images}
                                onChange={(url) => setImages(prev => [...prev, url])}
                                onRemove={(url) => setImages(prev => prev.filter(c => c !== url))}
                                disabled={loading}
                            />
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-none shadow-sm md:col-span-2">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                                <Hash className="w-5 h-5 text-[#C8102E]" />
                                Kimlik Kodları
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Ürün Kodu (SKU)</Label>
                                <Input
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleInputChange}
                                    className="rounded-xl h-11 focus-visible:ring-[#C8102E]"
                                    placeholder="Örn: CN-KITCHEN-001"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Alternatif No / EAN</Label>
                                <Input
                                    name="productNumber"
                                    value={formData.productNumber}
                                    onChange={handleInputChange}
                                    className="rounded-xl h-11 focus-visible:ring-[#C8102E]"
                                    placeholder="Örn: 8690000000"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 2. Localized Content & Technical Details */}
                <Card className="rounded-2xl border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">Ürün İçeriği</CardTitle>
                        <CardDescription>Ürün bilgilerini 3 dilde giriniz.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* TR */}
                        <div className="space-y-4 bg-stone-50/50 p-4 rounded-xl border border-stone-100">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                                <span className="text-xl shadow-sm rounded overflow-hidden">🇹🇷</span>
                                <h3 className="font-bold text-stone-900">Türkçe (Varsayılan)</h3>
                            </div>
                            <div className="grid gap-4">
                                <Input name="name_tr" value={formData.name_tr} onChange={handleInputChange} className="rounded-xl h-11 border-stone-200" placeholder="Ürün Adı" required />
                                <Textarea name="description_tr" value={formData.description_tr} onChange={handleInputChange} className="rounded-xl min-h-[80px] border-stone-200" placeholder="Kısa Açıklama" />
                                <Textarea name="specs_tr" value={formData.specs_tr} onChange={handleInputChange} className="rounded-xl min-h-[100px] font-mono text-xs border-stone-200" placeholder="• Paslanmaz Çelik &#10;• Bulaşık Makinesine Uygun &#10;• 2 Yıl Garanti" />
                            </div>
                        </div>

                        {/* DE */}
                        <div className="space-y-4 p-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                                <span className="text-xl shadow-sm rounded overflow-hidden">🇩🇪</span>
                                <h3 className="font-bold text-stone-900">Almanca</h3>
                            </div>
                            <div className="grid gap-4">
                                <Input name="name_de" value={formData.name_de} onChange={handleInputChange} className="rounded-xl h-11" placeholder="German Product Name" />
                                <Textarea name="description_de" value={formData.description_de} onChange={handleInputChange} className="rounded-xl min-h-[80px]" placeholder="Beschreibung" />
                                <Textarea name="specs_de" value={formData.specs_de} onChange={handleInputChange} className="rounded-xl min-h-[100px] font-mono text-xs" placeholder="• Rostfreier Stahl..." />
                            </div>
                        </div>

                        {/* EN */}
                        <div className="space-y-4 p-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                                <span className="text-xl shadow-sm rounded overflow-hidden">🇬🇧</span>
                                <h3 className="font-bold text-stone-900">İngilizce</h3>
                            </div>
                            <div className="grid gap-4">
                                <Input name="name_en" value={formData.name_en} onChange={handleInputChange} className="rounded-xl h-11" placeholder="English Product Name" />
                                <Textarea name="description_en" value={formData.description_en} onChange={handleInputChange} className="rounded-xl min-h-[80px]" placeholder="Description" />
                                <Textarea name="specs_en" value={formData.specs_en} onChange={handleInputChange} className="rounded-xl min-h-[100px] font-mono text-xs" placeholder="• Stainless Steel..." />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Settings & Price */}
            <div className="space-y-6">
                <Card className="rounded-2xl border-none shadow-lg sticky top-8 bg-stone-900 text-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight text-white">Yayın Ayarları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="space-y-2">
                            <Label className="text-stone-300">Marka</Label>
                            <Select
                                value={formData.brand}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, brand: val }))}
                            >
                                <SelectTrigger className="rounded-xl bg-white/10 border-white/10 text-white focus:ring-offset-stone-900 focus:ring-white/20 h-12">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {BRANDS.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-stone-300">Kategori</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                            >
                                <SelectTrigger className="rounded-xl bg-white/10 border-white/10 text-white focus:ring-offset-stone-900 focus:ring-white/20 h-12">
                                    <SelectValue placeholder="Seçiniz..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <div className="flex items-center gap-2 mt-1">
                                <Tag className="w-3 h-3 text-stone-500" />
                                <span className="text-[10px] text-stone-500">Listede yoksa önce kategori ekleyin.</span>
                            </div>
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="grid grid-cols-5 gap-3">
                            <div className="col-span-3 space-y-2">
                                <Label className="text-stone-300 flex items-center gap-2">
                                    <Coins className="w-4 h-4" /> Fiyat
                                </Label>
                                <Input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="rounded-xl bg-white/10 border-white/10 text-white h-12 focus-visible:ring-white/20 placeholder:text-stone-600"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <Label className="text-stone-300">Birim</Label>
                                <Select
                                    value={formData.currency}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, currency: val }))}
                                >
                                    <SelectTrigger className="rounded-xl bg-white/10 border-white/10 text-white focus:ring-offset-stone-900 focus:ring-white/20 h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CURRENCIES.map(c => <SelectItem key={c.id} value={c.id}>{c.symbol}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#C8102E] hover:bg-[#A00C24] text-white font-bold uppercase tracking-widest h-14 rounded-xl transition-all shadow-lg text-sm mt-4"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <span className="flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Ürünü Yayınla
                                </span>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
