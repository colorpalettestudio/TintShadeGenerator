import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTACard() {
  const handleCTAClick = () => {
    console.log("CTA click: fixer_cta_click");
    window.open("https://colorpalettefixer.com", "_blank");
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardContent className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-2">
              Want balanced brand colors next?
            </h3>
            <p className="text-muted-foreground">
              Try Color Palette Fixer — the fastest way to even out hue, saturation, and neutrals.
            </p>
          </div>
          
          <Button 
            size="lg" 
            onClick={handleCTAClick}
            data-testid="button-cta-fixer"
            className="flex-shrink-0"
          >
            Try Palette Fixer
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
