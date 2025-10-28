import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTACard() {
  const handleCTAClick = () => {
    console.log("CTA click: fixer_cta_click");
    window.open("https://colorpalettefixer.com", "_blank");
  };

  return (
    <Card className="border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary mb-3">
              Related Tool
            </div>
            <h3 className="text-xl font-bold mb-2">
              Need consistent brand colors?
            </h3>
            <p className="text-muted-foreground text-sm">
              Use Color Palette Fixer to balance hue and saturation across your entire palette.
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
