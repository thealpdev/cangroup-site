import HeroPremium from "@/components/home/HeroPremium";
import BrandCards from "@/components/home/BrandCards";
import Partners from "@/components/home/Partners";
import Spotlight from "@/components/home/Spotlight";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroPremium />

      <Partners />

      <BrandCards />

      <section className="py-24 bg-stone-50">
        <Spotlight />
      </section>
    </main>
  );
}
