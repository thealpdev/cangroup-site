import ProductGrid from '@/components/catalog/ProductGrid';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Partners from '@/components/home/Partners';
import Features from '@/components/home/Features';
import CTASection from '@/components/home/CTASection';
import SteelComparison from '@/components/home/SteelComparison';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full">
        <Hero />

        {/* Trusted Partners - Clearly visible */}
        <section className="bg-stone-50 border-b border-stone-200 py-12">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Trusted Brands</span>
          </div>
          <Partners />
        </section>

        <section className="relative z-10">
          <Features />
        </section>

        {/* New Steel Comparison Section */}
        <SteelComparison />

        {/* Catalog Section */}
        <div id="catalog" className="container mx-auto px-6 py-24 md:py-32 bg-transparent">
          <div className="mb-20 text-center space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              <span className="h-1 w-20 bg-[#C8102E]"></span>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-900">
                The Collection
              </h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight uppercase tracking-tight">
              Professional <br /> Cutlery Catalog
            </h1>
            <p className="text-lg text-stone-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Browse our complete range of Solingen and Swiss knives.
              Built for butchers, chefs, and industry professionals.
            </p>
          </div>

          <ProductGrid />
        </div>

        <section>
          <CTASection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
