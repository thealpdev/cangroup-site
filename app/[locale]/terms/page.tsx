"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 pb-20 container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-serif font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
                <div className="prose prose-stone max-w-none leading-relaxed">
                    <p className="font-bold mb-4">Stand: {new Date().toLocaleDateString('de-DE')}</p>

                    <h3>1. Geltungsbereich</h3>
                    <p>Für alle Lieferungen von CANGROUP an Verbraucher (§ 13 BGB) gelten diese Allgemeinen Geschäftsbedingungen (AGB).</p>

                    <h3>2. Vertragspartner</h3>
                    <p>Der Kaufvertrag kommt zustande mit CANGROUP, Inhaber: [Vorname Nachname], Neustadt 8, 63654 Büdingen.</p>

                    <h3>3. Angebot und Vertragsschluss</h3>
                    <p>3.1 Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar. Irrtümer vorbehalten.</p>
                    <p>3.2 Durch Anklicken des Buttons "Kaufen" geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Die Bestätigung des Eingangs Ihrer Bestellung erfolgt zusammen mit der Annahme der Bestellung unmittelbar nach dem Absenden durch eine automatisierte E-Mail. Mit dieser E-Mail-Bestätigung ist der Kaufvertrag zustande gekommen.</p>

                    <h3>4. Widerrufsrecht</h3>
                    <p>Verbrauchern steht ein Widerrufsrecht nach Maßgabe der Widerrufsbelehrung zu.</p>

                    <h3>5. Preise und Versandkosten</h3>
                    <p>5.1 Die auf den Produktseiten genannten Preise enthalten die gesetzliche Mehrwertsteuer und sonstige Preisbestandteile.</p>
                    <p>5.2 Zusätzlich zu den angegebenen Preisen berechnen wir für die Lieferung innerhalb Deutschlands pauschal [Betrag] Euro pro Bestellung. Die Versandkosten werden Ihnen im Warenkorbsystem und auf der Bestellseite nochmals deutlich mitgeteilt.</p>

                    <h3>6. Lieferung</h3>
                    <p>6.1 Die Lieferung erfolgt nur innerhalb Deutschlands.</p>
                    <p>6.2 Die Lieferzeit beträgt bis zu 5 Tage. Auf eventuell abweichende Lieferzeiten weisen wir auf der jeweiligen Produktseite hin.</p>

                    <h3>7. Zahlung</h3>
                    <p>Die Zahlung erfolgt wahlweise per Vorkasse, Nachnahme oder Kreditkarte.</p>

                    <h3>8. Eigentumsvorbehalt</h3>
                    <p>Bis zur vollständigen Zahlung bleibt die Ware unser Eigentum.</p>

                    <h3>9. Streitbeilegung</h3>
                    <p>Die EU-Kommission hat eine Internetplattform zur Online-Beilegung von Streitigkeiten geschaffen. Die Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen. Nähere Informationen sind unter dem folgenden Link verfügbar: <a href="http://ec.europa.eu/consumers/odr" className="text-[#C8102E] underline">http://ec.europa.eu/consumers/odr</a>. Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder bereit noch verpflichtet.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
