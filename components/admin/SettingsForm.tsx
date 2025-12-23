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
import { useTranslations } from "next-intl";

interface SiteConfig {
    hero: {
        title: string;
        subtitle: string;
        cta: string;
        image: string;
    };
    collections: Array<{
        title: string;
        subtitle: string;
        image: string;
        link: string;
    }>;
    general?: {
        logo: string;
        contactPhone: string;
        maintenanceMode: boolean;
    };
}

export default function SettingsForm() {
    const t = useTranslations('Admin');
    const [loading, setLoading] = useState(false);

    // State for multiple sections
    const [general, setGeneral] = useState({ logo: '', contactPhone: '', maintenanceMode: false });

    // Collections: 0=Left Large, 1=Top Right, 2=Bottom Right
    const [config, setConfig] = useState<SiteConfig>({
        hero: {
            title: '',
            subtitle: '',
            cta: '',
            image: ''
        },
        collections: [
            { title: '', subtitle: '', image: '', link: '' },
            { title: '', subtitle: '', image: '', link: '' },
            { title: '', subtitle: '', image: '', link: '' }
        ]
    });

    // Load initial data
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Load global config (hero, etc)
                const globalRef = doc(db, "settings", "global");
                const globalSnap = await getDoc(globalRef);
                if (globalSnap.exists()) {
                    const data = globalSnap.data() as SiteConfig;
                    // Merge carefully
                    setConfig(prev => ({
                        ...prev,
                        hero: data.hero || prev.hero,
                        collections: data.collections || prev.collections
                    }));
                }

                // Load home specific settings (maintenance, etc)
                const homeRef = doc(db, "settings", "home");
                const homeSnap = await getDoc(homeRef);
                if (homeSnap.exists()) {
                    const data = homeSnap.data();
                    if (data.general) setGeneral(prev => ({ ...prev, ...data.general }));
                    // If collections were here in older version, ignoring to prefer 'global' or logic adjustment
                    // But for now let's assume 'global' has the hero/collections structure as per my previous edit intent
                }
            } catch (error) {
                console.error("Ayarlar yüklenemedi:", error);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (section: string, index: number | null, field: string, value: string) => {
        const newConfig = { ...config };

        if (section === 'hero') {
            (newConfig.hero as any)[field] = value;
        } else if (section === 'collections' && index !== null) {
            (newConfig.collections[index] as any)[field] = value;
        }

        setConfig(newConfig);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            // Save 'global' settings
            await setDoc(doc(db, "settings", "global"), config, { merge: true });

            // Save 'home' settings
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
                        <ShoppingBag className="w-4 h-4" /> {t('collectionShowcase')}
                    </TabsTrigger>
                    <TabsTrigger value="general" className="gap-2 px-6 py-3 data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                        <Wrench className="w-4 h-4" /> Site Ayarları & Bakım
                    </TabsTrigger>
                </TabsList>

                {/* COLLECTIONS SECTION */}
                <TabsContent value="collections" className="space-y-6">

                    {/* Hero Section */}
                    <Card className="border-l-4 border-l-[#C8102E] shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LayoutTemplate className="w-5 h-5 text-[#C8102E]" />
                                {t('heroSection')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>{t('title')}</Label>
                                    <Input
                                        value={config.hero.title}
                                        onChange={(e) => handleChange('hero', null, 'title', e.target.value)}
                                        placeholder="Profesyonel Mutfak..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t('subtitle')}</Label>
                                    <Input
                                        value={config.hero.subtitle}
                                        onChange={(e) => handleChange('hero', null, 'subtitle', e.target.value)}
                                        placeholder="CanMarkt Kalitesiyle..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>{t('buttonText')}</Label>
                                    <Input
                                        value={config.hero.cta}
                                        onChange={(e) => handleChange('hero', null, 'cta', e.target.value)}
                                        placeholder="Şimdi Keşfet"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t('image')}</Label>
                                    <Input
                                        value={config.hero.image}
                                        onChange={(e) => handleChange('hero', null, 'image', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* LEFT LARGE BOX (Index 0) */}
                        <Card className="md:col-span-2 border-stone-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <LayoutTemplate className="w-4 h-4" />
                                    Sol Büyük Vitrin (Ana Koleksiyon)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>{t('image')}</Label>
                                        <ImageUpload
                                            value={config.collections[0]?.image ? [config.collections[0].image] : []}
                                            onChange={(url) => handleChange('collections', 0, 'image', url)}
                                            onRemove={() => handleChange('collections', 0, 'image', '')}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>{t('title')}</Label>
                                        <Input
                                            value={config.collections[0]?.title || ''}
                                            onChange={e => handleChange('collections', 0, 'title', e.target.value)}
                                            placeholder="Örn: Şef Bıçakları"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('subtitle')}</Label>
                                        <Input
                                            value={config.collections[0]?.subtitle || ''}
                                            onChange={e => handleChange('collections', 0, 'subtitle', e.target.value)}
                                            placeholder="Örn: Şefin Tercihi"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('link')}</Label>
                                        <Input
                                            value={config.collections[0]?.link || ''}
                                            onChange={e => handleChange('collections', 0, 'link', e.target.value)}
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
                                    value={config.collections[1]?.image ? [config.collections[1].image] : []}
                                    onChange={(url) => handleChange('collections', 1, 'image', url)}
                                    onRemove={() => handleChange('collections', 1, 'image', '')}
                                />
                                <Input
                                    value={config.collections[1]?.title || ''}
                                    onChange={e => handleChange('collections', 1, 'title', e.target.value)}
                                    placeholder={t('title')}
                                />
                                <Input
                                    value={config.collections[1]?.subtitle || ''}
                                    onChange={e => handleChange('collections', 1, 'subtitle', e.target.value)}
                                    placeholder={t('subtitle')}
                                />
                                <Input
                                    value={config.collections[1]?.link || ''}
                                    onChange={e => handleChange('collections', 1, 'link', e.target.value)}
                                    placeholder={t('link')}
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
                                    value={config.collections[2]?.image ? [config.collections[2].image] : []}
                                    onChange={(url) => handleChange('collections', 2, 'image', url)}
                                    onRemove={() => handleChange('collections', 2, 'image', '')}
                                />
                                <Input
                                    value={config.collections[2]?.title || ''}
                                    onChange={e => handleChange('collections', 2, 'title', e.target.value)}
                                    placeholder={t('title')}
                                />
                                <Input
                                    value={config.collections[2]?.subtitle || ''}
                                    onChange={e => handleChange('collections', 2, 'subtitle', e.target.value)}
                                    placeholder={t('subtitle')}
                                />
                                <Input
                                    value={config.collections[2]?.link || ''}
                                    onChange={e => handleChange('collections', 2, 'link', e.target.value)}
                                    placeholder={t('link')}
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
