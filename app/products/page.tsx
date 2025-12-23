"use client";

import { useEffect, useState, Suspense } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from '@/components/product/ProductCard';
import { Loader2, Sparkles, X, ArrowUpDown } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

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
    description_en?: string;
    description_de?: string;
    description_tr?: string;
    createdAt?: any;
    stock?: string;
    isNew?: boolean;
    isSale?: boolean;
    salePrice?: string;
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [brandFilter, setBrandFilter] = useState('All');
    const [sortBy, setSortBy] = useState<SortOption>('newest');

    const searchParams = useSearchParams();
    const router = useRouter();

    // URL Params
    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');

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

    const clearFilters = () => {
        setBrandFilter('All');
        router.push('/products');
    };

    const filteredProducts = products.filter(p => {
        // 1. Brand Filter (Local State)
        if (brandFilter !== 'All' && p.brand !== brandFilter) return false;

        // 2. Category Filter (URL Param)
        if (urlCategory) {
            if (!p.category?.toLowerCase().includes(urlCategory.toLowerCase())) return false;
        }

        // 3. Search Filter (URL Param)
        if (urlSearch) {
            const term = urlSearch.toLowerCase();
            const content = [
                p.name_en, p.name_de, p.name_tr,
                p.brand, p.category,
                p.description_en, p.description_de, p.description_tr
            ].join(' ').toLowerCase();

            if (!content.includes(term)) return false;
        }

        return true;
    });

    // Sorting Logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return (parseFloat(a.salePrice || a.price) || 0) - (parseFloat(b.salePrice || b.price) || 0);
            case 'price-desc':
                return (parseFloat(b.salePrice || b.price) || 0) - (parseFloat(a.salePrice || a.price) || 0);
            case 'name-asc':
                return (a.name_tr || '').localeCompare(b.name_tr || '');
            case 'newest':
            default:
                return 0;
        }
    });

    const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

    // Dynamic Title
    const pageTitle = urlCategory
        ? `${urlCategory} Koleksiyonu`
        : urlSearch
            ? `"${urlSearch}" için sonuçlar`
            : "Tüm Ürünler";

    const pageSubtitle = urlCategory ? "Özenle seçilmiş premium ürünler" : "CanMarkt ürün kataloğu";

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header / Filter Section */}
            <div className="pt-32 pb-12 bg-white border-b border-stone-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
                        <div>
                            <span className="text-[#C8102E] font-bold tracking-[0.2em] uppercase text-xs">CanMARKt</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-[#0a0a0a] mt-2 capitalize">{pageTitle}</h1>
                            <p className="text-stone-500 mt-2">{pageSubtitle}</p>

                            {(urlCategory || urlSearch) && (
                                <div className="flex items-center gap-2 mt-4 text-sm text-stone-500">
                                    <span>Aktif Filtre:</span>
                                    <button
                                        onClick={() => router.push('/products')}
                                        className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-stone-900 hover:bg-stone-200"
                                    >
                                        {urlCategory || urlSearch} <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Filter & Sort Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">

                        {/* Brand Filter */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                            <span className="text-xs font-bold uppercase text-stone-400 whitespace-nowrap mr-2">Marka:</span>
                            {brands.map(brand => (
                                <button
                                    key={brand as string}
                                    onClick={() => setBrandFilter(brand as string)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${brandFilter === brand
                                            ? 'bg-[#0a0a0a] text-white shadow-lg'
                                            : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                                        }`}
                                >
                                    {brand === 'All' ? 'Tümü' : brand}
                                </button>
                            ))}
                        </div>

                        {/* Sorting Dropdown */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className="text-xs font-bold uppercase text-stone-400 whitespace-nowrap">Sırala:</span>
                            <div className="relative group">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-stone-200 text-sm font-medium text-stone-700 outline-none focus:border-[#C8102E] cursor-pointer"
                                >
                                    <option value="newest">En Yeniler</option>
                                    <option value="price-asc">Fiyat (Artan)</option>
                                    <option value="price-desc">Fiyat (Azalan)</option>
                                    <option value="name-asc">İsim (A-Z)</option>
                                </select>
                                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-[#C8102E] animate-spin mb-4" />
                        <p className="text-stone-500 font-medium animate-pulse">Koleksiyon yükleniyor...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {sortedProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
                        <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-stone-900 mb-2">Ürün Bulunamadı</h3>
                        <p className="text-stone-500 mb-6">Arama kriterlerinize uygun ürün bulunamadı.</p>
                        <button
                            onClick={clearFilters}
                            className="bg-[#0a0a0a] text-white px-6 py-3 rounded-full font-bold hover:bg-[#C8102E] transition-colors"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center"><Loader2 className="animate-spin text-stone-300" /></div>}>
            <ProductGrid />
        </Suspense>
    );
}
