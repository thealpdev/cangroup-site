import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Added Playfair Display for premium feel
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from "@/lib/cart-context";
import MaintenanceGuard from '@/components/layout/MaintenanceGuard';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" }); // Define serif font

export const metadata: Metadata = {
  title: "CanMarkt | Premium Kalite & Tazelik",
  description: "En taze ürünler ve premium hizmet kalitesiyle CanMarkt hizmetinizde.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans bg-white text-stone-900 selection:bg-[#C8102E] selection:text-white">
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <MaintenanceGuard>
                {children}
              </MaintenanceGuard>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
