import Hero from "@/components/Hero";
import ColorGrid from "@/components/ColorGrid";
import TintShadeExplainer from "@/components/TintShadeExplainer";
import HowToUse from "@/components/HowToUse";
import CTACard from "@/components/CTACard";
import FeatureSection from "@/components/FeatureSection";
import ColorPaletteFixerAd from "@/components/ColorPaletteFixerAd";
import FAQ from "@/components/FAQ";
import RelatedTools from "@/components/RelatedTools";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ColorGrid />
      <TintShadeExplainer />
      <HowToUse />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 my-16">
        <CTACard />
      </div>
      
      <FeatureSection />
      <ColorPaletteFixerAd />
      <FAQ />
      <RelatedTools />
      
      <Footer />
    </div>
  );
}
