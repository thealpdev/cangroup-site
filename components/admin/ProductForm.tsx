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
import { Loader2, Save, Plus, Tag } from 'lucide-react';

const BRANDS = [
    { id: 'canadam', name: 'Canadam' },
    { id: 'dick', name: 'Dick' },
    { id: 'victorinox', name: 'Victorinox' },
    { id: 'zwilling', name: 'Zwilling' },
    { id: 'solingen', name: 'Solingen' },
    { id: 'euroflex', name: 'Euroflex' },
    { id: 'other', name: 'Diğer' }
];

interface ProductFormData {
    productCode: string;
    productNumber: string;
    name_de: string; name_tr: string; name_en: string;
    description_de: string; description_tr: string; description_en: string;
    specs_de: string; specs_tr: string; specs_en: string; // New: Features list
    brand: string;
    category: string;
    price: string;
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
        brand: 'canadam', category: '', price: '',
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
                brand: 'canadam', category: '', price: '',
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

            {/* Left Column: Main Info & Images */}
            <div className="lg:col-span-2 space-y-8">

                {/* Images */}
                <Card className="rounded-2xl border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">Ürün Görselleri</CardTitle>
                        <CardDescription>Yüksek çözünürlüklü fotoğraflar yükleyin.</CardDescription>
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

                {/* Identity */}
                <Card className="rounded-2xl border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">Kimlik Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Ürün Kodu</Label>
                            <Input name="productCode" value={formData.productCode} onChange={handleInputChange} className="rounded-xl focus-visible:ring-[#C8102E]" placeholder="Örn: CN-102" />
                        </div>
                        <div className="space-y-2">
                            <Label>Ürün Numarası</Label>
                            <Input name="productNumber" value={formData.productNumber} onChange={handleInputChange} className="rounded-xl focus-visible:ring-[#C8102E]" placeholder="Örn: #5542" />
                        </div>
                    </CardContent>
                </Card>

                {/* Localized Content */}
                <Card className="rounded-2xl border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">Ürün Detayları</CardTitle>
                        <CardDescription>Açıklama ve Özellikleri dillerde girin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* DE */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                                <span className="text-xl">🇩🇪</span>
                                <h3 className="font-bold text-stone-900">Almanca</h3>
                            </div>
                            <div className="grid gap-4">
                                <Input name="name_de" value={formData.name_de} onChange={handleInputChange} className="rounded-xl" placeholder="Ürün Adı" />
                                <Textarea name="description_de" value={formData.description_de} onChange={handleInputChange} className="rounded-xl min-h-[80px]" placeholder="Açıklama" />
                                <Textarea name="specs_de" value={formData.specs_de} onChange={handleInputChange} className="rounded-xl min-h-[60px]" placeholder="Özellikler (Her satıra bir tane)" />
                            </div>
                        </div>

                        {/* TR */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                                <span className="text-xl">🇹🇷</span>
                                <h3 className="font-bold text-stone-900">Türkçe (Zorunlu)</h3>
                            </div>
                            <div className="grid gap-4">
                                <Input name="name_tr" value={formData.name_tr} onChange={handleInputChange} className="rounded-xl focus-visible:ring-[#C8102E]" placeholder="Ürün Adı" required />
                                <Textarea name="description_tr" value={formData.description_tr} onChange={handleInputChange} className="rounded-xl min-h-[80px] focus-visible:ring-[#C8102E]" placeholder="Açıklama" />
                                <Textarea name="specs_tr" value={formData.specs_tr} onChange={handleInputChange} className="rounded-xl min-h-[60px] focus-visible:ring-[#C8102E]" placeholder="Özellikler (Her satıra bir tane)" />
                            </div>
                        </div>

                        {/* EN */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                                <span className="text-xl">🇬🇧</span>
                                <h3 className="font-bold text-stone-900">İngilizce</h3>
                            </div>
                            <div className="grid gap-4">
                                <Input name="name_en" value={formData.name_en} onChange={handleInputChange} className="rounded-xl" placeholder="Product Name" />
                                <Textarea name="description_en" value={formData.description_en} onChange={handleInputChange} className="rounded-xl min-h-[80px]" placeholder="Description" />
                                <Textarea name="specs_en" value={formData.specs_en} onChange={handleInputChange} className="rounded-xl min-h-[60px]" placeholder="Features (One per line)" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Meta & Actions */}
            <div className="space-y-8">
                <Card className="rounded-2xl border-none shadow-md sticky top-24">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">Sınıflandırma</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Marka</Label>
                            <Select
                                value={formData.brand}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, brand: val }))}
                            >
                                <SelectTrigger className="rounded-xl focus:ring-[#C8102E]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {BRANDS.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Kategori</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                            >
                                <SelectTrigger className="rounded-xl focus:ring-[#C8102E]">
                                    <SelectValue placeholder="Seçiniz..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                                    {categories.length === 0 && <div className="p-2 text-xs text-stone-400">Kategori ekleyin</div>}
                                </SelectContent>
                            </Select>
                            <div className="flex items-center gap-2 mt-1">
                                <Tag className="w-3 h-3 text-stone-400" />
                                <span className="text-xs text-stone-500">Listede yoksa "Kategoriler" menüsünden ekleyin.</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Fiyat (€)</Label>
                            <Input
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="rounded-xl focus-visible:ring-[#C8102E]"
                                placeholder="0.00"
                            />
                        </div>

                        <Separator className="my-4" />

                        <Button
                            type="submit"
                            className="w-full bg-[#C8102E] hover:bg-[#A00C24] text-white font-bold uppercase tracking-widest h-12 rounded-xl transition-all shadow-red-900/20 shadow-lg"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <span className="flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Kaydet
                                </span>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
