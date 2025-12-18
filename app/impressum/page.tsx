import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ImpressumPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">Impressum</h1>
                <div className="prose prose-stone">
                    <p className="font-bold">CAN GROUP</p>
                    <p>Neustadt 8, 63654 Büdingen</p>
                    <p>Postanschrift: CAN GROUP, Neustadt 8, 63654 Büdingen</p>
                    <br />
                    <p>Tel. +49 (0) 178 4057295</p>
                    <p>E-Mail: <a href="mailto:cangroup@canmarkt.de" className="text-blue-600 hover:underline">cangroup@canmarkt.de</a></p>
                    <br />
                    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE 451461666</p>
                    <p>Steuer-Nr.: 034 804 60 078</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
