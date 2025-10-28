import { Badge } from "@/components/ui/badge";

const formats = [
  { name: "HEX", example: "#RRGGBB" },
  { name: "RGB", example: "rgb(…)" },
  { name: "HSL", example: "hsl(…)" }
];

export default function SupportedFormats() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Supported Color Formats
        </h2>
        
        <p className="text-lg text-foreground leading-relaxed mb-6">
          Paste HEX (#RRGGBB), RGB (rgb(…)), or HSL (hsl(…)). Comma or newline separated. 
          We auto-clean and validate entries.
        </p>
        
        <div className="flex gap-3 flex-wrap">
          {formats.map((format) => (
            <Badge 
              key={format.name} 
              variant="secondary" 
              className="text-base px-4 py-2"
              data-testid={`format-${format.name.toLowerCase()}`}
            >
              {format.name} <span className="ml-2 font-mono text-sm">{format.example}</span>
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
