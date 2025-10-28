import { Check } from "lucide-react";

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
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Why Designers Love This Tool
        </h2>
        
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex gap-4 text-left"
              data-testid={`feature-${index}`}
            >
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
