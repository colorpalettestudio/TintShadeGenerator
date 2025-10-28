import { Plus, Palette, Copy } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Plus,
    title: "Add or paste your brand colors",
    description: "Input HEX, RGB, or HSL — individually or in bulk."
  },
  {
    number: 2,
    icon: Palette,
    title: "Generate tints & shades",
    description: "We compute smooth, perceptual steps (OKLCH/LCH) so previews look designer-ready."
  },
  {
    number: 3,
    icon: Copy,
    title: "Copy or export in one click",
    description: "Grab individual codes, your whole column, or export the full grid as PNG/PDF/CSV."
  }
];

export default function HowItWorks() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="flex flex-col items-center text-center"
              data-testid={`step-${step.number}`}
            >
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold">
                {step.number}
              </div>
              <step.icon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
