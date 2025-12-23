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
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" }); // Define serif font

export const metadata: Metadata = {
  title: {
    default: "CanMarkt | Premium Mutfak & Bıçak Dünyası",
    template: "%s | CanMarkt"
  },
  description: "Profesyonel şef bıçakları, Japon santoku bıçakları ve mutfak ekipmanlarında kalite ve güvenin adresi. En taze ürünler ve premium hizmet.",
  keywords: ["şef bıçağı", "chef knife", "santoku", "damascus", "bıçak seti", "profesyonel mutfak", "canmarkt", "cangroup"],
  openGraph: {
    title: "CanMarkt | Premium Mutfak & Bıçak Dünyası",
    description: "Profesyonel mutfak deneyimi için en iyi bıçak koleksiyonları.",
    url: "https://canmarkt.de",
    siteName: "CanMarkt",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

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
