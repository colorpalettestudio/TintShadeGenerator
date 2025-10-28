import Hero from "@/components/Hero";
import ColorGrid from "@/components/ColorGrid";
import TintShadeExplainer from "@/components/TintShadeExplainer";
import HowToUse from "@/components/HowToUse";
import FeatureSection from "@/components/FeatureSection";
import ColorPaletteFixerAd from "@/components/ColorPaletteFixerAd";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ColorGrid />
      <TintShadeExplainer />
      <HowToUse />
      <FeatureSection />
      <ColorPaletteFixerAd />
      
      <Footer />
    </div>
  );
}
