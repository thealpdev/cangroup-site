import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Added Playfair Display for premium feel
import "../globals.css"; // Adjusted path to point to app/globals.css
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import MaintenanceGuard from '@/components/layout/MaintenanceGuard';
import ClientLayout from "@/components/layout/ClientLayout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SnowEffect from '@/components/effects/SnowEffect';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" }); // Define serif font

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      default: t('title'),
      template: "%s | CanMarkt"
    },
    description: t('description'),
    keywords: t('keywords').split(', '),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: "https://canmarkt.de",
      siteName: "CanMarkt",
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : 'de_DE',
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans bg-white text-stone-900 selection:bg-[#C8102E] selection:text-white">
        <SnowEffect />
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <LanguageProvider>
              <CartProvider>
                <WishlistProvider>
                  <MaintenanceGuard>
                    <ClientLayout>
                      {children}
                    </ClientLayout>
                  </MaintenanceGuard>
                </WishlistProvider>
              </CartProvider>
            </LanguageProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
