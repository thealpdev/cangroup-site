import HeroPremium from "@/components/home/HeroPremium";
import BrandWorld from "@/components/home/BrandWorld";
import Spotlight from "@/components/home/Spotlight";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroPremium />
      <BrandWorld />

      <section className="py-24 bg-stone-50">
        <Spotlight />
      </section>
    </main>
  );
}
