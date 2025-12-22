import HeroPremium from "@/components/home/HeroPremium";
import Partners from "@/components/home/Partners";
import Spotlight from "@/components/home/Spotlight";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroPremium />
      <Spotlight />
      <CategoryShowcase />
      <Newsletter />
      <Partners />
    </main>
  );
}
