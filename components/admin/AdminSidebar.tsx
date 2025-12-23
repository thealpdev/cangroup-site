"use client";

import {
    LayoutDashboard,
    Package,
    Tag,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Layers,
    Award,
    Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

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
    const t = useTranslations('Admin');

    const menuItems = [
        { id: 'overview', label: t('tabOverview'), icon: LayoutDashboard },
        { id: 'products', label: t('tabProducts'), icon: Package },
        { id: 'categories', label: t('tabCategories'), icon: Layers },
        { id: 'hero', label: t('tabHero'), icon: Layout },
        { id: 'partners', label: t('tabPartners'), icon: Award },
        { id: 'users', label: t('tabUsers'), icon: Users },
        { id: 'settings', label: t('tabSettings'), icon: Settings },
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
                            <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">{t('loggedIn')}</div>
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
                            {t('logout')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
