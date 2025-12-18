import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">Kontakt</h1>

                <div className="bg-white p-8 rounded-lg shadow-sm border space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Anschrift</h3>
                        <p>CAN GROUP</p>
                        <p>Neustadt 8</p>
                        <p>63654 Büdingen</p>
                        <p>Deutschland</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">Kommunikation</h3>
                        <p><strong>Telefon:</strong> +49 (0) 178 4057295</p>
                        <p><strong>E-Mail:</strong> <a href="mailto:cangroup@canmarkt.de" className="text-blue-600 hover:underline">cangroup@canmarkt.de</a></p>
                    </div>

                    <div className="pt-4 border-t text-sm text-gray-500">
                        Für Großhandelsanfragen stehen wir Ihnen gerne zur Verfügung.
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
