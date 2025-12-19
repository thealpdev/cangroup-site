import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#050505] text-white pt-24 pb-12 overflow-hidden border-t border-white/10">
            <div className="container mx-auto px-6">

                {/* Big Brand Name */}
                <div className="mb-20">
                    <h1 className="text-[12vw] font-bold tracking-tighter leading-none text-white/5 select-none text-center md:text-left">
                        CAN GROUP
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-20">

                    {/* Column 1: Brand Info */}
                    <div className="space-y-6">
                        <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">About</span>
                        <p className="text-stone-400 leading-relaxed font-light">
                            Forging the finest legacy in cutlery since 1990.
                            We deliver precision, durability, and tradition to professionals worldwide.
                        </p>
                    </div>

                    {/* Column 2: Catalog */}
                    <div className="space-y-6">
                        <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">Collections</span>
                        <ul className="space-y-3 text-stone-400 text-sm">
                            <li className="hover:text-white transition-colors cursor-pointer">Butcher Series</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Chef's Essentials</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Professional Sets</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Sharpening Tools</li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div className="space-y-6">
                        <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">Legal</span>
                        <ul className="space-y-3 text-stone-400 text-sm">
                            <li className="hover:text-white transition-colors cursor-pointer">Impressum</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Cookie Settings</li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="space-y-6">
                        <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">Contact</span>
                        <div className="text-stone-400 text-sm space-y-2">
                            <p>Neustadt 8,</p>
                            <p>63654 Büdingen, Germany</p>
                            <br />
                            <p className="hover:text-white transition-colors cursor-pointer">info@cangroup.de</p>
                            <p className="hover:text-white transition-colors cursor-pointer">+49 (0) 178 4057295</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-stone-600 gap-4">
                    <p>&copy; {new Date().getFullYear()} CAN GROUP. All Rights Reserved.</p>
                    <Link href="/admin" className="hover:text-white transition-colors uppercase tracking-widest font-bold">
                        Admin Access
                    </Link>
                </div>
            </div>
        </footer>
    );
}
