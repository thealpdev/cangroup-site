import HeroPremium from "@/components/home/HeroPremium";
import Partners from "@/components/home/Partners";
import Spotlight from "@/components/home/Spotlight";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroPremium />

      <section className="py-24 bg-stone-50">
        <Spotlight />
      </section>

      <Partners />
    </main>
  );
}
