import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroV2 from '@/components/home/HeroV2';
import Spotlight from '@/components/home/Spotlight';
import Partners from '@/components/home/Partners';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full">
        {/* 1. Cinematic Hero */}
        <HeroV2 />

        {/* 2. Partners (Moved Up) */}
        <Partners />

        {/* 3. Products (Spotlight) */}
        <Spotlight />
      </main>

      <Footer />
    </div>
  );
}
