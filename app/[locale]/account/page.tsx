"use client";

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, LogOut, Heart } from 'lucide-react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from '@/components/product/ProductCard';

export default function AccountPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loadingFavs, setLoadingFavs] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;
            try {
                // Fetch user's favorite IDs
                const favsRef = collection(db, `users/${user.uid}/favorites`);
                const favsSnap = await getDocs(favsRef);
                const favIds = favsSnap.docs.map(doc => doc.id);

                if (favIds.length === 0) {
                    setFavorites([]);
                    setLoadingFavs(false);
                    return;
                }

                // Fetch actual product data
                // Note: For production, better to store mini-product data in favorites or use 'in' query
                // Here we fetch all products and filter (ok for small catalog) or fetch individually
                const productsRef = collection(db, "products");
                const productsSnap = await getDocs(productsRef);
                const userFavs = productsSnap.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter((p: any) => favIds.includes(p.id));

                setFavorites(userFavs);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoadingFavs(false);
            }
        };

        if (user) {
            fetchFavorites();
        }
    }, [user]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-stone-300" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-12">
            <div className="container mx-auto px-4">

                {/* Profile Header */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center text-white text-3xl font-serif">
                            {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-stone-900">
                                {user.displayName || 'Kullanıcı'}
                            </h1>
                            <p className="text-stone-500">{user.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg transition-colors font-bold text-sm uppercase tracking-wider"
                    >
                        <LogOut className="w-4 h-4" />
                        Çıkış Yap
                    </button>
                </div>

                {/* Favorites Section */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <Heart className="w-6 h-6 text-[#C8102E] fill-[#C8102E]" />
                        <h2 className="text-2xl font-serif font-bold text-stone-900">Favorilerim</h2>
                    </div>

                    {loadingFavs ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-stone-300" />
                        </div>
                    ) : favorites.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {favorites.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-200">
                            <Heart className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                            <p className="text-stone-500 font-medium">Henüz favori ürününüz yok.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
