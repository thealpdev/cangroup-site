"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ArrowRight } from 'lucide-react';

interface RelatedProductsProps {
    currentProductId: string;
    category?: string;
    brand?: string;
}

export default function RelatedProducts({ currentProductId, category, brand }: RelatedProductsProps) {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                // Determine query strategy: First try by Brand, then Category
                let q = query(
                    collection(db, "products"),
                    where("brand", "==", brand || ""),
                    limit(5)
                );

                let snap = await getDocs(q);
                let items = snap.docs.map(d => ({ id: d.id, ...d.data() }));

                // If not enough items, try category
                if (items.length < 2 && category) {
                    q = query(
                        collection(db, "products"),
                        where("category", "==", category),
                        limit(5)
                    );
                    snap = await getDocs(q);
                    const catItems = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                    items = [...items, ...catItems];
                }

                // Filter out current product and duplicates
                const unique = items
                    .filter(p => p.id !== currentProductId)
                    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
                    .slice(0, 4);

                setProducts(unique);
            } catch (error) {
                console.error("Error fetching related:", error);
            }
        };

        if (category || brand) {
            fetchRelated();
        }
    }, [category, brand, currentProductId]);

    if (products.length === 0) return null;

    return (
        <section className="py-16 border-t border-stone-100">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-serif font-bold text-stone-900">Bunları da Beğenebilirsiniz</h3>
                <Link href="/products" className="text-sm font-bold text-[#C8102E] flex items-center gap-2 hover:underline tracking-wide uppercase">
                    Tüm Katalog <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                    <Link key={item.id} href={`/products/${item.id}`} className="group block">
                        <div className="bg-stone-50 rounded-2xl p-4 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg border border-transparent group-hover:border-stone-100">
                            <div className="relative aspect-[4/5] bg-white rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={item.images?.[0] || item.image}
                                    alt={item.name_de || item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase text-[#C8102E] mb-1">{item.brand}</p>
                                <h4 className="font-bold text-stone-900 text-sm line-clamp-2 leading-tight group-hover:text-[#C8102E] transition-colors">{item.name_de || item.name_en}</h4>
                                <div className="mt-2 text-stone-600 font-medium">
                                    {item.price ? `${item.price} ${item.currency === 'TRY' ? '₺' : '€'}` : 'Fiyat Sorunuz'}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
