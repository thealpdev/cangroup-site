"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'; // Added updateDoc
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Added Input
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ImageUpload from '@/components/admin/ImageUpload';
import { Trash, Loader2, UploadCloud, Save } from 'lucide-react'; // Added Save
import Image from 'next/image';

interface Partner {
    id: string;
    imageUrl: string;
    name?: string;
    order?: number; // Added order
}

export default function PartnersManager() {
    const [loading, setLoading] = useState(false);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [newPartnerImage, setNewPartnerImage] = useState<string[]>([]);
    const [newPartnerOrder, setNewPartnerOrder] = useState<number>(0); // Added order state

    // Real-time subscription
    useEffect(() => {
        // Simple query + Client-side sort (Avoiding complex index requirements)
        const q = query(collection(db, "partners"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Partner[];
            // Sort by order: If order is missing/0, treat as 999 (Put at end)
            setPartners(data.sort((a, b) => (a.order || 999) - (b.order || 999)));
        }, (error) => {
            console.error("Partners fetch error:", error);
        });

        return () => unsubscribe();
    }, []);

    const handleAddPartner = async () => {
        if (newPartnerImage.length === 0) return;
        try {
            setLoading(true);
            await addDoc(collection(db, "partners"), {
                imageUrl: newPartnerImage[0],
                order: Number(newPartnerOrder),
                createdAt: new Date().toISOString()
            });
            setNewPartnerImage([]);
            setNewPartnerOrder(prev => prev + 1); // Auto increment for next
            alert("Marka başarıyla eklendi! ✅");
        } catch (error) {
            console.error("Hata:", error);
            alert("Marka eklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu markayı silmek istediğinize emin misiniz?")) return;
        try {
            await deleteDoc(doc(db, "partners", id));
        } catch (error) {
            console.error("Silme hatası:", error);
        }
    };

    const handleUpdateOrder = async (id: string, newOrder: number) => {
        try {
            await updateDoc(doc(db, "partners", id), {
                order: newOrder
            });
        } catch (error) {
            console.error("Sıra güncelleme hatası:", error);
        }
    }

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Add New Partner */}
            <Card className="rounded-2xl border-none shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <UploadCloud className="h-5 w-5 text-[#C8102E]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">Yeni İş Ortağı Ekle</span>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">Marka Logosu Yükle</CardTitle>
                    <CardDescription>Anasayfada 'Referanslar' kısmında görünecek logolar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <ImageUpload
                                value={newPartnerImage}
                                onChange={(url) => setNewPartnerImage([url])}
                                onRemove={() => setNewPartnerImage([])}
                                disabled={loading}
                            />
                        </div>
                        <div className="w-full md:w-32">
                            <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Sıra No</label>
                            <Input
                                type="number"
                                value={newPartnerOrder}
                                onChange={(e) => setNewPartnerOrder(Number(e.target.value))}
                                className="bg-stone-50"
                            />
                        </div>
                        <Button
                            onClick={handleAddPartner}
                            disabled={loading || newPartnerImage.length === 0}
                            className="w-full md:w-auto rounded-xl bg-stone-900 hover:bg-[#C8102E] transition-colors h-10"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Ekle
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* List Partners */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {partners.map(partner => (
                    <div key={partner.id} className="relative group bg-white border border-stone-100 rounded-2xl p-4 flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative w-full aspect-square">
                            <Image
                                src={partner.imageUrl}
                                alt="Partner"
                                fill
                                className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                            />
                        </div>

                        <div className="w-full flex items-center gap-2">
                            <span className="text-[10px] bg-stone-100 px-1 rounded text-stone-500">Sıra</span>
                            <Input
                                type="number"
                                defaultValue={partner.order || ""}
                                placeholder="999"
                                onBlur={(e) => handleUpdateOrder(partner.id, Number(e.target.value))}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUpdateOrder(partner.id, Number(e.currentTarget.value));
                                        e.currentTarget.blur();
                                    }
                                }}
                                className="h-7 text-xs text-center bg-stone-50"
                            />
                        </div>

                        <button
                            onClick={() => handleDelete(partner.id)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-110 z-10"
                            title="Sil"
                        >
                            <Trash className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            {partners.length === 0 && (
                <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    <p className="text-stone-400">Henüz hiç marka eklenmemiş.</p>
                </div>
            )}
        </div>
    );
}
