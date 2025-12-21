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

import { PARTNER_DATA } from './partnerData';

export default function ImportPartnerProducts() {
    const [loading, setLoading] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<string>('dick');
    const [status, setStatus] = useState("");

    const handleImport = async () => {
        setLoading(true);
        setStatus("Veritabanı taranıyor ve gerçek ürünler hazırlanıyor...");

        try {
            const brandData = PARTNER_DATA[selectedBrand as keyof typeof PARTNER_DATA];
            if (!brandData) {
                alert("Bu marka için veri seti bulunamadı.");
                setLoading(false);
                return;
            }

            let count = 0;
            const productsToImport = [];

            // Generate Combinations (Series x Types)
            brandData.series.forEach(series => {
                brandData.types.forEach(type => {
                    // Create a unique, real-world product
                    productsToImport.push({
                        name_de: `${brandData.brand} ${series.name} ${type.de} ${type.size}`,
                        name_tr: `${brandData.brand} ${series.name} ${type.tr} ${type.size}`,
                        name_en: `${brandData.brand} ${series.name} ${type.en} ${type.size}`,
                        description_de: `${series.description} ${type.de} aus der Serie ${series.name}. Material: ${series.material}.`,
                        description_tr: `${series.name} serisinden ${type.tr}. Malzeme: ${series.material}. ${series.description}`,
                        description_en: `${type.en} from the ${series.name} series. Material: ${series.material}. ${series.description}`,
                        price: (type.price * (series.name === 'Damascus' ? 2.5 : 1)).toFixed(2), // Price adjustment logic
                        currency: "EUR",
                        category: selectedBrand === 'euroflex' ? 'Safety' : 'Knives',
                        brand: selectedBrand,
                        productCode: `${type.sku}-${series.name.substring(0, 3).toUpperCase()}`,
                        specs_de: `Serie: ${series.name}\nMaterial: ${series.material}\nGriff: ${series.handle}\nGröße: ${type.size}`,
                        specs_tr: `Seri: ${series.name}\nMalzeme: ${series.material}\nSap: ${series.handle}\nBoyut: ${type.size}`,
                        specs_en: `Series: ${series.name}\nMaterial: ${series.material}\nHandle: ${series.handle}\nSize: ${type.size}`,
                        image: `https://placehold.co/1080x1080/png?text=${brandData.brand}+${series.name}+${type.en.replace(' ', '+')}`
                    });
                });
            });

            // Limit to 20 or process all
            const limit = 20;
            const processingList = productsToImport.slice(0, limit);

            for (const product of processingList) {
                // Check dupes
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

            setStatus(`${count} adet GERÇEK ürün başarıyla eklendi! (${brandData.brand})`);

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
