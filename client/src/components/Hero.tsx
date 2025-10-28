import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Badge 
          variant="outline" 
          className="mb-6 px-4 py-1.5 text-sm font-medium uppercase tracking-wide"
          data-testid="badge-hero"
        >
          Free, Instant & No Sign-Up
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Build Perfect{" "}
          <span 
            className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-rainbow-gradient"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Tints & Shades
          </span>{" "}
          for Your Brand
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Add your brand colors—get smooth, designer-friendly tints and shades in one click. 
          Copy any swatch, a whole column, or everything at once.
        </p>
      </div>
    </section>
  );
}
