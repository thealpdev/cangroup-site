"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ImageUpload from '@/components/admin/ImageUpload';
import { Trash, Loader2, List, Plus, Edit2, X, Save } from 'lucide-react';
import Image from 'next/image';

interface Category {
    id: string;
    name: string;
    slug: string;
    image_url?: string;
    description?: string;
}

export default function CategoriesManager() {
    const t = useTranslations('Admin');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]); // We'll use the first one as image_url

    // Real-time subscription
    useEffect(() => {
        const q = query(collection(db, "categories"), orderBy("name", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Category[];
            setCategories(data);
        });
        return () => unsubscribe();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setDescription('');
        setImages([]);
    };

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setName(category.name);
        setDescription(category.description || '');
        setImages(category.image_url ? [category.image_url] : []);
        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            setLoading(true);
            const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const image_url = images.length > 0 ? images[0] : '';

            const data = {
                name,
                slug,
                description,
                image_url,
                updatedAt: serverTimestamp()
            };

            if (editingId) {
                // Update existing
                await updateDoc(doc(db, "categories", editingId), data);
            } else {
                // Create new
                await addDoc(collection(db, "categories"), {
                    ...data,
                    createdAt: serverTimestamp()
                });
            }

            resetForm();
        } catch (error) {
            console.error(t('errorPrefix'), error);
            alert(t('operationFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent potentially triggering edit if row is clicked
        if (!confirm(t('confirmDeleteCategory'))) return;
        try {
            await deleteDoc(doc(db, "categories", id));
            if (editingId === id) resetForm();
        } catch (error) {
            console.error(t('errorPrefix'), error);
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-7xl">
            {/* Form Section */}
            <Card className="rounded-2xl border-none shadow-sm h-fit top-4 sticky">
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            {editingId ? <Edit2 className="h-5 w-5 text-[#C8102E]" /> : <Plus className="h-5 w-5 text-[#C8102E]" />}
                            <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
                                {editingId ? t('edit') : t('newCategory')}
                            </span>
                        </div>
                        {editingId && (
                            <Button variant="ghost" size="sm" onClick={resetForm} className="text-stone-400 hover:text-stone-900">
                                <X className="h-4 w-4 mr-1" /> {t('cancel')}
                            </Button>
                        )}
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">
                        {editingId ? t('updateCategory') : t('createCategory')}
                    </CardTitle>
                    <CardDescription>
                        {editingId ? t('editingCategory') : t('newCategoryHeading')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-2">
                            <Label>{t('categoryImage')}</Label>
                            <ImageUpload
                                value={images}
                                onChange={(url) => setImages(prev => [...prev, url])}
                                onRemove={(url) => setImages(prev => prev.filter(p => p !== url))}
                                disabled={loading}
                            />
                            <p className="text-xs text-stone-400">{t('firstImageCover')}</p>
                        </div>

                        <div className="space-y-2">
                            <Label>{t('categoryName')}</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Örn: Şef Bıçakları"
                                className="rounded-xl border-stone-200 focus-visible:ring-[#C8102E]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>{t('descriptionOptional')}</Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={t('categoryShortDesc')}
                                className="rounded-xl border-stone-200 focus-visible:ring-[#C8102E]"
                                rows={3}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !name.trim()}
                            className="w-full h-12 rounded-xl bg-stone-900 hover:bg-[#C8102E] transition-colors"
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    {editingId ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                                    {editingId ? t('saveChanges') : t('add')}
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* List Section */}
            <Card className="rounded-2xl border-none shadow-sm h-fit">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <List className="h-5 w-5 text-stone-900" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">{t('currentCategories')}</span>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">{t('categoryList')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => handleEdit(cat)}
                                className={`
                                    group flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer border
                                    ${editingId === cat.id
                                        ? 'bg-[#C8102E]/5 border-[#C8102E] ring-1 ring-[#C8102E]'
                                        : 'bg-stone-50 border-transparent hover:bg-white hover:shadow-md hover:border-stone-100'
                                    }
                                `}
                            >
                                {/* Thumbnail */}
                                <div className="h-16 w-16 relative bg-white rounded-lg overflow-hidden border border-stone-100 flex-shrink-0">
                                    {cat.image_url ? (
                                        <Image src={cat.image_url} alt={cat.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                            <List className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-bold truncate ${editingId === cat.id ? 'text-[#C8102E]' : 'text-stone-900'}`}>
                                        {cat.name}
                                    </h4>
                                    <p className="text-xs text-stone-500 truncate">{cat.description || ''}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => handleDelete(cat.id, e)}
                                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title={t('confirmDeleteCategory')}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {categories.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-stone-400 italic">{t('noCategories')}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
