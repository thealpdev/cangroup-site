"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs, where, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useInView } from 'react-intersection-observer';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
    initialBrand?: string; // 'all', 'canadam', 'partner'
}

export default function ProductGrid({ initialBrand = 'all' }: ProductGridProps) {
    const [products, setProducts] = useState<DocumentData[]>([]);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [filterBrand, setFilterBrand] = useState(initialBrand);

    const { ref, inView } = useInView();

    const loadProducts = async (isInitial = false) => {
        if (loading || (!hasMore && !isInitial)) return;
        setLoading(true);

        try {
            let q = query(
                collection(db, "products"),
                orderBy("createdAt", "desc"),
                limit(20)
            );

            // Apply Filter
            if (filterBrand === 'canadam') {
                q = query(
                    collection(db, "products"),
                    where("brand", "==", "canadam"),
                    orderBy("createdAt", "desc"),
                    limit(20)
                );
            } else if (filterBrand === 'partner') {
                // Partner brands list matching the Form
                const PARTNER_BRANDS = ['dick', 'victorinox', 'zwilling', 'solingen', 'euroflex', 'other'];
                q = query(
                    collection(db, "products"),
                    where("brand", "in", PARTNER_BRANDS),
                    // Note: 'in' queries do not strongly support ordering by a different field (createdAt) 
                    // without a composite index. We might need to remove orderBy OR create index.
                    // For now, let's try without strict orderBy on createdAt if it fails, or rely on client sort if needed.
                    // Actually, Firestore allows orderBy createdAt IF index exists. Safest is to remove orderBy for this specific query if index is missing.
                    // Let's keep orderBy and assume index can be built.
                    orderBy("createdAt", "desc"),
                    limit(20)
                );
            }

            // Pagination
            if (!isInitial && lastDoc) {
                q = query(q, startAfter(lastDoc));
            }

            const snapshot = await getDocs(q);

            const newProducts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (snapshot.docs.length < 20) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

            if (isInitial) {
                setProducts(newProducts);
            } else {
                setProducts(prev => [...prev, ...newProducts]);
            }

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Reset and load on filter change
    useEffect(() => {
        setProducts([]);
        setLastDoc(null);
        setHasMore(true);
        loadProducts(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterBrand]);

    // Infinite scroll trigger
    useEffect(() => {
        if (inView && hasMore) {
            loadProducts(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, hasMore]);

    return (
        <div className="space-y-8">
            {/* Filter Tabs */}
            <div className="flex justify-center gap-4">
                <Button
                    variant={filterBrand === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterBrand('all')}
                    className="rounded-full px-6"
                >
                    All Products
                </Button>
                <Button
                    variant={filterBrand === 'canadam' ? 'default' : 'outline'}
                    onClick={() => setFilterBrand('canadam')}
                    className="rounded-full px-6"
                >
                    CAN GROUP Series
                </Button>
                <Button
                    variant={filterBrand === 'partner' ? 'default' : 'outline'}
                    onClick={() => setFilterBrand('partner')}
                    className="rounded-full px-6"
                >
                    Partner Brands
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product as any} index={index % 20} />
                ))}
            </div>

            {/* Loading State / Trigger */}
            <div ref={ref} className="flex justify-center py-10">
                {loading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
                {!hasMore && products.length > 0 && <p className="text-gray-400">End of catalog</p>}
                {!loading && products.length === 0 && <p className="text-gray-500">No products found.</p>}
            </div>
        </div>
    );
}
