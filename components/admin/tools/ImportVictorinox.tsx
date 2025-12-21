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
        description_de: "Das Victorinox Fibrox Chef's Knife ist die erste Wahl für Profis. Der ergonomische, rutschfeste Fibrox-Griff sorgt für Sicherheit und Komfort. Die Klinge ist extrem scharf und schnitthaltig.",
        description_tr: "Victorinox Fibrox Şef Bıçağı, profesyonellerin ilk tercihidir. Ergonomik ve kaymaz Fibrox sapı güvenlik ve konfor sağlar. Bıçak son derece keskin ve dayanıklıdır.",
        description_en: "The Victorinox Fibrox Chef's Knife is the top choice for professionals. The ergonomic, non-slip Fibrox handle ensures safety and comfort. The blade is extremely sharp and durable.",
        price: 48.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "5.2063.20",
        specs_de: "Klingenlänge: 20 cm\nMaterial: High Carbon Steel\nGriff: Fibrox (TPE)\nHärte: 56 HRC\nSpülmaschinenfest: Ja",
        specs_tr: "Bıçak Uzunluğu: 20 cm\nMalzeme: Yüksek Karbonlu Çelik\nSap: Fibrox (TPE)\nSertlik: 56 HRC\nBulaşık Makinesinde Yıkanabilir: Evet",
        specs_en: "Blade Length: 20 cm\nMaterial: High Carbon Steel\nHandle: Fibrox (TPE)\nHardness: 56 HRC\nDishwasher Safe: Yes",
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
        description_de: "Eleganz trifft Präzision. Griff aus europäischem Walnussholz, extrem leicht und perfekt ausbalanciert.",
        description_tr: "Zarafet hassasiyetle buluşuyor. Avrupa ceviz ağacından sap, son derece hafif ve mükemmel dengeli.",
        description_en: "Elegance meets precision. European walnut wood handle, extremely light and perfectly balanced.",
        price: 85.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "6.9010.22G",
        specs_de: "Klingenlänge: 22 cm\nMaterial: Rostfreier Stahl\nGriff: Walnussholz\nDesign: Modern",
        specs_tr: "Bıçak Uzunluğu: 22 cm\nMalzeme: Paslanmaz Çelik\nSap: Ceviz Ağacı\nTasarım: Modern",
        specs_en: "Blade Length: 22 cm\nMaterial: Stainless Steel\nHandle: Walnut Wood\nDesign: Modern",
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
        description_de: "Geschmiedet aus einem Stück Stahl. Unvergleichliche Balance, Robustheit und Eleganz.",
        description_tr: "Tek parça çelikten dövülmüştür. Benzersiz denge, sağlamlık ve zarafet.",
        description_en: "Forged from a single piece of steel. Unparalleled balance, robustness, and elegance.",
        price: 135.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "7.7403.20G",
        specs_de: "Klingenlänge: 20 cm\nMaterial: Geschmiedeter Stahl\nGriff: POM\nKonstruktion: Full Tang",
        specs_tr: "Bıçak Uzunluğu: 20 cm\nMalzeme: Dövme Çelik\nSap: POM\nYapı: Full Tang",
        specs_en: "Blade Length: 20 cm\nMaterial: Forged Steel\nHandle: POM\nConstruction: Full Tang",
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
    },
    {
        name_de: "Victorinox Swiss Classic Chef's Knife 20cm",
        name_tr: "Victorinox Swiss Classic Şef Bıçağı 20cm",
        name_en: "Victorinox Swiss Classic Chef's Knife 20cm",
        description_de: "Ein vielseitiges Werkzeug für jede Küche. Die extra scharfe Klinge und der ergonomische Griff machen das Schneiden mühelos.",
        description_tr: "Her mutfak için çok yönlü bir alet. Ekstra keskin bıçak ve ergonomik sap kesmeyi zahmetsiz hale getirir.",
        description_en: "A versatile tool for every kitchen. The extra sharp blade and ergonomic handle make slicing effortless.",
        price: 42.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "6.8003.20",
        specs_de: "Klingenlänge: 20 cm\nGriff: TPE (Ergonomisch)\nSpülmaschinenfest: Ja\nGewicht: 131g",
        specs_tr: "Bıçak Uzunluğu: 20 cm\nSap: TPE (Ergonomik)\nBulaşık Makinesinde Yıkanabilir: Evet\nAğırlık: 131g",
        specs_en: "Blade Length: 20 cm\nHandle: TPE (Ergonomic)\nDishwasher Safe: Yes\nWeight: 131g",
        height: "2.2 cm",
        length: "34 cm",
        width: "4.8 cm",
        weight: "131 g",
        material: "Stainless Steel / TPE",
        origin: "Switzerland",
        bladeLength: "20 cm",
        edgeType: "Straight",
        color: "Black",
        dishwasherSafe: "yes",
        warranty: "Lifetime",
        images: ["https://placehold.co/1080x1080/png?text=Victorinox+Swiss+Classic"],
    },
    {
        name_de: "Victorinox Rosewood Chef's Knife 20cm",
        name_tr: "Victorinox Rosewood Şef Bıçağı 20cm",
        name_en: "Victorinox Rosewood Chef's Knife 20cm",
        description_de: "Natürliche Eleganz. Der handpolierte Palisandergriff bietet eine angenehme Haptik und eine klassische Optik.",
        description_tr: "Doğal zarafet. Elle parlatılmış gül ağacı sap, hoş bir dokunuş ve klasik bir görünüm sunar.",
        description_en: "Natural elegance. The hand-polished rosewood handle offers a pleasant feel and a classic look.",
        price: 55.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "5.2060.20",
        specs_de: "Klingenlänge: 20 cm\nGriff: Palisanderholz\nNicht spülmaschinenfest\nDesign: Klassisch",
        specs_tr: "Bıçak Uzunluğu: 20 cm\nSap: Gül Ağacı\nBulaşık Makinesinde Yıkanamaz\nTasarım: Klasik",
        specs_en: "Blade Length: 20 cm\nHandle: Rosewood\nNot Dishwasher Safe\nDesign: Classic",
        height: "2.5 cm",
        length: "34 cm",
        width: "5 cm",
        weight: "175 g",
        material: "Stainless Steel / Rosewood",
        origin: "Switzerland",
        bladeLength: "20 cm",
        edgeType: "Straight",
        color: "Brown",
        dishwasherSafe: "no",
        warranty: "Lifetime",
        images: ["https://placehold.co/1080x1080/png?text=Victorinox+Rosewood"],
    },
    {
        name_de: "Victorinox Chinese Chef's Knife 18cm",
        name_tr: "Victorinox Çin Şef Bıçağı 18cm",
        name_en: "Victorinox Chinese Chef's Knife 18cm",
        description_de: "Präzision im Hackmesser-Stil. Ideal zum Schneiden von Gemüse, Fleisch und Kräutern. Nicht zum Knacken von Knochen geeignet.",
        description_tr: "Satır tarzında hassasiyet. Sebze, et ve otları kesmek için idealdir. Kemik kırmak için uygun değildir.",
        description_en: "Precision in cleaver style. Ideal for cutting vegetables, meat, and herbs. Not suitable for cracking bones.",
        price: 60.00,
        currency: "EUR",
        brand: "Victorinox",
        category: "Knives",
        productCode: "5.4063.18",
        specs_de: "Klingenlänge: 18 cm\nKlingenbreite: 7.7 cm\nGriff: Fibrox\nSchliff: Dünnschliff",
        specs_tr: "Bıçak Uzunluğu: 18 cm\nBıçak Genişliği: 7.7 cm\nSap: Fibrox\nAğız: İnce Ağız",
        specs_en: "Blade Length: 18 cm\nBlade Width: 7.7 cm\nHandle: Fibrox\nGrind: Thin Grind",
        height: "7.7 cm",
        length: "31 cm",
        width: "2 cm",
        weight: "225 g",
        material: "Stainless Steel / Fibrox",
        origin: "Switzerland",
        bladeLength: "18 cm",
        edgeType: "Straight",
        color: "Black",
        dishwasherSafe: "yes",
        warranty: "Lifetime",
        images: ["https://placehold.co/1080x1080/png?text=Victorinox+Chinese+Chef"],
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
