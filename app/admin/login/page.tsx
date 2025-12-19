"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, ShieldCheck, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (err: any) {
            console.error("Login failed:", err);
            setError("Giriş bilgileri hatalı. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
            <Card className="w-full max-w-md border-0 rounded-none shadow-2xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-[#C8102E] p-8 text-center text-white">
                    <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm font-bold tracking-[0.2em] uppercase opacity-90 mb-1">
                        Yönetici Paneli
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        GÜVENLİ GİRİŞ
                    </h1>
                </div>

                <CardContent className="p-8 bg-white">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-stone-500">
                                Kullanıcı Adı (E-posta)
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ornek@canmarkt.de"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="h-12 border-stone-300 rounded-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:border-[#C8102E] text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-stone-500">
                                Şifre
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="h-12 border-stone-300 rounded-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:border-[#C8102E] text-base"
                                />
                                <Lock className="absolute right-3 top-3.5 h-5 w-5 text-stone-300" />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-[#C8102E] p-4">
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-14 bg-stone-900 hover:bg-[#C8102E] text-white uppercase tracking-widest font-bold text-sm rounded-none transition-colors duration-300"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    <span>Giriş Yapılıyor...</span>
                                </div>
                            ) : (
                                "GİRİŞ YAP"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="bg-stone-50 border-t border-stone-100 p-6 flex flex-col items-center gap-3">
                    <Link href="/admin/setup" className="text-xs font-bold text-[#C8102E] uppercase tracking-widest hover:underline opacity-80 hover:opacity-100">
                        ⚡ İlk Kurulum? Hesap Oluştur
                    </Link>
                    <Link href="/" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
                        ← Mağazaya Dön
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
