"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, User } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'register') {
                const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                if (formData.name) {
                    await updateProfile(cred.user, { displayName: formData.name });
                }
            } else {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
            }
            onClose();
            router.refresh();
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('E-posta veya şifre hatalı.');
            } else if (err.code === 'auth/email-already-in-use') {
                setError('Bu e-posta adresi zaten kullanımda.');
            } else if (err.code === 'auth/weak-password') {
                setError('Şifre en az 6 karakter olmalıdır.');
            } else {
                setError('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header Image/Pattern */}
                    <div className="h-32 bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1593642632823-8f7853670961?q=80&w=2070')] bg-cover bg-center" />
                        <h2 className="relative z-10 text-white font-serif text-2xl font-bold tracking-wide">
                            {mode === 'login' ? 'Hoşgeldiniz' : 'Aramıza Katılın'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-8">
                        {/* Tabs */}
                        <div className="flex p-1 bg-stone-100 rounded-lg mb-8">
                            <button
                                onClick={() => setMode('login')}
                                className={cn(
                                    "flex-1 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-all",
                                    mode === 'login' ? "bg-white text-[#0a0a0a] shadow-sm" : "text-stone-500 hover:text-stone-700"
                                )}
                            >
                                Giriş Yap
                            </button>
                            <button
                                onClick={() => setMode('register')}
                                className={cn(
                                    "flex-1 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-all",
                                    mode === 'register' ? "bg-white text-[#0a0a0a] shadow-sm" : "text-stone-500 hover:text-stone-700"
                                )}
                            >
                                Kayıt Ol
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'register' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-stone-500">İsim Soyisim</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-[#C8102E] transition-colors"
                                            placeholder="Adınız"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-stone-500">E-posta</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-[#C8102E] transition-colors"
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-stone-500">Şifre</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-[#C8102E] transition-colors"
                                        placeholder="******"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#C8102E] text-white font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-[#A00C24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                            >
                                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                                {mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
