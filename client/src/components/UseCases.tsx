import { Card, CardContent } from "@/components/ui/card";

const useCases = [
  {
    title: "UI Components",
    description: "Create hover, active, and disabled states for buttons, links, and interactive elements",
    emoji: "🎨"
  },
  {
    title: "Backgrounds & Borders",
    description: "Generate subtle variations for cards, containers, and dividers that look intentional",
    emoji: "📐"
  },
  {
    title: "Text Hierarchy",
    description: "Build readable color scales for headers, body text, and secondary information",
    emoji: "✍️"
  },
  {
    title: "Style Guides",
    description: "Document your brand colors with ready-to-copy codes for your entire team",
    emoji: "📋"
  }
];

export default function UseCases() {
  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Common Use Cases
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From prototypes to production-ready designs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="hover-elevate" data-testid={`use-case-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{useCase.emoji}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
