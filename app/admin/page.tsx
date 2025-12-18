"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductForm from '@/components/admin/ProductForm';
import SettingsForm from '@/components/admin/SettingsForm';
import PartnersManager from '@/components/admin/PartnersManager';
import UsersManager from '@/components/admin/UsersManager'; // NEW
import { Package, Settings, Users, UserPlus, LogOut } from "lucide-react";
import { Button } from '@/components/ui/button';

export default function AdminPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) return null; // Prevent flicker

    return (
        <div className="min-h-screen bg-stone-50/50">
            {/* Top Bar */}
            <header className="bg-white border-b border-stone-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-[#C8102E] text-white font-bold px-2 py-1 text-[10px] uppercase tracking-widest rounded-sm">
                        Admin
                    </div>
                    <span className="font-bold text-stone-900">Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-stone-500 font-medium hidden md:block">
                        {user.email}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => logout()}
                        className="text-stone-600 hover:text-red-600 border-stone-200"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="container mx-auto py-10 px-4 md:px-0">
                <Tabs defaultValue="products" className="space-y-8">
                    <TabsList className="bg-white border border-stone-200 p-1 rounded-none inline-flex h-auto gap-1">
                        <TabsTrigger
                            value="products"
                            className="data-[state=active]:bg-[#C8102E] data-[state=active]:text-white rounded-none px-6 py-2 uppercase tracking-tight text-xs font-bold"
                        >
                            <Package className="mr-2 h-4 w-4" />
                            Products
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="data-[state=active]:bg-[#C8102E] data-[state=active]:text-white rounded-none px-6 py-2 uppercase tracking-tight text-xs font-bold"
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </TabsTrigger>
                        <TabsTrigger
                            value="partners"
                            className="data-[state=active]:bg-[#C8102E] data-[state=active]:text-white rounded-none px-6 py-2 uppercase tracking-tight text-xs font-bold"
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Partners
                        </TabsTrigger>
                        <TabsTrigger
                            value="users"
                            className="data-[state=active]:bg-[#C8102E] data-[state=active]:text-white rounded-none px-6 py-2 uppercase tracking-tight text-xs font-bold"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Access
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="products" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold uppercase tracking-tight">Product Catalog</h2>
                        </div>
                        <ProductForm />
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-tight">Site Configuration</h2>
                        <SettingsForm />
                    </TabsContent>

                    <TabsContent value="partners" className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-tight">Brand Partnerships</h2>
                        <PartnersManager />
                    </TabsContent>

                    {/* NEW USERS TAB */}
                    <TabsContent value="users" className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-tight">User Management</h2>
                        <UsersManager />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
