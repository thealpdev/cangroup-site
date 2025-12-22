"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function Newsletter() {
    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <Mail className="w-12 h-12 text-[#C8102E] mx-auto opacity-80" />

                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">CanMarkt Özel Bülteni</h2>
                        <p className="text-stone-400">Yeni koleksiyonlar, özel indirimler ve şef tavsiyeleri için abone olun.</p>
                    </div>

                    <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            type="email"
                            placeholder="E-posta adresiniz"
                            className="h-14 bg-white/5 border-white/10 text-white placeholder:text-stone-500 rounded-full px-6 focus:border-[#C8102E] focus:ring-[#C8102E]/20"
                        />
                        <Button className="h-14 px-8 rounded-full bg-[#C8102E] hover:bg-[#a00d25] text-white font-bold uppercase tracking-wider text-xs">
                            Kayıt Ol
                        </Button>
                    </form>

                    <p className="text-[10px] text-stone-600 uppercase tracking-widest">
                        İstediğiniz zaman abonelikten çıkabilirsiniz.
                    </p>
                </div>
            </div>
        </section>
    );
}
