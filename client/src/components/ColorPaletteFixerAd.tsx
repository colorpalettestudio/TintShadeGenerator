import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import fixerImage from "@assets/2_1761678638938.png";

const features = [
  "Diagnoses harmony, saturation & contrast issues",
  "One-click fixes in 60 seconds",
  "Export fixed palettes instantly"
];

export default function ColorPaletteFixerAd() {
  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-8" style={{ background: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image on the left */}
          <div className="order-2 md:order-1">
            <img 
              src={fixerImage} 
              alt="Color Palette Fixer interface showing harmony check and brand colors"
              className="w-full rounded-lg"
              data-testid="fixer-image"
            />
          </div>
          
          {/* Content on the right */}
          <div className="order-1 md:order-2 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to fix your color palette in 60 seconds?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              The Color Palette Fixer uses math, not AI.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex gap-3 items-start"
                  data-testid={`fixer-feature-${index}`}
                >
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="text-lg px-8 bg-white text-blue-600 hover:bg-white/90"
              asChild
              data-testid="button-fix-palette"
            >
              <a href="https://www.colorpalettefixer.com" target="_blank" rel="noopener noreferrer">
                Fix Your Color Palette
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
