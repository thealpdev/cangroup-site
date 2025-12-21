import HeroV2 from '@/components/home/HeroV2';
import Spotlight from '@/components/home/Spotlight';
import Partners from '@/components/home/Partners';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-white">
      {/* 1. Cinematic Hero */}
      <HeroV2 />

      {/* 2. Partners */}
      <Partners />

      {/* 3. Products (Spotlight) */}
      <Spotlight />
    </div>
  );
}
