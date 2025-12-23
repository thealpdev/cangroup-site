"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Newsletter() {
    const t = useTranslations('Homepage');
    const tFooter = useTranslations('Footer'); // Reusing email placeholder

    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <Mail className="w-12 h-12 text-[#C8102E] mx-auto opacity-80" />

                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{t('newsletterTitle')}</h2>
                        <p className="text-stone-400">{t('newsletterDesc')}</p>
                    </div>

                    <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            type="email"
                            placeholder={tFooter('emailPlaceholder')}
                            className="h-14 bg-white/5 border-white/10 text-white placeholder:text-stone-500 rounded-full px-6 focus:border-[#C8102E] focus:ring-[#C8102E]/20"
                        />
                        <Button className="h-14 px-8 rounded-full bg-[#C8102E] hover:bg-[#a00d25] text-white font-bold uppercase tracking-wider text-xs">
                            {t('subscribeBtn')}
                        </Button>
                    </form>

                    <p className="text-[10px] text-stone-600 uppercase tracking-widest">
                        {t('unsubscribeText')}
                    </p>
                </div>
            </div>
        </section>
    );
}
