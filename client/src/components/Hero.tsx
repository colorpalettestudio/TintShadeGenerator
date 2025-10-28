import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-16 px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Badge 
          variant="outline" 
          className="mb-6 px-4 py-1.5 text-sm font-medium uppercase tracking-wide"
          data-testid="badge-hero"
        >
          Free, Instant & No Sign-Up
        </Badge>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Tint and Shade Generator
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Add your brand colors—get smooth, designer-friendly tints and shades in one click. 
          Copy any swatch, a whole column, or everything at once.
        </p>
      </div>
    </section>
  );
}
