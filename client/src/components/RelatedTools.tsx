import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const tools = [
  {
    name: "Color Code Converter",
    description: "Convert between HEX, RGB, HSL, and other color formats",
    href: "https://thecolorcodeconverter.com"
  },
  {
    name: "Color Palette Tester",
    description: "Preview your brand colors together and test combinations",
    href: "https://colorpalettetester.com"
  },
  {
    name: "Color Palette Generator",
    description: "Generate harmonious color palettes from a base color",
    href: "https://colorpalettegenerator.com"
  }
];

export default function RelatedTools() {
  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            More Free Color Tools
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for professional color work
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              data-testid={`related-tool-${index}`}
            >
              <Card className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{tool.name}</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
