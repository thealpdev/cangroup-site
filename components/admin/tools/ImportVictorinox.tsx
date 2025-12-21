"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, Database } from 'lucide-react';

const VICTORINOX_PRODUCTS = [
    {
        name_de: "Victorinox Fibrox Chef's Knife 8\" (20cm)",
        name_tr: "Victorinox Fibrox Şef Bıçağı 20cm",
        name_en: "Victorinox Fibrox Chef's Knife 8\" (20cm)",
        description_de: "Das Victorinox Fibrox Chef's Knife ist die erste Wahl für Profis. Der ergonomische, rutschfeste Fibrox-Griff sorgt für Sicherheit und Komfort, auch bei nassen Händen. Die Klinge aus rostfreiem Stahl ist extrem scharf und schnitthaltig.",
        description_tr: "Victorinox Fibrox Şef Bıçağı, profesyonellerin ilk tercihidir. Ergonomik ve kaymaz Fibrox sapı, ıslak ellerde bile güvenlik ve konfor sağlar. Paslanmaz çelik bıçağı son derece keskin ve dayanıklıdır.",
        description_en: "The Victorinox Fibrox Chef's Knife is the top choice for professionals. The ergonomic, non-slip Fibrox handle ensures safety and comfort, even with wet hands. The stainless steel blade is extremely sharp and retains its edge.",
        price: 48.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "5.2063.20",
        specs_de: "Klingenlänge: 20 cm\nMaterial: High Carbon Steel\nGriff: Fibrox (TPE)\nHärte: 56 HRC\nSchliff: Glatt\nSpülmaschinenfest: Ja",
        specs_tr: "Bıçak Uzunluğu: 20 cm\nMalzeme: Yüksek Karbonlu Çelik\nSap: Fibrox (TPE)\nSertlik: 56 HRC\nAğız: Düz\nBulaşık Makinesinde Yıkanabilir: Evet",
        specs_en: "Blade Length: 20 cm\nMaterial: High Carbon Steel\nHandle: Fibrox (TPE)\nHardness: 56 HRC\nEdge: Straight\nDishwasher Safe: Yes",
        height: "2.5 cm",
        length: "34 cm",
        width: "5 cm",
        weight: "185 g",
        material: "Stainless Steel / Fibrox",
        origin: "Switzerland",
        bladeLength: "20 cm",
        edgeType: "Straight",
        color: "Black",
        dishwasherSafe: "yes",
        warranty: "Lifetime",
        images: ["https://placehold.co/1080x1080/png?text=Victorinox+Fibrox+20cm"],
    },
    {
        name_de: "Victorinox Swiss Modern Chef's Knife Walnut 22cm",
        name_tr: "Victorinox Swiss Modern Şef Bıçağı Ceviz 22cm",
        name_en: "Victorinox Swiss Modern Chef's Knife Walnut 22cm",
        description_de: "Eleganz trifft auf Präzision. Das Swiss Modern Chef's Knife mit seinem Griff aus europäischem Walnussholz ist nicht nur ein optisches Highlight, sondern auch extrem leicht und perfekt ausbalanciert.",
        description_tr: "Zarafet hassasiyetle buluşuyor. Avrupa ceviz ağacından sapıyla Swiss Modern Şef Bıçağı, sadece görsel bir şölen değil, aynı zamanda son derece hafif ve mükemmel dengelidir.",
        description_en: "Elegance meets precision. The Swiss Modern Chef's Knife with its European walnut wood handle is not only a visual highlight but also extremely light and perfectly balanced.",
        price: 85.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "6.9010.22G",
        specs_de: "Klingenlänge: 22 cm\nMaterial: Rostfreier Stahl\nGriff: Walnussholz\nDesign: Modern & Ergonomisch\nSchliff: Glatt",
        specs_tr: "Bıçak Uzunluğu: 22 cm\nMalzeme: Paslanmaz Çelik\nSap: Ceviz Ağacı\nTasarım: Modern & Ergonomik\nAğız: Düz",
        specs_en: "Blade Length: 22 cm\nMaterial: Stainless Steel\nHandle: Walnut Wood\nDesign: Modern & Ergonomic\nEdge: Straight",
        height: "2.2 cm",
        length: "35 cm",
        width: "4.5 cm",
        weight: "117 g",
        material: "Stainless Steel / Walnut",
        origin: "Switzerland",
        bladeLength: "22 cm",
        edgeType: "Straight",
        color: "Brown",
        dishwasherSafe: "no",
        warranty: "Lifetime",
        images: ["https://placehold.co/1080x1080/png?text=Victorinox+Swiss+Modern+Walnut"],
    },
    {
        name_de: "Victorinox Grand Maître Chef's Knife 20cm",
        name_tr: "Victorinox Grand Maître Şef Bıçağı 20cm",
        name_en: "Victorinox Grand Maître Chef's Knife 20cm",
        description_de: "Das Meisterstück. Geschmiedet aus einem einzigen Stück Stahl, bietet das Grand Maître Kochmesser eine unvergleichliche Balance und Robustheit. Der ergonomische Griff sorgt für ermüdungsfreies Arbeiten.",
        description_tr: "Ustalık eseri. Tek parça çelikten dövülmüş Grand Maître Şef Bıçağı, benzersiz bir denge ve sağlamlık sunar. Ergonomik sapı yorulmadan çalışmayı garanti eder.",
        description_en: "The Masterpiece. Forged from a single piece of steel, the Grand Maître Chef's Knife offers unparalleled balance and robustness. The ergonomic handle ensures fatigue-free working.",
        price: 135.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "7.7403.20G",
        specs_de: "Klingenlänge: 20 cm\nMaterial: Geschmiedeter Stahl (X50CrMoV15)\nGriff: POM (Polyoxymethylen)\nKonstruktion: Full Tang (Durchgehender Erl)\nHärte: 56 HRC",
        specs_tr: "Bıçak Uzunluğu: 20 cm\nMalzeme: Dövme Çelik (X50CrMoV15)\nSap: POM (Polyoxymethylen)\nYapı: Full Tang (Tek Parça)\nSertlik: 56 HRC",
        specs_en: "Blade Length: 20 cm\nMaterial: Forged Steel (X50CrMoV15)\nHandle: POM\nConstruction: Full Tang\nHardness: 56 HRC",
        height: "2.8 cm",
        length: "34 cm",
        width: "5.5 cm",
        weight: "265 g",
        material: "Forged Steel / POM",
        origin: "Germany/Switzerland",
        bladeLength: "20 cm",
        edgeType: "Straight",
        color: "Black",
        dishwasherSafe: "yes",
        warranty: "Lifetime",
        images: ["https://placehold.co/1080x1080/png?text=Victorinox+Grand+Maitre"],
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
