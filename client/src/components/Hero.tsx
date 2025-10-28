import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Hero() {
  return (
    <section className="w-full pt-12 md:pt-16 pb-4 md:pb-6 px-6 md:px-8 relative">
      {/* Theme toggle in top right */}
      <div className="absolute top-4 right-4 md:top-6 md:right-8">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <Badge 
          variant="secondary" 
          className="mb-6 px-6 py-2 text-sm font-medium uppercase tracking-wide bg-muted/80"
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
