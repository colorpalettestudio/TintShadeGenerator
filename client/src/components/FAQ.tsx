import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How many colors can I add?",
    answer: "Add 3–8 colors at a time. You can drag to reorder and remove any column."
  },
  {
    question: "Can I rename columns?",
    answer: "Yes — click the column title to edit the name."
  },
  {
    question: "How are the tints and shades calculated?",
    answer: "We use perceptual color models (OKLCH/LCH or a close fallback) to keep hue steady and steps even, then clamp values safely."
  },
  {
    question: "Can I export the chart?",
    answer: "Yes — export PNG/PDF for presentations or CSV for dev handoff."
  }
];

export default function FAQ() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
