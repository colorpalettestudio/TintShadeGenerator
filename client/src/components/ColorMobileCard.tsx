import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chroma from "chroma-js";

interface ColorMobileCardProps {
  id: string;
  color: string;
  name: string;
  onRemove: (id: string) => void;
  tintSteps: number[];
}

interface ColorSwatch {
  color: string;
  label: string;
}

function generateTintsAndShades(baseColor: string, steps: number[]): ColorSwatch[] {
  const swatches: ColorSwatch[] = [];
  
  try {
    const base = chroma(baseColor);
    
    steps.forEach(step => {
      if (step === 0) {
        swatches.push({ color: base.hex(), label: 'Base' });
      } else if (step > 0) {
        const tintColor = chroma.mix(base, '#ffffff', step / 100, 'rgb');
        swatches.push({ color: tintColor.hex(), label: `+${step}%` });
      } else {
        const absStep = Math.abs(step);
        const shadeColor = chroma.mix(base, '#000000', absStep / 100, 'rgb');
        swatches.push({ color: shadeColor.hex(), label: `−${absStep}%` });
      }
    });
  } catch (error) {
    console.error("Error generating tints/shades:", error);
  }
  
  return swatches;
}

export default function ColorMobileCard({ id, color, name, onRemove, tintSteps }: ColorMobileCardProps) {
  const { toast } = useToast();
  const swatches = generateTintsAndShades(color, tintSteps);

  const copyAllSwatches = () => {
    const allColors = swatches.map(s => s.color.toUpperCase()).join(', ');
    navigator.clipboard.writeText(allColors);
    toast({ description: "All colors copied!" });
  };

  return (
    <Card className="overflow-hidden" data-testid={`mobile-card-${id}`}>
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 bg-muted/30">
        <div className="flex-1">
          <h3 className="font-semibold text-base font-mono">{color.toUpperCase()}</h3>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onRemove(id)}
          className="h-8 w-8 flex-shrink-0"
          data-testid={`button-remove-mobile-${id}`}
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Color swatches grid - 3 columns */}
        <div className="grid grid-cols-3 gap-0">
          {swatches.map((swatch, index) => (
            <button
              key={`${id}-${index}`}
              onClick={() => {
                navigator.clipboard.writeText(swatch.color.toUpperCase());
                toast({ description: "Copied!" });
              }}
              className="relative h-24 hover-elevate active-elevate-2 cursor-pointer group border-r border-b last:border-r-0"
              style={{ backgroundColor: swatch.color }}
              data-testid={`mobile-swatch-${id}-${index}`}
              title={swatch.color.toUpperCase()}
            >
              {/* Label always visible on mobile */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <span className="text-xs font-medium text-white drop-shadow-lg mb-1 font-mono">
                  {swatch.color.toUpperCase()}
                </span>
                <span className="text-xs font-medium text-white/90 drop-shadow-lg">
                  {swatch.label}
                </span>
              </div>
              
              {/* Darker overlay on press */}
              <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
        
        {/* Copy all button */}
        <div className="p-3 border-t bg-muted/10">
          <Button
            variant="outline"
            size="sm"
            onClick={copyAllSwatches}
            className="w-full"
            data-testid={`button-copy-all-mobile-${id}`}
          >
            <Copy className="w-3 h-3 mr-2" />
            Copy All Colors
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
