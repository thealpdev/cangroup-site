"use client";

import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    {/* Logo Placeholder */}
                    <div className="bg-red-600 text-white font-bold px-3 py-1 rounded">
                        CAN GROUP
                    </div>
                </Link>
                <nav className="flex gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-red-600 text-foreground/80">
                        Catalog
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-red-600 text-foreground/80">
                        About Us
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-red-600 text-foreground/80">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
