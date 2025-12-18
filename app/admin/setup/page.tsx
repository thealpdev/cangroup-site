"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

export default function AdminSetupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Create Firestore Record
            await setDoc(doc(db, "admins", user.uid), {
                email: user.email,
                role: 'owner',
                createdAt: new Date().toISOString()
            });

            alert("Master Admin Created! Redirecting to dashboard...");
            router.push('/admin');
        } catch (error: any) {
            console.error("Setup error:", error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
            <div className="w-full max-w-md space-y-4">
                {/* DIAGNOSTIC PANEL */}
                <Card className="bg-stone-900 text-white border-none shadow-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
                            System Diagnostic
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs font-mono space-y-1">
                        <div className="flex justify-between">
                            <span className="text-stone-500">API Key:</span>
                            <span className={process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "text-green-400" : "text-red-500 font-bold"}>
                                {process.env.NEXT_PUBLIC_FIREBASE_API_KEY
                                    ? `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.substring(0, 6)}...`
                                    : "MISSING / UNDEFINED"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-stone-500">Project ID:</span>
                            <span className={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "text-green-400" : "text-red-500 font-bold"}>
                                {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "MISSING"}
                            </span>
                        </div>
                        <div className="mt-2 text-[10px] text-stone-500 italic border-t border-stone-800 pt-2">
                            If these are RED ("MISSING"), you must add Environment Variables in Vercel Settings and Redeploy.
                        </div>
                    </CardContent>
                </Card>

                <Card className="w-full border-red-200 shadow-xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-red-100 p-3 rounded-full w-fit mb-4">
                            <ShieldAlert className="w-8 h-8 text-[#C8102E]" />
                        </div>
                        <CardTitle className="text-2xl font-bold uppercase tracking-tight text-[#C8102E]">
                            First Time Setup
                        </CardTitle>
                        <CardDescription>
                            Create the Master Admin account. <br />
                            <strong>This page is temporary.</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSetup} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Admin Email</label>
                                <Input
                                    type="email"
                                    placeholder="master@canmarkt.de"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Password</label>
                                <Input
                                    type="password"
                                    placeholder="Strong Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-[#C8102E] hover:bg-[#A00C24] font-bold text-white uppercase"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Owner Account"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            );
}
