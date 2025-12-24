"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from '@/components/admin/ImageUpload';
import { Loader2, Save, LayoutTemplate, Wrench } from 'lucide-react';
import { useTranslations } from "next-intl";

interface CollectionItem {
    title_de?: string;
    title_tr?: string;
    title_en?: string;
    title_fr?: string;
    subtitle_de?: string;
    subtitle_tr?: string;
    subtitle_en?: string;
    subtitle_fr?: string;
    image: string;
    link: string;
}

interface SiteConfig {
    collections: CollectionItem[];
    general?: {
        logo: string;
        contactPhone: string;
        maintenanceMode: boolean;
    };
}

export default function SettingsForm() {
    const t = useTranslations('Admin');
    const [loading, setLoading] = useState(false);
    const [general, setGeneral] = useState({
        logo: '',
        contactPhone: '',
        maintenanceMode: false,
        aboutImage1: '',
        aboutImage2: ''
    });

    // Collections: 0=Left Large, 1=Top Right, 2=Bottom Right
    const [config, setConfig] = useState<SiteConfig>({
        collections: [
            { title_de: '', title_tr: '', title_en: '', title_fr: '', subtitle_de: '', subtitle_tr: '', subtitle_en: '', subtitle_fr: '', image: '', link: '' },
            { title_de: '', title_tr: '', title_en: '', title_fr: '', subtitle_de: '', subtitle_tr: '', subtitle_en: '', subtitle_fr: '', image: '', link: '' },
            { title_de: '', title_tr: '', title_en: '', title_fr: '', subtitle_de: '', subtitle_tr: '', subtitle_en: '', subtitle_fr: '', image: '', link: '' }
        ]
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const globalRef = doc(db, "settings", "global");
                const globalSnap = await getDoc(globalRef);
                if (globalSnap.exists()) {
                    const data = globalSnap.data() as SiteConfig;
                    setConfig(prev => ({
                        ...prev,
                        collections: data.collections || prev.collections
                    }));
                }

                const homeRef = doc(db, "settings", "home");
                const homeSnap = await getDoc(homeRef);
                if (homeSnap.exists()) {
                    const data = homeSnap.data();
                    if (data.general) setGeneral(prev => ({ ...prev, ...data.general }));
                }
            } catch (error) {
                console.error("Ayarlar yüklenemedi:", error);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (index: number, field: string, value: string) => {
        const newConfig = { ...config };
        (newConfig.collections[index] as any)[field] = value;
        setConfig(newConfig);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await setDoc(doc(db, "settings", "global"), config, { merge: true });
            await setDoc(doc(db, "settings", "home"), {
                general,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            alert(t('successSave'));
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
                    <h2 className="text-2xl font-bold tracking-tight">{t('showcaseManagement')}</h2>
                    <p className="text-stone-500">{t('showcaseDesc')}</p>
                </div>
                <Button onClick={handleSave} disabled={loading} className="bg-[#C8102E] hover:bg-[#A00C24]">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {t('save')}
                </Button>
            </div>

            <Tabs defaultValue="collections" className="space-y-4">
                <TabsList className="bg-white border border-stone-200 p-1 h-auto">
                    <TabsTrigger value="collections" className="gap-2 px-6 py-3 data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                        <LayoutTemplate className="w-4 h-4" /> {t('collectionShowcase')}
                    </TabsTrigger>
                    <TabsTrigger value="general" className="gap-2 px-6 py-3 data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                        <Wrench className="w-4 h-4" /> Site Ayarları & Bakım
                    </TabsTrigger>
                </TabsList>

                {/* COLLECTIONS SECTION */}
                <TabsContent value="collections" className="space-y-6">
                    {[0, 1, 2].map((idx) => (
                        <Card key={idx} className="border-stone-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">
                                    {idx === 0 && "Sol Büyük Vitrin (Ana Koleksiyon)"}
                                    {idx === 1 && "Sağ Üst Vitrin"}
                                    {idx === 2 && "Sağ Alt Vitrin"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Image */}
                                <div className="space-y-2">
                                    <Label>{t('image')}</Label>
                                    <ImageUpload
                                        value={config.collections[idx]?.image ? [config.collections[idx].image] : []}
                                        onChange={(url) => handleChange(idx, 'image', url)}
                                        onRemove={() => handleChange(idx, 'image', '')}
                                    />
                                </div>

                                {/* Language Tabs */}
                                <Tabs defaultValue="de" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4">
                                        <TabsTrigger value="de">🇩🇪 DE</TabsTrigger>
                                        <TabsTrigger value="tr">🇹🇷 TR</TabsTrigger>
                                        <TabsTrigger value="en">🇬🇧 EN</TabsTrigger>
                                        <TabsTrigger value="fr">🇫🇷 FR</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="de" className="space-y-3">
                                        <div className="space-y-2">
                                            <Label>Başlık (DE)</Label>
                                            <Input
                                                value={config.collections[idx]?.title_de || ''}
                                                onChange={e => handleChange(idx, 'title_de', e.target.value)}
                                                placeholder="z.B: Professionelle Messer"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Alt Başlık (DE)</Label>
                                            <Input
                                                value={config.collections[idx]?.subtitle_de || ''}
                                                onChange={e => handleChange(idx, 'subtitle_de', e.target.value)}
                                                placeholder="z.B: Für Profis"
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="tr" className="space-y-3">
                                        <div className="space-y-2">
                                            <Label>Başlık (TR)</Label>
                                            <Input
                                                value={config.collections[idx]?.title_tr || ''}
                                                onChange={e => handleChange(idx, 'title_tr', e.target.value)}
                                                placeholder="Örn: Şef Bıçakları"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Alt Başlık (TR)</Label>
                                            <Input
                                                value={config.collections[idx]?.subtitle_tr || ''}
                                                onChange={e => handleChange(idx, 'subtitle_tr', e.target.value)}
                                                placeholder="Örn: Şefin Tercihi"
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="en" className="space-y-3">
                                        <div className="space-y-2">
                                            <Label>Title (EN)</Label>
                                            <Input
                                                value={config.collections[idx]?.title_en || ''}
                                                onChange={e => handleChange(idx, 'title_en', e.target.value)}
                                                placeholder="e.g: Chef Knives"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Subtitle (EN)</Label>
                                            <Input
                                                value={config.collections[idx]?.subtitle_en || ''}
                                                onChange={e => handleChange(idx, 'subtitle_en', e.target.value)}
                                                placeholder="e.g: Chef's Choice"
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="fr" className="space-y-3">
                                        <div className="space-y-2">
                                            <Label>Titre (FR)</Label>
                                            <Input
                                                value={config.collections[idx]?.title_fr || ''}
                                                onChange={e => handleChange(idx, 'title_fr', e.target.value)}
                                                placeholder="ex: Couteaux de Chef"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Sous-titre (FR)</Label>
                                            <Input
                                                value={config.collections[idx]?.subtitle_fr || ''}
                                                onChange={e => handleChange(idx, 'subtitle_fr', e.target.value)}
                                                placeholder="ex: Choix du Chef"
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                {/* Link (same for all languages) */}
                                <div className="space-y-2">
                                    <Label>{t('link')} (Tüm Diller)</Label>
                                    <Input
                                        value={config.collections[idx]?.link || ''}
                                        onChange={e => handleChange(idx, 'link', e.target.value)}
                                        placeholder="/products?category=Chef"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* GENERAL SECTION */}
                <TabsContent value="general">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Site Kimliği</CardTitle>
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

                        <Card>
                            <CardHeader>
                                <CardTitle>Hakkımızda / About Us - Resim 1</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>İlk Resim (About Image 1)</Label>
                                    <ImageUpload
                                        value={general.aboutImage1 ? [general.aboutImage1] : []}
                                        onChange={(url) => setGeneral({ ...general, aboutImage1: url })}
                                        onRemove={() => setGeneral({ ...general, aboutImage1: '' })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Hakkımızda / About Us - Resim 2</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>İkinci Resim (About Image 2)</Label>
                                    <ImageUpload
                                        value={general.aboutImage2 ? [general.aboutImage2] : []}
                                        onChange={(url) => setGeneral({ ...general, aboutImage2: url })}
                                        onRemove={() => setGeneral({ ...general, aboutImage2: '' })}
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
