import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">Über Uns</h1>
                <div className="prose prose-stone lg:prose-lg text-stone-700">
                    <p>
                        CANGROUP ist eine Marke, die sich auf den Großhandel von Produkten spezialisiert hat und in der Branche durch Qualität, Vertrauen und nachhaltige Partnerschaften hervorsticht.
                    </p>
                    <p>
                        Seit unserer Gründung handeln wir mit der Mission, unseren Kunden hochwertige Produkte anzubieten, und haben uns so eine starke Position in der Branche erarbeitet.
                        Unsere Mission ist es, ein zuverlässiger Geschäftspartner im Bereich des Großhandels sowohl auf nationalen als auch internationalen Märkten zu sein.
                    </p>
                    <p>
                        Mit unserem professionellen Team versprechen wir unseren Geschäftspartnern nicht nur Produkte, sondern auch eine vertrauensvolle und langfristige Zusammenarbeit.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
