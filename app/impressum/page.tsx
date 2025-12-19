"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ImpressumPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 pb-20 container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-serif font-bold mb-8">Impressum</h1>
                <div className="prose prose-stone leading-relaxed">
                    <p>
                        <strong>Angaben gemäß § 5 TMG</strong><br />
                        CANGROUP<br />
                        Neustadt 8<br />
                        63654 Büdingen<br />
                        Deutschland
                    </p>
                    <p>
                        <strong>Kontakt</strong><br />
                        Telefon: +49 (0) 178 4057295<br />
                        E-Mail: info@cangroup.de
                    </p>
                    <p>
                        <strong>Redaktionell verantwortlich</strong><br />
                        CANGROUP
                    </p>
                    <p className="text-sm text-stone-500 mt-8">
                        (Dies ist ein Platzhalter-Impressum. Bitte ergänzen Sie fehlende rechtliche Angaben wie Rechtsform, Vertretungsberechtigte, Registereintrag und Umsatzsteuer-ID.)
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
