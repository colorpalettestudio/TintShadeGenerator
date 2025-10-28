import { CheckCircle2, Palette, Zap, FileDown } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Perfect for Design Systems",
    description: "Build consistent UI states with mathematically precise tints and shades"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "No sign-up, no waiting. Paste colors and get your palette in seconds"
  },
  {
    icon: FileDown,
    title: "Export Everything",
    description: "Download as PNG, PDF, or CSV for presentations and developer handoff"
  }
];

export default function FeatureSection() {
  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Designers Love This Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional color scales without guesswork
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center"
              data-testid={`feature-${index}`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
