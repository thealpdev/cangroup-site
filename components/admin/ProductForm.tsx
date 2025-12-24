"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/admin/ImageUpload';
import { Loader2, Save, Tag, Coins, Hash, Ruler, Box, Star, Percent } from 'lucide-react';

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
    name_de: string; name_tr: string; name_en: string; name_fr: string;
    description_de: string; description_tr: string; description_en: string; description_fr: string;
    specs_de: string; specs_tr: string; specs_en: string; specs_fr: string;
    brand: string;
    category: string;
    price: string;
    currency: string;
    stock: string;
    isNew: boolean;
    isSale: boolean;
    salePrice: string;
}

interface ProductFormProps {
    initialData?: any;
    onSuccess?: () => void;
}

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

    const [formData, setFormData] = useState<ProductFormData>({
        productCode: '', productNumber: '',
        name_de: '', name_tr: '', name_en: '', name_fr: '',
        description_de: '', description_tr: '', description_en: '', description_fr: '',
        specs_de: '', specs_tr: '', specs_en: '', specs_fr: '',
        brand: 'canadam', category: '',
        price: '', currency: 'EUR',
        stock: '10', isNew: true, isSale: false, salePrice: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const q = query(collection(db, "categories"), orderBy("name", "asc"));
            const snapshot = await getDocs(q);
            setCategories(snapshot.docs.map(d => ({ id: d.id, name: d.data().name })));
        };
        fetchCategories();

        if (initialData) {
            setFormData({
                productCode: initialData.productCode || '',
                productNumber: initialData.productNumber || '',
                name_de: initialData.name_de || '',
                name_tr: initialData.name_tr || '',
                name_en: initialData.name_en || '',
                name_fr: initialData.name_fr || '',
                description_de: initialData.description_de || '',
                description_tr: initialData.description_tr || '',
                description_en: initialData.description_en || '',
                description_fr: initialData.description_fr || '',
                specs_de: initialData.specs_de || '',
                specs_tr: initialData.specs_tr || '',
                specs_en: initialData.specs_en || '',
                specs_fr: initialData.specs_fr || '',
                brand: initialData.brand ? initialData.brand.toLowerCase() : 'canadam',
                category: initialData.category || '',
                price: initialData.price ? String(initialData.price) : '',
                currency: initialData.currency || 'EUR',
                stock: initialData.stock ? String(initialData.stock) : '10',
                isNew: initialData.isNew ?? false,
                isSale: initialData.isSale ?? false,
                salePrice: initialData.salePrice ? String(initialData.salePrice) : ''
            });
            if (initialData.images) setImages(initialData.images);
            else if (initialData.image) setImages([initialData.image]);
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (images.length === 0) { alert("En az bir görsel yüklemelisiniz."); return; }

            const dataToSave = {
                ...formData,
                images: images,
                image: images[0], // Backwards compat
                price: parseFloat(formData.price) || 0,
                stock: parseInt(formData.stock) || 0,
                salePrice: parseFloat(formData.salePrice) || 0,
                updatedAt: serverTimestamp(),
            };

            if (initialData && initialData.id) {
                await updateDoc(doc(db, "products", initialData.id), dataToSave);
            } else {
                await addDoc(collection(db, "products"), {
                    ...dataToSave,
                    createdAt: serverTimestamp(),
                });
            }

            if (onSuccess) onSuccess();
            router.refresh();

        } catch (error) {
            console.error(error);
            alert("İşlem sırasında hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">

                {/* Images */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Tag className="w-5 h-5 text-[#C8102E]" />
                            Görseller & Kimlik
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ImageUpload
                            value={images}
                            onChange={(url) => setImages((current) => [...current, url])}
                            onRemove={(url) => setImages((current) => current.filter((c) => c !== url))}
                            disabled={loading}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Ürün Kodu (SKU)</Label>
                                <Input
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleInputChange}
                                    placeholder="Örn: CN-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Barkod / Numara</Label>
                                <Input
                                    name="productNumber"
                                    value={formData.productNumber}
                                    onChange={handleInputChange}
                                    placeholder="869..."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Names & Branding */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Hash className="w-5 h-5 text-[#C8102E]" />
                            Detaylar
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Marka</Label>
                                <Select value={formData.brand} onValueChange={v => setFormData(p => ({ ...p, brand: v }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {BRANDS.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Kategori</Label>
                                <Select value={formData.category} onValueChange={v => setFormData(p => ({ ...p, category: v }))}>
                                    <SelectTrigger><SelectValue placeholder="Seçiniz" /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <Label className="font-bold text-[#C8102E]">Ürün Adı (3 Dil)</Label>
                            <Input name="name_tr" placeholder="Türkçe Ad" value={formData.name_tr} onChange={handleInputChange} />
                            <Input name="name_de" placeholder="Almanca Ad" value={formData.name_de} onChange={handleInputChange} />
                            <Input name="name_en" placeholder="İngilizce Ad" value={formData.name_en} onChange={handleInputChange} />
                        </div>
                    </CardContent>
                </Card>

                {/* Descriptions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Ruler className="w-5 h-5 text-[#C8102E]" />
                            Açıklama & Özellikler
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <Textarea name="description_tr" placeholder="Türkçe Açıklama" rows={2} value={formData.description_tr} onChange={handleInputChange} />
                            <Textarea name="description_de" placeholder="Almanca Açıklama" rows={2} value={formData.description_de} onChange={handleInputChange} />
                        </div>
                        <Separator />
                        <div className="grid gap-3">
                            <Input name="specs_tr" placeholder="Türkçe Teknik Özellik (20cm, Çelik vb)" value={formData.specs_tr} onChange={handleInputChange} />
                            <Input name="specs_de" placeholder="Almanca Teknik Özellik" value={formData.specs_de} onChange={handleInputChange} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">

                {/* Save Button */}
                <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-[#C8102E] hover:bg-[#a00d25]">
                    {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                    {!loading && <Save className="w-5 h-5 mr-2" />}
                    Kaydet & Yayınla
                </Button>

                {/* Stock & Status */}
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Box className="w-5 h-5 text-blue-500" />
                            Stok & Durum
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Stok Adedi</Label>
                            <Input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                className="font-mono text-lg"
                            />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Star className={`w-5 h-5 ${formData.isNew ? "text-yellow-500 fill-yellow-500" : "text-stone-300"}`} />
                                <Label htmlFor="isNew" className="cursor-pointer font-bold">Yeni Ürün?</Label>
                            </div>
                            <input
                                id="isNew"
                                type="checkbox"
                                className="w-5 h-5 accent-[#C8102E]"
                                checked={formData.isNew}
                                onChange={e => setFormData(p => ({ ...p, isNew: e.target.checked }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing */}
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Coins className="w-5 h-5 text-green-500" />
                            Fiyatlandırma
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label>Fiyat</Label>
                                <Input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Birim</Label>
                                <Select value={formData.currency} onValueChange={v => setFormData(p => ({ ...p, currency: v }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {CURRENCIES.map(c => <SelectItem key={c.id} value={c.id}>{c.symbol}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Percent className="w-5 h-5 text-red-500" />
                                <Label htmlFor="isSale" className="cursor-pointer font-bold">İndirim Var mı?</Label>
                            </div>
                            <input
                                id="isSale"
                                type="checkbox"
                                className="w-5 h-5 accent-red-600"
                                checked={formData.isSale}
                                onChange={e => setFormData(p => ({ ...p, isSale: e.target.checked }))}
                            />
                        </div>

                        {formData.isSale && (
                            <div className="animate-in fade-in slide-in-from-top-2 p-3 bg-red-50 rounded-lg border border-red-100">
                                <Label className="text-red-700 font-bold mb-1 block">İndirimli Satış Fiyatı</Label>
                                <Input
                                    type="number"
                                    name="salePrice"
                                    value={formData.salePrice}
                                    onChange={handleInputChange}
                                    className="bg-white border-red-200 text-red-600 font-bold"
                                />
                                {Number(formData.price) > 0 && Number(formData.salePrice) > 0 && (
                                    <p className="text-center text-xs font-bold text-red-600 mt-2">
                                        %{Math.round(((Number(formData.price) - Number(formData.salePrice)) / Number(formData.price)) * 100)} İNDİRİM
                                    </p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}

