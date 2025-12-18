"use client";

import { useState } from 'react';
// Actually standard state is fine for this complexity without shadcn-form overhead yet, but shadcn forms are nice. 
// Let's use simple controlled inputs to save time and deps.

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/admin/ImageUpload';

const BRANDS = [
    { id: 'canadam', name: 'Canadam (Our Brand)' },
    { id: 'partner', name: 'Partner Brand' }
];

const LANGUAGES = ['de', 'tr', 'en'] as const;

interface ProductFormData {
    name_de: string;
    name_tr: string;
    name_en: string;
    description_de: string;
    description_tr: string;
    description_en: string;
    brand: string;
    category: string;
    price: string; // Optional but good for catalog
    images: string[];
}

export default function ProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [formData, setFormData] = useState<ProductFormData>({
        name_de: '', name_tr: '', name_en: '',
        description_de: '', description_tr: '', description_en: '',
        brand: 'canadam',
        category: '',
        price: '',
        images: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBrandChange = (value: string) => {
        setFormData(prev => ({ ...prev, brand: value }));
    };

    // Image handlers
    const handleImageChange = (url: string) => {
        setImages(prev => [...prev, url]);
    };

    const handleImageRemove = (url: string) => {
        setImages(prev => prev.filter(current => current !== url));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Validate
            if (images.length === 0) {
                alert("Please upload at least one image.");
                return;
            }
            if (!formData.name_de) {
                alert("German Name is required.");
                return;
            }

            await addDoc(collection(db, "products"), {
                ...formData,
                images: images,
                createdAt: serverTimestamp(),
            });

            alert("Product created successfully!");
            // Reset form
            setFormData({
                name_de: '', name_tr: '', name_en: '',
                description_de: '', description_tr: '', description_en: '',
                brand: 'canadam',
                category: '',
                price: '',
                images: []
            });
            setImages([]);
            router.refresh();

        } catch (error) {
            console.error("Error creating product:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-4xl">

            {/* Images Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent>
                    <ImageUpload
                        value={images}
                        onChange={handleImageChange}
                        onRemove={handleImageRemove}
                        disabled={loading}
                    />
                </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Select
                                disabled={loading}
                                onValueChange={handleBrandChange}
                                defaultValue={formData.brand}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {BRANDS.map(brand => (
                                        <SelectItem key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                placeholder="e.g. Chef Knife, Outdoor"
                                value={formData.category}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Multi-Language Content */}
            <Card>
                <CardHeader>
                    <CardTitle>Content (Multi-Language)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* German (Default) */}
                    <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">🇩🇪 German (Default)</h3>
                        <div className="space-y-2">
                            <Label>Product Name (DE)</Label>
                            <Input
                                name="name_de"
                                value={formData.name_de}
                                onChange={handleInputChange}
                                placeholder="Produktname"
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description (DE)</Label>
                            <Textarea
                                name="description_de"
                                value={formData.description_de}
                                onChange={handleInputChange}
                                placeholder="Produktbeschreibung..."
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* Turkish */}
                    <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">🇹🇷 Turkish</h3>
                        <div className="space-y-2">
                            <Label>Product Name (TR)</Label>
                            <Input
                                name="name_tr"
                                value={formData.name_tr}
                                onChange={handleInputChange}
                                placeholder="Ürün Adı"
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description (TR)</Label>
                            <Textarea
                                name="description_tr"
                                value={formData.description_tr}
                                onChange={handleInputChange}
                                placeholder="Ürün Açıklaması..."
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* English */}
                    <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">🇬🇧 English</h3>
                        <div className="space-y-2">
                            <Label>Product Name (EN)</Label>
                            <Input
                                name="name_en"
                                value={formData.name_en}
                                onChange={handleInputChange}
                                placeholder="Product Name"
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description (EN)</Label>
                            <Textarea
                                name="description_en"
                                value={formData.description_en}
                                onChange={handleInputChange}
                                placeholder="Product Description..."
                                disabled={loading}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Saving Product..." : "Create Product"}
            </Button>
        </form>
    );
}
