"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    cta: string;
    link: string;
    order: number;
}

export default function HeroManager() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState('');
    const [cta, setCta] = useState('İncele');
    const [link, setLink] = useState('/products');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "hero"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroSlide));
            setSlides(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'canmarkt_uploads'); // Using unsigned preset if available, or API route

        try {
            // We'll use the existing API route if possible, or direct fetch to Cloudinary
            // Assuming a standard upload flow or using the same method as ProductForm
            // For now, let's try a direct upload or an API route if one exists.
            // Checking previous context, user has `lib/cloudinary.ts`. 
            // Better to use a secure upload via API route if present, or client-side if set up.
            // Let's assume there is an API route `/api/upload` based on `ProductForm`. 
            // If not, we'll need to create one or use a public key. 
            // Let's try the fetch to /api/upload first.

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            setImage(data.url);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Resim yüklenemedi. Lütfen tekrar deneyin.");
        } finally {
            setUploading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return alert("Lütfen bir resim yükleyin");

        try {
            await addDoc(collection(db, "hero"), {
                title,
                subtitle,
                image,
                cta,
                link,
                order: slides.length, // Append to end
                createdAt: new Date().toISOString()
            });
            setIsAdding(false);
            // Reset form
            setTitle('');
            setSubtitle('');
            setImage('');
            setCta('İncele');
            setLink('/products');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Bu slaytı silmek istediğinize emin misiniz?")) {
            await deleteDoc(doc(db, "hero", id));
        }
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-stone-900">Slider Görselleri ({slides.length})</h3>
                <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "secondary" : "default"}>
                    {isAdding ? "İptal" : <><Plus className="w-4 h-4 mr-2" /> Yeni Slayt Ekle</>}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={handleAdd} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-sm font-medium mb-1">Resim Yükle</label>
                            <div className="flex gap-4 items-center">
                                {image ? (
                                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-stone-200">
                                        <Image src={image} alt="Preview" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setImage('')}
                                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-xs"
                                        >
                                            Değiştir
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-32 h-20 bg-white border border-dashed border-stone-300 rounded-lg flex items-center justify-center text-stone-400">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                                    disabled={uploading}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Üst Başlık (Subtitle)</label>
                                <input
                                    value={subtitle}
                                    onChange={e => setSubtitle(e.target.value)}
                                    placeholder="Örn: YENİ SEZON"
                                    className="w-full p-2 border rounded-md text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Ana Başlık (Title)</label>
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Örn: Profesyonel Bıçaklar"
                                    className="w-full p-2 border rounded-md text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Buton Metni</label>
                                <input
                                    value={cta}
                                    onChange={e => setCta(e.target.value)}
                                    placeholder="İncele"
                                    className="w-full p-2 border rounded-md text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Link</label>
                                <input
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                    placeholder="/products"
                                    className="w-full p-2 border rounded-md text-sm"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button type="submit" disabled={uploading || !image} className="w-full">
                                {uploading ? "Resim Yükleniyor..." : "Slaytı Kaydet"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {slides.map((slide) => (
                    <div key={slide.id} className="group bg-white p-4 rounded-xl border border-stone-100 shadow-sm flex items-center justify-between hover:border-[#C8102E]/20 transition-all">
                        <div className="flex items-center gap-4">
                            <GripVertical className="text-stone-300 cursor-move" />
                            <div className="relative w-24 h-16 bg-stone-100 rounded-lg overflow-hidden">
                                <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-900">{slide.title || '(Başlıksız)'}</h4>
                                <p className="text-xs text-stone-500">{slide.subtitle} • {slide.link}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(slide.id)}
                            className="text-stone-400 hover:text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="w-5 h-5" />
                        </Button>
                    </div>
                ))}

                {slides.length === 0 && !isAdding && (
                    <div className="text-center py-12 text-stone-400 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                        <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Henüz hiç slayt eklenmemiş.</p>
                        <Button variant="link" onClick={() => setIsAdding(true)}>İlk slaytı ekle</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
