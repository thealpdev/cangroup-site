import HeroPremium from "@/components/home/HeroPremium";
import Partners from "@/components/home/Partners";
import Spotlight from "@/components/home/Spotlight";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import BrandStory from "@/components/home/BrandStory";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroPremium />
      <Spotlight />
      <CategoryShowcase />
      <BrandStory />
      <Newsletter />
      <Partners />
    </main>
  );
}
