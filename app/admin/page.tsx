"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductForm from '@/components/admin/ProductForm';
import SettingsForm from '@/components/admin/SettingsForm';
import PartnersManager from '@/components/admin/PartnersManager';
import { Package, Settings, Users } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="text-sm text-gray-500">CAN GROUP v2.0</div>
            </div>

            <Tabs defaultValue="products" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="products">
                        <Package className="mr-2 h-4 w-4" />
                        Products
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </TabsTrigger>
                    <TabsTrigger value="partners">
                        <Users className="mr-2 h-4 w-4" />
                        Partners
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="space-y-4">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                        <ProductForm />
                    </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                    <SettingsForm />
                </TabsContent>

                <TabsContent value="partners" className="space-y-4">
                    <PartnersManager />
                </TabsContent>
            </Tabs>
        </div>
    );
}
