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
import { Loader2, Save, LayoutTemplate, Image as ImageIcon, ShoppingBag, BookOpen, Wrench, ShieldAlert } from 'lucide-react';

export default function SettingsForm() {
    const [loading, setLoading] = useState(false);

    // State for multiple sections
    // State for multiple sections
    const [general, setGeneral] = useState({ logo: '', contactPhone: '', maintenanceMode: false });

    // Collections: 0=Left Large, 1=Top Right, 2=Bottom Right
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
                    if (data.general) setGeneral(prev => ({ ...prev, ...data.general }));

                    if (data.collections && Array.isArray(data.collections)) {
                        // Ensure we always have exactly 3 items to match UI
                        const newCols = [...data.collections];
                        while (newCols.length < 3) {
                            newCols.push({ title: '', subtitle: '', image: '', link: '' });
                        }
                        setCollections(newCols);
                    }
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
                    <h2 className="text-2xl font-bold tracking-tight">Site Vitrin Yönetimi</h2>
                    <p className="text-stone-500">Anasayfa koleksiyon alanlarını ve genel site ayarlarını buradan yönetin.</p>
                </div>
                <Button onClick={handleSave} disabled={loading} className="bg-[#C8102E] hover:bg-[#A00C24]">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Kaydet
                </Button>
            </div>

            <Tabs defaultValue="collections" className="space-y-4">
                <TabsList className="bg-white border border-stone-200 p-1 h-auto">
                    <TabsTrigger value="collections" className="gap-2 px-6 py-3 data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                        <ShoppingBag className="w-4 h-4" /> Koleksiyonlar (Vitrin)
                    </TabsTrigger>
                    <TabsTrigger value="general" className="gap-2 px-6 py-3 data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                        <Wrench className="w-4 h-4" /> Site Ayarları & Bakım
                    </TabsTrigger>
                </TabsList>

                {/* COLLECTIONS SECTION */}
                <TabsContent value="collections" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* LEFT LARGE BOX (Index 0) */}
                        <Card className="md:col-span-2 border-l-4 border-l-[#C8102E] shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LayoutTemplate className="w-5 h-5 text-[#C8102E]" />
                                    Sol Büyük Vitrin (Ana Koleksiyon)
                                </CardTitle>
                                <CardDescription>Anasayfada solda duran büyük görsel alanı.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Görsel</Label>
                                        <ImageUpload
                                            value={collections[0]?.image ? [collections[0].image] : []}
                                            onChange={(url) => {
                                                const newCols = [...collections];
                                                if (!newCols[0]) newCols[0] = { title: '', subtitle: '', image: '', link: '' };
                                                newCols[0].image = url;
                                                setCollections(newCols);
                                            }}
                                            onRemove={() => {
                                                const newCols = [...collections];
                                                if (newCols[0]) newCols[0].image = '';
                                                setCollections(newCols);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Başlık (H1)</Label>
                                        <Input
                                            value={collections[0]?.title || ''}
                                            onChange={e => {
                                                const newCols = [...collections];
                                                if (!newCols[0]) newCols[0] = { title: '', subtitle: '', image: '', link: '' };
                                                newCols[0].title = e.target.value;
                                                setCollections(newCols);
                                            }}
                                            placeholder="Örn: Şef Bıçakları"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Üst Etiket (Küçük)</Label>
                                        <Input
                                            value={collections[0]?.subtitle || ''}
                                            onChange={e => {
                                                const newCols = [...collections];
                                                if (!newCols[0]) newCols[0] = { title: '', subtitle: '', image: '', link: '' };
                                                newCols[0].subtitle = e.target.value;
                                                setCollections(newCols);
                                            }}
                                            placeholder="Örn: Şefin Tercihi"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Link (URL)</Label>
                                        <Input
                                            value={collections[0]?.link || ''}
                                            onChange={e => {
                                                const newCols = [...collections];
                                                if (!newCols[0]) newCols[0] = { title: '', subtitle: '', image: '', link: '' };
                                                newCols[0].link = e.target.value;
                                                setCollections(newCols);
                                            }}
                                            placeholder="/products?category=Chef"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* RIGHT TOP (Index 1) */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-wide">Sağ Üst Vitrin</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ImageUpload
                                    value={collections[1]?.image ? [collections[1].image] : []}
                                    onChange={(url) => {
                                        const newCols = [...collections];
                                        if (!newCols[1]) newCols[1] = { title: '', subtitle: '', image: '', link: '' };
                                        newCols[1].image = url;
                                        setCollections(newCols);
                                    }}
                                    onRemove={() => { /* handle remove */ }}
                                />
                                <Input
                                    value={collections[1]?.title || ''}
                                    onChange={e => {
                                        const newCols = [...collections];
                                        if (!newCols[1]) newCols[1] = { title: '', subtitle: '', image: '', link: '' };
                                        newCols[1].title = e.target.value;
                                        setCollections(newCols);
                                    }}
                                    placeholder="Başlık: Santoku Serisi"
                                />
                                <Input
                                    value={collections[1]?.subtitle || ''}
                                    onChange={e => {
                                        const newCols = [...collections];
                                        if (!newCols[1]) newCols[1] = { title: '', subtitle: '', image: '', link: '' };
                                        newCols[1].subtitle = e.target.value;
                                        setCollections(newCols);
                                    }}
                                    placeholder="Alt Başlık: Japon Hassasiyeti"
                                />
                                <Input
                                    value={collections[1]?.link || ''}
                                    onChange={e => {
                                        const newCols = [...collections];
                                        if (!newCols[1]) newCols[1] = { title: '', subtitle: '', image: '', link: '' };
                                        newCols[1].link = e.target.value;
                                        setCollections(newCols);
                                    }}
                                    placeholder="Link"
                                />
                            </CardContent>
                        </Card>

                        {/* RIGHT BOTTOM (Index 2) */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-wide">Sağ Alt Vitrin</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ImageUpload
                                    value={collections[2]?.image ? [collections[2].image] : []}
                                    onChange={(url) => {
                                        const newCols = [...collections];
                                        if (!newCols[2]) newCols[2] = { title: '', subtitle: '', image: '', link: '' };
                                        newCols[2].image = url;
                                        setCollections(newCols);
                                    }}
                                    onRemove={() => { /* handle remove */ }}
                                />
                                <Input
                                    value={collections[2]?.title || ''}
                                    onChange={e => {
                                        const newCols = [...collections];
                                        if (!newCols[2]) newCols[2] = { title: '', subtitle: '', image: '', link: '' };
                                        newCols[2].title = e.target.value;
                                        setCollections(newCols);
                                    }}
                                    placeholder="Başlık: Bıçak Setleri"
                                />
                                <Input
                                    value={collections[2]?.subtitle || ''}
                                    onChange={e => {
                                        const newCols = [...collections];
                                        if (!newCols[2]) newCols[2] = { title: '', subtitle: '', image: '', link: '' };
                                        newCols[2].subtitle = e.target.value;
                                        setCollections(newCols);
                                    }}
                                    placeholder="Alt Başlık: Profesyonel"
                                />
                                <Input
                                    value={collections[2]?.link || ''}
                                    onChange={e => {
                                        const newCols = [...collections];
                                        if (!newCols[2]) newCols[2] = { title: '', subtitle: '', image: '', link: '' };
                                        newCols[2].link = e.target.value;
                                        setCollections(newCols);
                                    }}
                                    placeholder="Link"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* GENERAL SECTION */}
                <TabsContent value="general">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Site Kimliği</CardTitle>
                                <CardDescription>Logo ve temel bilgiler.</CardDescription>
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

                        <Card className={`border-2 ${general.maintenanceMode ? 'border-red-500 bg-red-50' : 'border-stone-100'}`}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wrench className="w-5 h-5" />
                                    Bakım Modu
                                </CardTitle>
                                <CardDescription>Siteyi geçici olarak kapatıp açın.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm">
                                        Durum: {general.maintenanceMode ? <span className="text-red-600">KAPALI (Bakımda)</span> : <span className="text-green-600">AÇIK (Yayında)</span>}
                                    </span>
                                    <Button
                                        variant={general.maintenanceMode ? "destructive" : "default"}
                                        onClick={() => setGeneral(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                                    >
                                        {general.maintenanceMode ? "SİTEYİ AÇ" : "BAKIMA AL"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    );
}
