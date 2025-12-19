"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ImageUpload from '@/components/admin/ImageUpload';
import { Loader2, Save, LayoutTemplate, Image as ImageIcon } from 'lucide-react';

export default function SettingsForm() {
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState<string[]>([]);
    const [heroImage, setHeroImage] = useState<string[]>([]);

    // Load initial data
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.logo) setLogo([data.logo]);
                    if (data.hero_banner) setHeroImage([data.hero_banner]);
                }
            } catch (error) {
                console.error("Ayarlar yüklenemedi:", error);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        try {
            setLoading(true);
            await setDoc(doc(db, "settings", "general"), {
                logo: logo[0] || '',
                hero_banner: heroImage[0] || '',
                updatedAt: new Date().toISOString()
            }, { merge: true });
            alert("Ayarlar başarıyla kaydedildi! ✅");
        } catch (error) {
            console.error("Kaydetme hatası:", error);
            alert("Ayarlar kaydedilemedi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <Card className="rounded-2xl border-none shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <LayoutTemplate className="h-5 w-5 text-[#C8102E]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">Görsel Kimlik</span>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">Genel Site Görselleri</CardTitle>
                    <CardDescription>Logo ve Banner gibi ana bileşenleri düzenleyin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                    <div className="space-y-4">
                        <Label className="text-base font-bold text-stone-900">Site Logosu</Label>
                        <p className="text-sm text-stone-500">Header kısmında görünen marka logosu. (Şeffaf PNG veya SVG önerilir).</p>
                        <div className="bg-stone-50 p-4 rounded-xl border border-dashed border-stone-200">
                            <ImageUpload
                                value={logo}
                                onChange={(url) => setLogo([url])}
                                onRemove={() => setLogo([])}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-base font-bold text-stone-900">Ana Banner (Hero Image)</Label>
                        <p className="text-sm text-stone-500">Anasayfanın en üstünde yer alan büyük görsel.</p>
                        <div className="bg-stone-50 p-4 rounded-xl border border-dashed border-stone-200">
                            <ImageUpload
                                value={heroImage}
                                onChange={(url) => setHeroImage([url])}
                                onRemove={() => setHeroImage([])}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100">
                        <Button
                            onClick={handleSave}
                            disabled={loading}
                            size="lg"
                            className="w-full md:w-auto rounded-xl bg-[#C8102E] hover:bg-[#A00C24] font-bold tracking-wide transition-colors"
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Değişiklikleri Kaydet
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
