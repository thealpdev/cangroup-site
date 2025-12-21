"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { Trash2, Edit, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { format } from 'date-fns';

interface Product {
    id: string;
    image?: string;
    images?: string[];
    name_de: string;
    price: string;
    currency: string;
    category: string;
    createdAt?: any;
}

interface ProductListProps {
    onAddNew: () => void;
    onEdit: (product: any) => void;
}

export default function ProductList({ onAddNew, onEdit }: ProductListProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        // Fetch Products
        const qProd = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(qProd, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];
            setProducts(items);
            setLoading(false);
        });

        // Fetch Categories
        const fetchCategories = async () => {
            const qCat = query(collection(db, "categories"), orderBy("name", "asc"));
            const snap = await getDocs(qCat);
            setCategories(snap.docs.map(d => ({ id: d.id, name: d.data().name })));
        };
        fetchCategories();

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
            await deleteDoc(doc(db, "products", id));
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name_de?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <div className="text-center p-12 text-stone-500">Yükleniyor...</div>;

    return (
        <div className="space-y-6">

            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <Input
                            placeholder="Ürün Ara..."
                            className="pl-10 bg-white border-stone-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="bg-white border-stone-200">
                                <Filter className="w-4 h-4 mr-2 text-stone-400" />
                                <SelectValue placeholder="Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                                {categories.map(c => (
                                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button onClick={onAddNew} className="w-full md:w-auto bg-[#C8102E] hover:bg-[#A00C24] text-white">
                    <Plus className="w-4 h-4 mr-2" /> Yeni Ürün Ekle
                </Button>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50 text-stone-500 uppercase text-xs font-bold tracking-wider border-b border-stone-100">
                            <tr>
                                <th className="px-6 py-4">Görsel</th>
                                <th className="px-6 py-4">Ürün Adı</th>
                                <th className="px-6 py-4">Fiyat</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Tarih</th>
                                <th className="px-6 py-4 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="relative w-12 h-12 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                                            {(product.images?.[0] || product.image) ? (
                                                <Image
                                                    src={product.images?.[0] || product.image || ''}
                                                    alt={product.name_de}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span className="flex items-center justify-center h-full text-[8px] text-stone-400">NO IMG</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-stone-900">
                                        {product.name_de}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-stone-600">
                                        {product.price} {product.currency}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs">
                                            {product.category || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-stone-400 text-xs">
                                        {product.createdAt?.seconds ? format(new Date(product.createdAt.seconds * 1000), 'dd MMM yyyy') : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-stone-400 hover:text-blue-600 hover:bg-blue-50"
                                            onClick={() => onEdit(product)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-stone-400 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-stone-400">
                                        Ürün bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
