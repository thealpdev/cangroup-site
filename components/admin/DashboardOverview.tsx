"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Activity, ExternalLink } from "lucide-react";
import Link from 'next/link';

export default function DashboardOverview({ userEmail }: { userEmail?: string | null }) {

    // In a real app, these could be fetched from DB info passed as props
    const stats = [
        { label: "Toplam Ürün", value: "124", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Aktif Markalar", value: "3", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Sistem Durumu", value: "Aktif", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Hoşgeldin, {userEmail?.split('@')[0]}! 👋</h1>
                    <p className="text-stone-300 max-w-xl">
                        CanMarkt yönetim paneline erişim sağladınız.
                        Sol menüyü kullanarak ürün ekleyebilir, marka ortaklarını yönetebilir veya site ayarlarını değiştirebilirsiniz.
                    </p>
                </div>
                {/* Decorative circle */}
                <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={i} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm text-stone-500 font-medium">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-stone-900">{stat.value}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions / Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-2xl border-stone-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link href="/" target="_blank" className="flex items-center justify-between p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group">
                            <span className="font-medium text-stone-700">Siteyi Görüntüle</span>
                            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#C8102E]" />
                        </Link>
                        <div className="p-4 bg-stone-50 rounded-xl flex flex-col gap-1">
                            <span className="font-medium text-stone-700">Yeni Ürün Ekle</span>
                            <span className="text-xs text-stone-500">"Ürün Yönetimi" sekmesine giderek katalog güncelleyebilirsiniz.</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-stone-200 shadow-sm bg-[#C8102E]/5 border-none">
                    <CardHeader>
                        <CardTitle className="text-lg text-[#C8102E]">Admin Notu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            Veri güvenliği için işiniz bittiğinde sol alttaki <b>Çıkış Yap</b> butonunu kullanmayı unutmayın.
                            Herhangi bir hata veya teknik sorun durumunda Console loglarını kontrol edebilirsiniz.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
