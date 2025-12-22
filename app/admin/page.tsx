"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Menu } from "lucide-react";
import { Button } from '@/components/ui/button';

// Components
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/DashboardOverview';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';
import CategoriesManager from '@/components/admin/CategoriesManager';
import HeroManager from '@/components/admin/HeroManager';
import SettingsForm from '@/components/admin/SettingsForm';
import PartnersManager from '@/components/admin/PartnersManager';
import UsersManager from '@/components/admin/UsersManager';

// Sub-view for Products to handle List vs Add state
function ProductsView() {
    const [view, setView] = useState<'list' | 'add'>('list');
    const [editingProduct, setEditingProduct] = useState<any>(null);

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setView('add');
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setView('add');
    };

    const handleSuccess = () => {
        setEditingProduct(null);
        setView('list');
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-stone-900">
                    {view === 'list' ? 'Ürün Yönetimi' : (editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle')}
                </h2>
                <p className="text-stone-500">
                    {view === 'list' ? 'Kataloğunuzdaki mevcut ürünleri yönetin.' : 'Ürün bilgilerini giriniz.'}
                </p>
            </div>

            {view === 'list' ? (
                <ProductList onAddNew={handleAddNew} onEdit={handleEdit} />
            ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <Button variant="outline" onClick={() => setView('list')} className="mb-4">
                        ← Listeye Dön
                    </Button>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <ProductForm initialData={editingProduct} onSuccess={handleSuccess} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AdminPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-[#C8102E] font-bold animate-pulse">Yükleniyor...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row">

            {/* Sidebar Navigation */}
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                userEmail={user.email}
                logout={logout}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">

                {/* Mobile Header Toggle */}
                <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-30">
                    <span className="font-bold text-stone-900">CanMarkt Admin</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)}>
                        <Menu className="w-6 h-6 text-stone-900" />
                    </Button>
                </div>

                {/* Content Container */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
                    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-2">

                        {/* VIEW: OVERVIEW */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <DashboardOverview userEmail={user.email} />

                                <div className="pt-8 border-t border-stone-100">
                                    {/* Quick Actions Removed */}
                                </div>
                            </div>
                        )}

                        {/* VIEW: PRODUCTS */}
                        {activeTab === 'products' && (
                            <ProductsView />
                        )}

                        {/* VIEW: CATEGORIES */}
                        {activeTab === 'categories' && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-stone-900">Kategori Yönetimi</h2>
                                    <p className="text-stone-500">Ürün kategorilerini düzenleyin.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                    <CategoriesManager />
                                </div>
                            </div>
                        )}

                        {/* VIEW: HERO */}
                        {activeTab === 'hero' && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-stone-900">Slider Yönetimi</h2>
                                    <p className="text-stone-500">Anasayfa manşet alanını düzenleyin.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                    <HeroManager />
                                </div>
                            </div>
                        )}

                        {/* VIEW: PARTNERS */}
                        {activeTab === 'partners' && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-stone-900">Marka Ortakları</h2>
                                    <p className="text-stone-500">İş birliği yapılan markaları yönetin.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                    <PartnersManager />
                                </div>
                            </div>
                        )}

                        {/* VIEW: USERS */}
                        {activeTab === 'users' && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-stone-900">Erişim Yönetimi</h2>
                                    <p className="text-stone-500">Panel yetkilerini düzenleyin.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                    <UsersManager />
                                </div>
                            </div>
                        )}

                        {/* VIEW: SETTINGS */}
                        {activeTab === 'settings' && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-stone-900">Site Ayarları</h2>
                                    <p className="text-stone-500">Genel konfigürasyon.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                    <SettingsForm />
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
