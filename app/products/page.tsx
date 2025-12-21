"use client";

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from '@/components/product/ProductCard';
import { Loader2, Sparkles } from 'lucide-react';

interface Product {
    id: string;
    name_en: string;
    name_de: string;
    name_tr: string;
    price: string;
    currency: string;
    images?: string[];
    image?: string;
    brand?: string;
    category?: string;
    specs_en?: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
                setProducts(items);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.brand === filter);

    const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header / Filter Section */}
            <div className="pt-32 pb-12 bg-white border-b border-stone-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
                        <div>
                            <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs">Unsere Kollektion</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-[#0a0a0a] mt-2">Produktkatalog</h1>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {brands.map(b => (
                                <button
                                    key={b}
                                    onClick={() => setFilter(b || 'All')}
                                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === (b || 'All')
                                        ? "bg-[#0a0a0a] text-white shadow-lg"
                                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                                        }`}
                                >
                                    {b || 'Alle'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4 py-16">
                {loading ? (
                    <div className="flex items-center justify-center min-h-[40vh]">
                        <Loader2 className="w-10 h-10 text-stone-300 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredProducts.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-24 text-stone-400">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="tracking-widest uppercase text-sm">Keine Produkte gefunden</p>
                    </div>
                )}
            </div>
        </div>
    );
}
