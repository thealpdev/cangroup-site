import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language-context";
import CartDrawer from "@/components/cart/CartDrawer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <LanguageProvider>
            <CartProvider>
                <div className="flex flex-col min-h-screen">
                    {!isAdmin && <Header />}

                    <main className="flex-1">
                        {children}
                    </main>

                    {!isAdmin && <Footer />}

                    <CartDrawer />
                </div>
            </CartProvider>
        </LanguageProvider>
    );
}
