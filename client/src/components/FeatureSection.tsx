import { CheckCircle2 } from "lucide-react";
import exampleImage from "@assets/generated_images/color_tints_shades_grid_3fa36725.png";

const features = [
  {
    title: "Designer-Friendly Color Scales",
    description: "Get perfectly smooth tints and shades without guesswork"
  },
  {
    title: "Instant Results",
    description: "Paste your palette, get everything in one click — no login"
  },
  {
    title: "Export Ready",
    description: "Grab PNG, PDF, or CSV for developers and clients"
  }
];

export default function FeatureSection() {
  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image on the left */}
          <div className="order-2 md:order-1">
            <img 
              src={exampleImage} 
              alt="Tint and shade color scales example"
              className="w-full rounded-lg border shadow-lg"
              data-testid="feature-image"
            />
          </div>
          
          {/* Content on the right */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Designers Love This Tool
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex gap-4"
                  data-testid={`feature-${index}`}
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
