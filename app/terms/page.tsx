"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 pb-20 container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-serif font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
                <div className="prose prose-stone">
                    <p>Inhalte folgen.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
