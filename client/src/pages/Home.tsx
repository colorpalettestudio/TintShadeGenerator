import Hero from "@/components/Hero";
import ColorGrid from "@/components/ColorGrid";
import HowToUse from "@/components/HowToUse";
import CTACard from "@/components/CTACard";
import FeatureSection from "@/components/FeatureSection";
import UseCases from "@/components/UseCases";
import FAQ from "@/components/FAQ";
import RelatedTools from "@/components/RelatedTools";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ColorGrid />
      <HowToUse />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 my-16">
        <CTACard />
      </div>
      
      <FeatureSection />
      <UseCases />
      <FAQ />
      <RelatedTools />
      
      <Footer />
    </div>
  );
}
