"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ImageUpload from '@/components/admin/ImageUpload';
import { Trash, Loader2, UploadCloud } from 'lucide-react';
import Image from 'next/image';

interface Partner {
    id: string;
    imageUrl: string;
    name?: string;
}

export default function PartnersManager() {
    const [loading, setLoading] = useState(false);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [newPartnerImage, setNewPartnerImage] = useState<string[]>([]);

    // Real-time subscription
    useEffect(() => {
        const q = query(collection(db, "partners"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Partner[];
            setPartners(data);
        });
        return () => unsubscribe();
    }, []);

    const handleAddPartner = async () => {
        if (newPartnerImage.length === 0) return;
        try {
            setLoading(true);
            await addDoc(collection(db, "partners"), {
                imageUrl: newPartnerImage[0],
                createdAt: new Date().toISOString()
            });
            setNewPartnerImage([]);
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
                    <ImageUpload
                        value={newPartnerImage}
                        onChange={(url) => setNewPartnerImage([url])}
                        onRemove={() => setNewPartnerImage([])}
                        disabled={loading}
                    />
                    <Button
                        onClick={handleAddPartner}
                        disabled={loading || newPartnerImage.length === 0}
                        className="w-full md:w-auto rounded-xl bg-stone-900 hover:bg-[#C8102E] transition-colors"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Listeye Ekle
                    </Button>
                </CardContent>
            </Card>

            {/* List Partners */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {partners.map(partner => (
                    <div key={partner.id} className="relative group bg-white border border-stone-100 rounded-2xl p-6 flex items-center justify-center aspect-square shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative w-full h-full">
                            <Image
                                src={partner.imageUrl}
                                alt="Partner"
                                fill
                                className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                            />
                        </div>
                        <button
                            onClick={() => handleDelete(partner.id)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-110"
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
