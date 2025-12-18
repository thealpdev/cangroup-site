import ProductGrid from '@/components/catalog/ProductGrid';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Partners from '@/components/home/Partners';

export default function Home() {
  return (
    // Default background off-white for premium feel
    <div className="min-h-screen flex flex-col bg-[#F9F9F8]">
      <Header />

      <main className="flex-1 w-full">
        <Hero />

        {/* Partners Section with separation */}
        <section className="border-b border-stone-100 bg-white relative z-20">
          <Partners />
        </section>

        {/* Catalog Section */}
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="mb-20 text-center space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              <span className="h-[1px] w-20 bg-stone-300"></span>
              <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-400">
                The Collection
              </h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
              Curated Excellence for <br />
              <span className="italic text-stone-500">Professional Kitchens</span>
            </h1>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              Explore our exclusive range of high-performance cutlery.
              Designed for precision, durability, and the art of cooking.
            </p>
          </div>

          <ProductGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
