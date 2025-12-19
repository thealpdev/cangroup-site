import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroV2 from '@/components/home/HeroV2';
import CollectionShowcase from '@/components/home/CollectionShowcase';
import Legacy from '@/components/home/Legacy';
import Spotlight from '@/components/home/Spotlight';
import Partners from '@/components/home/Partners';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full">
        {/* 1. Cinematic Hero */}
        <HeroV2 />

        {/* 2. Collections (Masonry) */}
        <CollectionShowcase />

        {/* 3. Story / Legacy (Parallax) */}
        <Legacy />

        {/* 3.5 Partners */}
        <Partners />

        {/* 4. Featured / Spotlight (Dark Mode) */}
        <Spotlight />

        {/* 5. CTA / Newsletter */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
