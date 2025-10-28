import Hero from "@/components/Hero";
import ColorGrid from "@/components/ColorGrid";
import CTACard from "@/components/CTACard";
import HowItWorks from "@/components/HowItWorks";
import WhyDesignersUse from "@/components/WhyDesignersUse";
import TintsShadesExplainer from "@/components/TintsShadesExplainer";
import SupportedFormats from "@/components/SupportedFormats";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ColorGrid />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 my-16">
        <CTACard />
      </div>
      
      <HowItWorks />
      <WhyDesignersUse />
      <TintsShadesExplainer />
      <SupportedFormats />
      <FAQ />
      
      <Footer />
    </div>
  );
}
