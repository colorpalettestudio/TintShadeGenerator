import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are tints and shades?",
    answer: "Tints are lighter versions of a color created by adding white. Shades are darker versions created by adding black. Designers use them to create depth and hierarchy without switching palettes."
  },
  {
    question: "How many steps should I use?",
    answer: "Most brands rely on 2–4 tints and 2–4 shades for consistent UI states."
  },
  {
    question: "Why do some of my colors look muddy as shades?",
    answer: "Saturation compresses near black—try adjusting hue slightly, or use Palette Fixer."
  },
  {
    question: "What color formats are supported?",
    answer: "You can paste HEX (#FF6F61), RGB (rgb(255, 111, 97)), or HSL (hsl(6, 93%, 71%)) values. Mix and match formats—we'll handle the conversion automatically."
  },
  {
    question: "How are tints and shades calculated?",
    answer: "Tints are created by mixing your base color with white at specific percentages (25%, 50%, 75%, 95%). Shades mix with black at the same percentages. This creates predictable, evenly-spaced color variations."
  },
  {
    question: "Can I use these colors commercially?",
    answer: "Absolutely! There are no restrictions. Use the generated colors in any personal or commercial project without attribution."
  },
  {
    question: "How do I share my palette with my team?",
    answer: "Export your palette as PNG for presentations, PDF for print, or CSV for developer handoff. You can also copy individual swatches or entire rows."
  }
];

export default function FAQ() {
  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-8 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border rounded-lg px-6 bg-background"
              data-testid={`faq-${index}`}
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
