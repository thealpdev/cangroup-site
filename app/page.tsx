import ProductGrid from '@/components/catalog/ProductGrid';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-stone-900">
            Premium Wholesale Catalog
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover our exclusive collection of high-quality knives and equipment.
            Official distributor of Canadam and premium partner brands.
          </p>
        </div>

        <ProductGrid />
      </main>

      <Footer />
    </div>
  );
}
