"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, Database } from 'lucide-react';

const VICTORINOX_PRODUCTS = [
    {
        name_de: "Victorinox Fibrox Chef's Knife",
        name_tr: "Victorinox Fibrox Şef Bıçağı",
        name_en: "Victorinox Fibrox Chef's Knife",
        description_de: "Das Victorinox Fibrox Chef's Knife ist ein vielseitiges Küchenmesser, das für seine Schärfe und Haltbarkeit bekannt ist. Der ergonomische Griff sorgt für Komfort und Sicherheit.",
        description_tr: "Victorinox Fibrox Şef Bıçağı, keskinliği ve dayanıklılığı ile bilinen çok yönlü bir mutfak bıçağıdır. Ergonomik sapı konfor ve güvenlik sağlar.",
        description_en: "The Victorinox Fibrox Chef's Knife is a versatile kitchen knife known for its sharpness and durability. The ergonomic handle ensures comfort and safety.",
        price: 45.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "VX-FIBROX-20",
        specs_de: "Klingenlänge: 20 cm\nMaterial: Rostfreier Stahl\nGriff: Fibrox\nSpülmaschinenfest: Ja",
        specs_tr: "Bıçak Uzunluğu: 20 cm\nMalzeme: Paslanmaz Çelik\nSap: Fibrox\nBulaşık Makinesinde Yıkanabilir: Evet",
        specs_en: "Blade Length: 20 cm\nMaterial: Stainless Steel\nHandle: Fibrox\nDishwasher Safe: Yes",
        height: "2.5 cm",
        length: "34 cm",
        width: "5 cm",
        weight: "180 g",
        material: "Stainless Steel / Fibrox",
        origin: "Switzerland",
        bladeLength: "20 cm",
        edgeType: "Straight",
        color: "Black",
        dishwasherSafe: "yes",
        warranty: "Lifetime",
        images: ["https://image.hm.com/assets/hm/15/5e/155e96f8fb955215093557e03440751919582d97.jpg"], // Placeholder
    },
    {
        name_de: "Victorinox Swiss Modern Santoku",
        name_tr: "Victorinox Swiss Modern Santoku",
        name_en: "Victorinox Swiss Modern Santoku",
        description_de: "Das Victorinox Swiss Modern Santoku ist perfekt für das Schneiden von Fleisch, Fisch und Gemüse. Das moderne Design und der Walnussholzgriff machen es zu einem Hingucker.",
        description_tr: "Victorinox Swiss Modern Santoku, et, balık ve sebze kesmek için mükemmeldir. Modern tasarımı ve ceviz ağacı sapı ile dikkat çeker.",
        description_en: "The Victorinox Swiss Modern Santoku is perfect for cutting meat, fish, and vegetables. Its modern design and walnut handle make it an eye-catcher.",
        price: 68.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "VX-MOD-SAN-17",
        specs_de: "Klingenlänge: 17 cm\nMaterial: Rostfreier Stahl\nGriff: Walnussholz\nKullenschliff: Ja",
        specs_tr: "Bıçak Uzunluğu: 17 cm\nMalzeme: Paslanmaz Çelik\nSap: Ceviz Ağacı\nOluklu Ağız: Evet",
        specs_en: "Blade Length: 17 cm\nMaterial: Stainless Steel\nHandle: Walnut Wood\nFluted Edge: Yes",
        height: "2 cm",
        length: "30 cm",
        width: "4.5 cm",
        weight: "160 g",
        material: "Stainless Steel / Walnut",
        origin: "Switzerland",
        bladeLength: "17 cm",
        edgeType: "Fluted",
        color: "Brown",
        dishwasherSafe: "no",
        warranty: "Lifetime",
        images: ["https://image.hm.com/assets/hm/33/12/3312079080287349195325851016834161963212.jpg"],
    },
    {
        name_de: "Victorinox Grand Maître Chef's Knife",
        name_tr: "Victorinox Grand Maître Şef Bıçağı",
        name_en: "Victorinox Grand Maître Chef's Knife",
        description_de: "Das geschmiedete Victorinox Grand Maître Kochmesser bietet perfekte Balance und Schärfe. Ein Muss für jeden Profi- und Hobbykoch.",
        description_tr: "Dövme çelikten üretilen Victorinox Grand Maître Şef Bıçağı, mükemmel denge ve keskinlik sunar. Her profesyonel ve hobi aşçısı için bir zorunluluktur.",
        description_en: "The forged Victorinox Grand Maître Chef's Knife offers perfect balance and sharpness. A must-have for every professional and hobby chef.",
        price: 120.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "VX-GM-CHEF-20",
        specs_de: "Klingenlänge: 20 cm\nMaterial: Geschmiedeter Stahl\nGriff: POM\nNieten: 3",
        specs_tr: "Bıçak Uzunluğu: 20 cm\nMalzeme: Dövme Çelik\nSap: POM\nPerçin: 3",
        specs_en: "Blade Length: 20 cm\nMaterial: Forged Steel\nHandle: POM\nRivets: 3",
        height: "2.8 cm",
        length: "35 cm",
        width: "5.5 cm",
        weight: "260 g",
        material: "Forged Steel / POM",
        origin: "Switzerland",
        bladeLength: "20 cm",
        edgeType: "Straight",
        color: "Black",
        dishwasherSafe: "yes",
        warranty: "Lifetime",
        images: ["https://image.hm.com/assets/hm/5e/51/5e51383849355153216891156636733912195893.jpg"],
    }
];

export default function ImportVictorinox() {
    const [loading, setLoading] = useState(false);

    const handleImport = async () => {
        if (!confirm("Victorinox ürünlerini içe aktarmak istediğinize emin misiniz?")) return;

        setLoading(true);
        try {
            const collectionRef = collection(db, "products");

            for (const product of VICTORINOX_PRODUCTS) {
                await addDoc(collectionRef, {
                    ...product,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }

            alert("Ürünler başarıyla eklendi! 🔪");
        } catch (error) {
            console.error("İçe aktarma hatası:", error);
            alert("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-stone-200 rounded-2xl bg-stone-50">
            <Database className="w-12 h-12 text-stone-300 mb-4" />
            <h3 className="text-lg font-bold text-stone-900 mb-2">Victorinox İçe Aktarıcı</h3>
            <p className="text-stone-500 mb-6 text-center max-w-md">
                Fibrox, Swiss Modern ve Grand Maître serilerinden popüler şef bıçaklarını veritabanına ekler.
            </p>
            <Button
                onClick={handleImport}
                disabled={loading}
                className="bg-[#C8102E] hover:bg-[#a00d25] text-white font-bold py-6 px-8 rounded-xl"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Ekleniyor...
                    </>
                ) : (
                    <>
                        Victorinox Bıçaklarını Ekle
                    </>
                )}
            </Button>
        </div>
    );
}
