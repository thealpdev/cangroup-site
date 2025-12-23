import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Added Playfair Display for premium feel
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from "@/lib/cart-context";
import MaintenanceGuard from '@/components/layout/MaintenanceGuard';
import ClientLayout from "@/components/layout/ClientLayout";

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
                <ClientLayout>
                  {children}
                </ClientLayout>
              </MaintenanceGuard>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
