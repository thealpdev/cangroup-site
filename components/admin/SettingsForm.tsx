"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from '@/components/admin/ImageUpload';
import { Loader2, Save, LayoutTemplate, Image as ImageIcon, ShoppingBag, BookOpen } from 'lucide-react';

export default function SettingsForm() {
    const [loading, setLoading] = useState(false);

    // State for multiple sections
    const [general, setGeneral] = useState({ logo: '', contactPhone: '' });
    // Hero section moved to separate manager
    const [legacy, setLegacy] = useState({ title: '', quote: '', bgImage: '' });
    const [collections, setCollections] = useState([
        { title: '', subtitle: '', image: '', link: '' },
        { title: '', subtitle: '', image: '', link: '' },
        { title: '', subtitle: '', image: '', link: '' }
    ]);

    // Load initial data
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "home");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.general) setGeneral(data.general);
                    if (data.legacy) setLegacy(data.legacy);
                    if (data.collections) setCollections(data.collections);
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
            await setDoc(doc(db, "settings", "home"), {
                general,
                legacy,
                collections,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            alert("Tüm ayarlar kaydedildi! ✅");
        } catch (error) {
            console.error("Kaydetme hatası:", error);
            alert("Ayarlar kaydedilemedi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Site İçerik Yönetimi</h2>
                    <p className="text-stone-500">Anasayfa görsellerini ve yazılarını buradan yönetin.</p>
                </div>
                <Button onClick={handleSave} disabled={loading} className="bg-[#C8102E] hover:bg-[#A00C24]">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Tüm Değişiklikleri Kaydet
                </Button>
            </div>

            <Tabs defaultValue="collections" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="collections" className="gap-2"><ShoppingBag className="w-4 h-4" /> Vitrin / Koleksiyonlar</TabsTrigger>
                    <TabsTrigger value="legacy" className="gap-2"><BookOpen className="w-4 h-4" /> Hikaye (Legacy)</TabsTrigger>
                    <TabsTrigger value="general" className="gap-2"><LayoutTemplate className="w-4 h-4" /> Genel / Logo</TabsTrigger>
                </TabsList>

                {/* COLLECTIONS SECTION */}
                <TabsContent value="collections">
                    <Card>
                        <CardHeader>
                            <CardTitle>Koleksiyon Vitrini</CardTitle>
                            <CardDescription>Anasayfadaki 3'lü vitrin alanı.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {collections.map((col, index) => (
                                <div key={index} className="p-4 border rounded-xl space-y-4 bg-stone-50">
                                    <h4 className="font-bold text-sm uppercase text-[#C8102E]">Kutu {index + 1}</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Başlık</Label>
                                            <Input value={col.title} onChange={e => {
                                                const newCols = [...collections];
                                                newCols[index].title = e.target.value;
                                                setCollections(newCols);
                                            }} placeholder="Örn: Butcher's Choice" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Alt Başlık / Etiket</Label>
                                            <Input value={col.subtitle} onChange={e => {
                                                const newCols = [...collections];
                                                newCols[index].subtitle = e.target.value;
                                                setCollections(newCols);
                                            }} placeholder="Örn: Professional Series" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Kapak Görseli</Label>
                                        <ImageUpload
                                            value={col.image ? [col.image] : []}
                                            onChange={(url) => {
                                                const newCols = [...collections];
                                                newCols[index].image = url;
                                                setCollections(newCols);
                                            }}
                                            onRemove={() => {
                                                const newCols = [...collections];
                                                newCols[index].image = '';
                                                setCollections(newCols);
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Link Adresi</Label>
                                        <Input value={col.link} onChange={e => {
                                            const newCols = [...collections];
                                            newCols[index].link = e.target.value;
                                            setCollections(newCols);
                                        }} placeholder="/catalog?category=Butcher" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* LEGACY / STORY SECTION */}
                <TabsContent value="legacy">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hikaye Alanı (Parallax)</CardTitle>
                            <CardDescription>Kayarken arkada sabit duran fotoğraflı alan.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Üst Etiket</Label>
                                <Input value={legacy.title} onChange={e => setLegacy({ ...legacy, title: e.target.value })} placeholder="The Legacy" />
                            </div>
                            <div className="space-y-2">
                                <Label>Büyük Söz (Quote)</Label>
                                <Textarea className="min-h-[100px]" value={legacy.quote} onChange={e => setLegacy({ ...legacy, quote: e.target.value })} placeholder='"We don&apos;t just sell knives..."' />
                            </div>
                            <div className="space-y-2">
                                <Label>Arkaplan Fotoğrafı</Label>
                                <ImageUpload
                                    value={legacy.bgImage ? [legacy.bgImage] : []}
                                    onChange={(url) => setLegacy({ ...legacy, bgImage: url })}
                                    onRemove={() => setLegacy({ ...legacy, bgImage: '' })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* GENERAL SECTION */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Genel Ayarlar</CardTitle>
                            <CardDescription>Logo ve iletişim bilgileri.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Site Logosu</Label>
                                <ImageUpload
                                    value={general.logo ? [general.logo] : []}
                                    onChange={(url) => setGeneral({ ...general, logo: url })}
                                    onRemove={() => setGeneral({ ...general, logo: '' })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
