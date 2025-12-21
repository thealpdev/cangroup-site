"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'de' | 'tr' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    de: {
        products: "Produkte",
        about: "Über uns",
        contact: "Kontakt",
        search: "Suchen",
        cart: "Warenkorb",
        addToCart: "Zur Liste hinzufügen",
        details: "Details ansehen"
    },
    tr: {
        products: "Ürünler",
        about: "Hakkımızda",
        contact: "İletişim",
        search: "Ara",
        cart: "Sepet",
        addToCart: "Listeye Ekle",
        details: "İncele"
    },
    en: {
        products: "Products",
        about: "About Us",
        contact: "Contact",
        search: "Search",
        cart: "Cart",
        addToCart: "Add to List",
        details: "View Details"
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('de');

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved) setLanguage(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: string) => {
        return (translations[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
