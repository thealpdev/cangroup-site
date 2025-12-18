"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
import { Loader2, Save } from 'lucide-react';

const BRANDS = [
    { id: 'canadam', name: 'Canadam (House Brand)' },
    { id: 'partner', name: 'Partner Brand' }
];

interface ProductFormData {
    name_de: string; name_tr: string; name_en: string;
    description_de: string; description_tr: string; description_en: string;
    brand: string; category: string; price: string;
    images: string[];
}

export default function ProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [formData, setFormData] = useState<ProductFormData>({
        name_de: '', name_tr: '', name_en: '',
        description_de: '', description_tr: '', description_en: '',
        brand: 'canadam', category: '', price: '',
        images: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (images.length === 0) { alert("Image required."); return; }
            if (!formData.name_de) { alert("German Name is required."); return; }

            await addDoc(collection(db, "products"), {
                ...formData,
                images: images,
                createdAt: serverTimestamp(),
            });

            alert("Product created successfully!");
            setFormData({
                name_de: '', name_tr: '', name_en: '',
                description_de: '', description_tr: '', description_en: '',
                brand: 'canadam', category: '', price: '', images: []
            });
            setImages([]);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error creating product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Main Info & Images */}
            <div className="lg:col-span-2 space-y-8">

                {/* Images */}
                <Card className="rounded-none border-t-4 border-t-stone-900 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">Visual Assets</CardTitle>
                        <CardDescription>Upload high-resolution product photography.</CardDescription>
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

                {/* Localized Content */}
                <Card className="rounded-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">Product Information</CardTitle>
                        <CardDescription>Enter details in all supported languages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* DE */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                                <span className="text-xl">🇩🇪</span>
                                <h3 className="font-bold text-stone-900">German (Primary)</h3>
                            </div>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label>Product Name</Label>
                                    <Input name="name_de" value={formData.name_de} onChange={handleInputChange} className="rounded-none focus-visible:ring-[#C8102E]" placeholder="e.g. Profiline Chefmesser" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea name="description_de" value={formData.description_de} onChange={handleInputChange} className="rounded-none min-h-[100px] focus-visible:ring-[#C8102E]" />
                                </div>
                            </div>
                        </div>

                        {/* TR */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                                <span className="text-xl">🇹🇷</span>
                                <h3 className="font-bold text-stone-900">Turkish</h3>
                            </div>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label>Product Name</Label>
                                    <Input name="name_tr" value={formData.name_tr} onChange={handleInputChange} className="rounded-none focus-visible:ring-[#C8102E]" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea name="description_tr" value={formData.description_tr} onChange={handleInputChange} className="rounded-none min-h-[100px] focus-visible:ring-[#C8102E]" />
                                </div>
                            </div>
                        </div>

                        {/* EN */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                                <span className="text-xl">🇬🇧</span>
                                <h3 className="font-bold text-stone-900">English</h3>
                            </div>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label>Product Name</Label>
                                    <Input name="name_en" value={formData.name_en} onChange={handleInputChange} className="rounded-none focus-visible:ring-[#C8102E]" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea name="description_en" value={formData.description_en} onChange={handleInputChange} className="rounded-none min-h-[100px] focus-visible:ring-[#C8102E]" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Meta & Actions */}
            <div className="space-y-8">
                <Card className="rounded-none border-t-4 border-t-[#C8102E] shadow-md sticky top-24">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">Classification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Brand Identity</Label>
                            <Select
                                value={formData.brand}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, brand: val }))}
                            >
                                <SelectTrigger className="rounded-none focus:ring-[#C8102E]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {BRANDS.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Category Tag</Label>
                            <Input
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="rounded-none focus-visible:ring-[#C8102E]"
                                placeholder="e.g. Knives"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Price (Optional)</Label>
                            <Input
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="rounded-none focus-visible:ring-[#C8102E]"
                                placeholder="€"
                            />
                        </div>

                        <Separator className="my-4" />

                        <Button
                            type="submit"
                            className="w-full bg-[#C8102E] hover:bg-[#A00C24] text-white font-bold uppercase tracking-widest h-12 rounded-none"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <span className="flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Save Product
                                </span>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
