import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Build light/dark states for UI and components",
  "Extend brand palettes without guessing",
  "Create consistent scales for backgrounds, borders, and text",
  "Ship style guides faster with ready-to-copy codes"
];

export default function WhyDesignersUse() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Why Designers Use a Tint & Shade Generator
        </h2>
        
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3"
              data-testid={`benefit-${index}`}
            >
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-lg text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
