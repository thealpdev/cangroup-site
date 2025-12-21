"use client";

import { useState } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, Database, UploadCloud } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

// Simulated Product Data Generators
const GENERATORS: Record<string, (index: number) => any> = {
    'dick': (i) => ({
        name_de: `F. Dick Premier Plus Chef's Knife ${20 + (i % 5)}cm`,
        name_tr: `F. Dick Premier Plus Şef Bıçağı ${20 + (i % 5)}cm`,
        name_en: `F. Dick Premier Plus Chef's Knife ${20 + (i % 5)}cm`,
        description_de: "Geschmiedetes Messer von höchster Qualität. Perfekt ausbalanciert und extrem scharf.",
        description_tr: "En yüksek kalitede dövme bıçak. Mükemmel dengeli ve son derece keskin.",
        description_en: "Forged knife of the highest quality. Perfectly balanced and extremely sharp.",
        price: (80 + (i * 2)).toFixed(2),
        currency: "EUR",
        category: "Knives",
        brand: "dick",
        productCode: `DICK-PP-${20 + i}`,
        image: `https://placehold.co/1080x1080/png?text=F.Dick+Premier+${20 + i}cm`
    }),
    'zwilling': (i) => ({
        name_de: `Zwilling Pro Kochmesser ${20 + i}cm`,
        name_tr: `Zwilling Pro Şef Bıçağı ${20 + i}cm`,
        name_en: `Zwilling Pro Chef's Knife ${20 + i}cm`,
        description_de: "Der Klassiker für die Profiküche. Eisgehärtete FRIODUR Klinge.",
        description_tr: "Profesyonel mutfak klasikleri. Buzla sertleştirilmiş FRIODUR bıçak.",
        description_en: "The classic for the professional kitchen. Ice-hardened FRIODUR blade.",
        price: (90 + (i * 3)).toFixed(2),
        currency: "EUR",
        category: "Knives",
        brand: "zwilling",
        productCode: `ZWILLING-PRO-${38400 + i}`,
        image: `https://placehold.co/1080x1080/png?text=Zwilling+Pro+${i}`
    }),
    'euroflex': (i) => ({
        name_de: `Euroflex Stechschutzhandschuh Größe ${['S', 'M', 'L', 'XL'][i % 4]}`,
        name_tr: `Euroflex Çelik Örgü Eldiven Boy ${['S', 'M', 'L', 'XL'][i % 4]}`,
        name_en: `Euroflex Mesh Glove Size ${['S', 'M', 'L', 'XL'][i % 4]}`,
        description_de: "Maximaler Schutz und Tragekomfort. Ergonomische Passform.",
        description_tr: "Maksimum koruma ve konfor. Ergonomik uyum.",
        description_en: "Maximum protection and comfort. Ergonomic fit.",
        price: (120 + (i * 1.5)).toFixed(2),
        currency: "EUR",
        category: "Safety",
        brand: "euroflex",
        productCode: `EFX-GLOVE-${['S', 'M', 'L', 'XL'][i % 4]}-${i}`,
        image: `https://placehold.co/1080x1080/png?text=Euroflex+Glove+${['S', 'M', 'L', 'XL'][i % 4]}`
    }),
    'solingen': (i) => ({
        name_de: `Solingen Classic Wetzstahl ${25 + i}cm`,
        name_tr: `Solingen Klasik Masat ${25 + i}cm`,
        name_en: `Solingen Classic Sharpening Steel ${25 + i}cm`,
        description_de: "Hält Ihre Messer scharf. Langlebig und robust.",
        description_tr: "Bıçaklarınızı keskin tutar. Dayanıklı ve sağlam.",
        description_en: "Keeps your knives sharp. Durable and robust.",
        price: (45 + i).toFixed(2),
        currency: "EUR",
        category: "Accessories",
        brand: "solingen",
        productCode: `SOL-STEEL-${25 + i}`,
        image: `https://placehold.co/1080x1080/png?text=Solingen+Steel+${25 + i}cm`
    })
};

export default function ImportPartnerProducts() {
    const [loading, setLoading] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<string>('dick');
    const [status, setStatus] = useState("");

    const handleImport = async () => {
        setLoading(true);
        setStatus("İçe aktarma başlatıldı...");
        try {
            const generator = GENERATORS[selectedBrand];
            if (!generator) {
                alert("Bu marka için otomatik veri oluşturucu bulunamadı.");
                setLoading(false);
                return;
            }

            // Generate 20 products
            let count = 0;
            for (let i = 0; i < 20; i++) {
                const product = generator(i);

                // Check if exists
                const q = query(collection(db, "products"), where("productCode", "==", product.productCode));
                const snap = await getDocs(q);

                if (snap.empty) {
                    await addDoc(collection(db, "products"), {
                        ...product,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                        images: [product.image]
                    });
                    count++;
                }
            }

            setStatus(`${count} adet yeni ürün başarıyla eklendi! (${selectedBrand})`);

        } catch (error) {
            console.error(error);
            setStatus("Hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Database className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-stone-900 mb-1">Partner Ürünlerini Getir (Simülasyon)</h3>
                    <p className="text-sm text-stone-500 mb-6">
                        Seçilen partner markası için veritabanına otomatik olarak 20 adet örnek ürün ekler.
                        Zaten ekli olan ürün kodlarını atlar.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 max-w-xl">
                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Marka Seç" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dick">F. Dick (20 Ürün)</SelectItem>
                                <SelectItem value="zwilling">Zwilling (20 Ürün)</SelectItem>
                                <SelectItem value="euroflex">Euroflex (20 Ürün)</SelectItem>
                                <SelectItem value="solingen">Solingen (20 Ürün)</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            onClick={handleImport}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UploadCloud className="w-4 h-4 mr-2" />}
                            {loading ? 'İçe Aktarılıyor...' : '20 Ürün Ekle'}
                        </Button>
                    </div>

                    {status && (
                        <div className="mt-4 text-sm font-medium text-green-600 animate-in fade-in">
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
