import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chroma from "chroma-js";

interface ColorTableRowProps {
  id: string;
  color: string;
  name: string;
  onRemove: (id: string) => void;
  onRename: (id: string, newName: string) => void;
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
        // Base color
        swatches.push({
          color: base.hex(),
          label: 'Base'
        });
      } else if (step > 0) {
        // Tint: mix base color with white at the given percentage
        // step% white mixed with (100-step)% base
        const tintColor = chroma.mix(base, '#ffffff', step / 100, 'rgb');
        swatches.push({
          color: tintColor.hex(),
          label: `+${step}%`
        });
      } else {
        // Shade: mix base color with black at the given percentage
        // abs(step)% black mixed with (100-abs(step))% base
        const absStep = Math.abs(step);
        const shadeColor = chroma.mix(base, '#000000', absStep / 100, 'rgb');
        swatches.push({
          color: shadeColor.hex(),
          label: `−${absStep}%`
        });
      }
    });
  } catch (error) {
    console.error("Error generating tints/shades:", error);
  }
  
  return swatches;
}

export default function ColorTableRow({ id, color, name, onRemove, onRename, tintSteps }: ColorTableRowProps) {
  const { toast } = useToast();
  
  const swatches = generateTintsAndShades(color, tintSteps);

  const copyRow = () => {
    const allColors = swatches.map(s => s.color.toUpperCase()).join(', ');
    navigator.clipboard.writeText(allColors);
    toast({ description: "Row copied!" });
    console.log("copy_row event:", allColors);
  };

  return (
    <div className="flex items-center gap-2 border-b hover-elevate" data-testid={`row-${id}`}>
      <div className="w-48 flex-shrink-0 p-3 flex items-center gap-2 border-r bg-background">
        <div className="flex-1">
          <div className="font-semibold text-base font-mono text-foreground" data-testid={`text-row-color-${id}`}>
            {color.toUpperCase()}
          </div>
        </div>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onRemove(id)}
          className="h-7 w-7 flex-shrink-0"
          data-testid={`button-remove-row-${id}`}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="flex-1 flex overflow-x-auto">
        {swatches.map((swatch, index) => (
          <button
            key={`${id}-${index}`}
            onClick={() => {
              navigator.clipboard.writeText(swatch.color.toUpperCase());
              toast({ description: "Copied!" });
            }}
            className="flex-1 min-w-[80px] h-16 hover-elevate active-elevate-2 cursor-pointer group relative"
            style={{ backgroundColor: swatch.color }}
            data-testid={`swatch-${id}-${index}`}
            title={swatch.color.toUpperCase()}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-medium text-white font-mono">
                {swatch.color.toUpperCase()}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="w-32 flex-shrink-0 p-2 border-l">
        <Button
          variant="outline"
          size="sm"
          onClick={copyRow}
          className="w-full"
          data-testid={`button-copy-row-${id}`}
        >
          <Copy className="w-3 h-3 mr-1" />
          Copy Row
        </Button>
      </div>
    </div>
  );
}
