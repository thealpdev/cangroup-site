"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
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
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
            <Card className="w-full max-w-md border-t-4 border-t-[#C8102E] shadow-xl">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="bg-[#C8102E] text-white font-bold px-3 py-1 text-xs uppercase tracking-widest">
                            Admin Panel
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold uppercase tracking-tight text-stone-900">
                        System Access
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@canmarkt.de"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="rounded-none focus-visible:ring-[#C8102E]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="rounded-none focus-visible:ring-[#C8102E]"
                            />
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 font-medium bg-red-50 p-3 border border-red-100">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-[#C8102E] hover:bg-[#A00C24] text-white uppercase tracking-widest font-bold rounded-none h-12"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Secure Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 justify-center border-t py-4 text-xs text-stone-400">
                    <Link href="/admin/setup" className="text-[#C8102E] font-bold uppercase tracking-widest hover:underline">
                        ⚡ First Time? Create Master Account
                    </Link>
                    <Link href="/" className="hover:text-[#C8102E] transition-colors">
                        ← Return to Catalog
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
