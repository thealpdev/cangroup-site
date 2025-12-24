"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';
import { useTranslations } from "next-intl";

interface HeroSlide {
    id: string;
    title_de?: string;
    title_tr?: string;
    title_en?: string;
    title_fr?: string;
    subtitle_de?: string;
    subtitle_tr?: string;
    subtitle_en?: string;
    subtitle_fr?: string;
    cta_de?: string;
    cta_tr?: string;
    cta_en?: string;
    cta_fr?: string;
    image: string;
    link: string;
    order: number;
}

export default function HeroManager() {
    const t = useTranslations('Admin');
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form State - Multilingual
    const [titleDe, setTitleDe] = useState('');
    const [titleTr, setTitleTr] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [titleFr, setTitleFr] = useState('');

    const [subtitleDe, setSubtitleDe] = useState('');
    const [subtitleTr, setSubtitleTr] = useState('');
    const [subtitleEn, setSubtitleEn] = useState('');
    const [subtitleFr, setSubtitleFr] = useState('');

    const [ctaDe, setCtaDe] = useState('Ansehen');
    const [ctaTr, setCtaTr] = useState('İncele');
    const [ctaEn, setCtaEn] = useState('View');
    const [ctaFr, setCtaFr] = useState('Voir');

    const [image, setImage] = useState('');
    const [link, setLink] = useState('/products');

    useEffect(() => {
        const q = query(collection(db, "hero"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroSlide));
            setSlides(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return alert("Lütfen bir resim yükleyin");

        try {
            await addDoc(collection(db, "hero"), {
                title_de: titleDe,
                title_tr: titleTr,
                title_en: titleEn,
                title_fr: titleFr,
                subtitle_de: subtitleDe,
                subtitle_tr: subtitleTr,
                subtitle_en: subtitleEn,
                subtitle_fr: subtitleFr,
                cta_de: ctaDe,
                cta_tr: ctaTr,
                cta_en: ctaEn,
                cta_fr: ctaFr,
                image,
                link,
                order: slides.length,
                createdAt: new Date().toISOString()
            });
            setIsAdding(false);
            // Reset all fields
            setTitleDe(''); setTitleTr(''); setTitleEn(''); setTitleFr('');
            setSubtitleDe(''); setSubtitleTr(''); setSubtitleEn(''); setSubtitleFr('');
            setCtaDe('Ansehen'); setCtaTr('İncele'); setCtaEn('View'); setCtaFr('Voir');
            setImage('');
            setLink('/products');
        } catch (error) {
            console.error("Error adding slide: ", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Bu slaytı silmek istediğinize emin misiniz?")) {
            await deleteDoc(doc(db, "hero", id));
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-[#C8102E]" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-stone-900">Slider Görselleri ({slides.length})</h3>
                <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "secondary" : "default"}>
                    {isAdding ? "İptal" : <><Plus className="w-4 h-4 mr-2" /> Yeni Slayt Ekle</>}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <form onSubmit={handleAdd} className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Resim Yükle</label>
                            <ImageUpload
                                value={image ? [image] : []}
                                onChange={(url) => setImage(url)}
                                onRemove={() => setImage('')}
                            />
                        </div>

                        {/* Language Tabs */}
                        <Tabs defaultValue="de" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-4">
                                <TabsTrigger value="de">🇩🇪 Deutsch</TabsTrigger>
                                <TabsTrigger value="tr">🇹🇷 Türkçe</TabsTrigger>
                                <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                                <TabsTrigger value="fr">🇫🇷 Français</TabsTrigger>
                            </TabsList>

                            <TabsContent value="de" className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Üst Başlık (DE)</label>
                                    <input
                                        value={subtitleDe}
                                        onChange={e => setSubtitleDe(e.target.value)}
                                        placeholder="z.B: NEUE KOLLEKTION"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ana Başlık (DE)</label>
                                    <input
                                        value={titleDe}
                                        onChange={e => setTitleDe(e.target.value)}
                                        placeholder="z.B: Professionelle Messer"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Buton Metni (DE)</label>
                                    <input
                                        value={ctaDe}
                                        onChange={e => setCtaDe(e.target.value)}
                                        placeholder="Ansehen"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="tr" className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Üst Başlık (TR)</label>
                                    <input
                                        value={subtitleTr}
                                        onChange={e => setSubtitleTr(e.target.value)}
                                        placeholder="Örn: YENİ SEZON"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ana Başlık (TR)</label>
                                    <input
                                        value={titleTr}
                                        onChange={e => setTitleTr(e.target.value)}
                                        placeholder="Örn: Profesyonel Bıçaklar"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Buton Metni (TR)</label>
                                    <input
                                        value={ctaTr}
                                        onChange={e => setCtaTr(e.target.value)}
                                        placeholder="İncele"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="en" className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Subtitle (EN)</label>
                                    <input
                                        value={subtitleEn}
                                        onChange={e => setSubtitleEn(e.target.value)}
                                        placeholder="e.g: NEW COLLECTION"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title (EN)</label>
                                    <input
                                        value={titleEn}
                                        onChange={e => setTitleEn(e.target.value)}
                                        placeholder="e.g: Professional Knives"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Button Text (EN)</label>
                                    <input
                                        value={ctaEn}
                                        onChange={e => setCtaEn(e.target.value)}
                                        placeholder="View"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="fr" className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sous-titre (FR)</label>
                                    <input
                                        value={subtitleFr}
                                        onChange={e => setSubtitleFr(e.target.value)}
                                        placeholder="ex: NOUVELLE COLLECTION"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Titre (FR)</label>
                                    <input
                                        value={titleFr}
                                        onChange={e => setTitleFr(e.target.value)}
                                        placeholder="ex: Couteaux Professionnels"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Texte du bouton (FR)</label>
                                    <input
                                        value={ctaFr}
                                        onChange={e => setCtaFr(e.target.value)}
                                        placeholder="Voir"
                                        className="w-full p-2 border rounded-md text-sm"
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Link */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Link (Tüm Diller)</label>
                            <input
                                value={link}
                                onChange={e => setLink(e.target.value)}
                                placeholder="/products"
                                className="w-full p-2 border rounded-md text-sm"
                            />
                        </div>

                        <Button type="submit" disabled={!image} className="w-full bg-[#C8102E] hover:bg-[#A00C24]">
                            Slaytı Kaydet
                        </Button>
                    </form>
                </div>
            )}

            {/* Slides List */}
            <div className="grid gap-4">
                {slides.map((slide) => (
                    <div key={slide.id} className="group bg-white p-4 rounded-xl border border-stone-100 shadow-sm flex items-center justify-between hover:border-[#C8102E]/20 transition-all">
                        <div className="flex items-center gap-4">
                            <GripVertical className="text-stone-300 cursor-move" />
                            <div className="relative w-24 h-16 bg-stone-100 rounded-lg overflow-hidden">
                                <Image src={slide.image} alt={slide.title_de || 'Slide'} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-900">
                                    🇩🇪 {slide.title_de || '(Başlıksız)'}
                                </h4>
                                <p className="text-xs text-stone-500">
                                    {slide.subtitle_de} • {slide.link}
                                </p>
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
