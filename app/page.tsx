// import HeroPremium from "@/components/home/HeroPremium";
// import Partners from "@/components/home/Partners";
// import Spotlight from "@/components/home/Spotlight";
import { Wrench } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white px-4 text-center">
      <div className="mb-8 p-6 rounded-full bg-white/5 border border-white/10 animate-pulse">
        <Wrench className="w-16 h-16 text-[#C8102E]" />
      </div>

      <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">
        CAN GROUP
      </h1>

      <div className="h-1 w-24 bg-[#C8102E] mb-8" />

      <h2 className="text-2xl md:text-3xl font-light text-stone-300 mb-4">
        Sitemiz Kısa Bir Süre Bakım Aşamasındadır
      </h2>

      <p className="text-stone-500 max-w-md mx-auto leading-relaxed">
        Daha iyi bir deneyim sunmak için altyapımızı yeniliyoruz. Anlayışınız için teşekkür ederiz.
      </p>
    </main>
  );
}
