"use client";

import {
    LayoutDashboard,
    Package,
    Settings,
    Users,
    UserPlus,
    LogOut,
    Menu,
    List,
    Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    userEmail?: string | null;
    logout: () => void;
    isMobileOpen?: boolean;
    setIsMobileOpen?: (open: boolean) => void;
}

export default function AdminSidebar({
    activeTab,
    setActiveTab,
    userEmail,
    logout,
    isMobileOpen,
    setIsMobileOpen
}: AdminSidebarProps) {

    const menuItems = [
        { id: 'overview', label: 'Genel Bakış', icon: LayoutDashboard },
        { id: 'products', label: 'Ürün Yönetimi', icon: Package },
        { id: 'categories', label: 'Kategoriler', icon: List },
        { id: 'partners', label: 'Marka Ortakları', icon: Users },
        { id: 'users', label: 'Erişim / Yetki', icon: UserPlus },
        { id: 'tools', label: 'Araçlar', icon: Database },
        { id: 'settings', label: 'Site Ayarları', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileOpen?.(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className={cn(
                "fixed md:relative z-50 w-64 h-full min-h-screen bg-stone-900 text-white flex flex-col transition-transform duration-300 ease-in-out",
                isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Brand Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#C8102E] text-white font-bold px-2 py-1 text-xs rounded uppercase tracking-wider">
                            Admin
                        </div>
                        <span className="font-bold text-lg tracking-tight">CanMarkt</span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 py-6 px-3 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsMobileOpen?.(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-[#C8102E] text-white shadow-lg shadow-red-900/20"
                                        : "text-stone-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {/* Footer / User Profile */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                    <div className="flex flex-col gap-3">
                        <div className="px-2">
                            <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">Giriş Yapıldı</div>
                            <div className="text-sm font-medium truncate text-stone-300" title={userEmail || ''}>
                                {userEmail}
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={logout}
                            className="w-full justify-start gap-2 text-stone-400 hover:text-red-400 hover:bg-white/5 rounded-xl"
                        >
                            <LogOut className="w-4 h-4" />
                            Çıkış Yap
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
