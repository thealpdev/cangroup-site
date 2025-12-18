export default function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-300 py-12 mt-12">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">CAN GROUP</h3>
                    <p className="max-w-md text-sm leading-relaxed">
                        Ihr zuverlässiger Partner im Großhandel für hochwertige Messer und Gastronomiebedarf.
                    </p>
                </div>
                <div className="text-sm space-y-2">
                    <h4 className="text-white font-semibold mb-2">Impressum</h4>
                    <p>CAN GROUP</p>
                    <p>Neustadt 8, 63654 Büdingen</p>
                    <p>Tel. +49 (0) 178 4057295</p>
                    <p>E-Mail: cangroup@canmarkt.de</p>
                    <div className="mt-4 text-xs text-stone-500">
                        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE 451461666</p>
                        <p>Steuer-Nr.: 034 804 60 078</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-stone-800 text-center text-xs">
                &copy; {new Date().getFullYear()} CAN GROUP. All Rights Reserved.
            </div>
        </footer>
    );
}
