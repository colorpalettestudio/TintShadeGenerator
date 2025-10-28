import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, X, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chroma from "chroma-js";

interface ColorColumnProps {
  id: string;
  color: string;
  name: string;
  onRemove: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}

interface ColorSwatch {
  color: string;
  label: string;
  step: string;
}

function generateTintsAndShades(baseColor: string): ColorSwatch[] {
  const swatches: ColorSwatch[] = [];
  
  try {
    const base = chroma(baseColor);
    const [l, c, h] = base.oklch();
    
    // Generate tints (+10% to +50%)
    for (let i = 5; i >= 1; i--) {
      const step = i * 10;
      const newL = Math.min(1, l + (step / 100));
      try {
        const tintColor = chroma.oklch(newL, Math.max(0, c * 0.9), h);
        swatches.push({
          color: tintColor.hex(),
          label: `+${step}%`,
          step: `tint-${step}`
        });
      } catch (e) {
        const fallback = chroma.mix(baseColor, '#ffffff', step / 100);
        swatches.push({
          color: fallback.hex(),
          label: `+${step}%`,
          step: `tint-${step}`
        });
      }
    }
    
    // Base color
    swatches.push({
      color: base.hex(),
      label: 'Base',
      step: 'base'
    });
    
    // Generate shades (-10% to -50%)
    for (let i = 1; i <= 5; i++) {
      const step = i * 10;
      const newL = Math.max(0, l - (step / 100));
      try {
        const shadeColor = chroma.oklch(newL, Math.max(0, c * 0.9), h);
        swatches.push({
          color: shadeColor.hex(),
          label: `−${step}%`,
          step: `shade-${step}`
        });
      } catch (e) {
        const fallback = chroma.mix(baseColor, '#000000', step / 100);
        swatches.push({
          color: fallback.hex(),
          label: `−${step}%`,
          step: `shade-${step}`
        });
      }
    }
  } catch (error) {
    console.error("Error generating tints/shades:", error);
  }
  
  return swatches;
}

export default function ColorColumn({ id, color, name, onRemove, onRename }: ColorColumnProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const { toast } = useToast();
  
  const swatches = generateTintsAndShades(color);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: message });
    console.log("Copied:", text);
  };

  const handleCopyColumn = () => {
    const allColors = swatches.map(s => s.color).join('\n');
    copyToClipboard(allColors, "Column copied!");
  };

  const handleNameSubmit = () => {
    if (editedName.trim()) {
      onRename(id, editedName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <Card className="min-w-[200px] w-[200px] flex-shrink-0">
      <CardHeader className="p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="cursor-grab active:cursor-grabbing h-6 w-6"
            data-testid={`button-drag-${id}`}
          >
            <GripVertical className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove(id)}
            className="h-6 w-6"
            data-testid={`button-remove-${id}`}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {isEditingName ? (
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
            autoFocus
            className="h-8 text-sm"
            data-testid={`input-rename-${id}`}
          />
        ) : (
          <h3
            className="text-lg font-semibold cursor-pointer hover-elevate rounded px-2 py-1 -mx-2"
            onClick={() => setIsEditingName(true)}
            data-testid={`text-column-name-${id}`}
          >
            {name}
          </h3>
        )}
        
        <p className="text-sm text-muted-foreground font-mono" data-testid={`text-base-color-${id}`}>
          {color.toUpperCase()}
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col">
          {swatches.map((swatch, index) => (
            <button
              key={`${id}-${swatch.step}`}
              onClick={() => copyToClipboard(swatch.color.toUpperCase(), "Copied!")}
              className="relative h-16 hover-elevate active-elevate-2 cursor-pointer group border-t first:border-t-0"
              style={{ backgroundColor: swatch.color }}
              data-testid={`swatch-${id}-${swatch.step}`}
            >
              <div className="absolute inset-0 flex items-center justify-between px-3 py-1.5 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium text-white font-mono">
                  {swatch.color.toUpperCase()}
                </span>
                <span className="text-xs font-medium text-white">
                  {swatch.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyColumn}
          className="w-full"
          data-testid={`button-copy-column-${id}`}
        >
          <Copy className="w-3 h-3 mr-2" />
          Copy Column
        </Button>
      </CardFooter>
    </Card>
  );
}
