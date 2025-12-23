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
                        (Dies ist ein Platzhalter-Impressum. Bitte prüfen Sie die Angaben auf Vollständigkeit gemäß § 5 TMG.)
                    </p>

                    <h3 className="mt-8 font-bold">Streitbeilegung</h3>
                    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#C8102E] underline">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
                    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
