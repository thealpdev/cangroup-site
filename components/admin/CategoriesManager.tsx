"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash, Loader2, List, Plus } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function CategoriesManager() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState('');

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

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        try {
            setLoading(true);
            const slug = newCategory.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            await addDoc(collection(db, "categories"), {
                name: newCategory,
                slug: slug,
                createdAt: new Date().toISOString()
            });

            setNewCategory('');
            // Optional: Toast message here
        } catch (error) {
            console.error("Hata:", error);
            alert("Kategori eklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
        try {
            await deleteDoc(doc(db, "categories", id));
        } catch (error) {
            console.error("Silme hatası:", error);
        }
    };

    return (
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl">
            {/* Add Category */}
            <Card className="rounded-2xl border-none shadow-sm h-fit">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Plus className="h-5 w-5 text-[#C8102E]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">Yeni Kategori</span>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">Kategori Oluştur</CardTitle>
                    <CardDescription>Ürünlerinizi gruplamak için yeni bir başlık ekleyin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Kategori Adı</Label>
                            <Input
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Örn: Şef Bıçakları"
                                className="rounded-xl border-stone-200 focus-visible:ring-[#C8102E]"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading || !newCategory.trim()}
                            className="w-full rounded-xl bg-stone-900 hover:bg-[#C8102E] transition-colors"
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Ekle"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* List Categories */}
            <Card className="rounded-2xl border-none shadow-sm h-fit">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <List className="h-5 w-5 text-stone-900" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">Mevcut Kategoriler</span>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">Kategori Listesi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {categories.map(cat => (
                            <div key={cat.id} className="group flex items-center justify-between p-3 bg-stone-50 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-100 transition-all">
                                <span className="font-medium text-stone-700">{cat.name}</span>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    title="Sil"
                                >
                                    <Trash className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <p className="text-stone-400 italic text-sm text-center py-4">Henüz kategori yok.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
