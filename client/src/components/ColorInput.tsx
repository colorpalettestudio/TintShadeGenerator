import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chroma from "chroma-js";

interface ColorInputProps {
  onTestPalette: (colors: string[]) => void;
  onClear: () => void;
  currentColors: string[];
}

export default function ColorInput({ onTestPalette, onClear, currentColors = [] }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(currentColors.join(", "));
  const [previewColors, setPreviewColors] = useState<string[]>([]);
  const { toast } = useToast();

  // Update preview colors when input changes
  useEffect(() => {
    const colors = inputValue
      .split(/[,\n]+/)
      .map(c => c.trim())
      .filter(Boolean);
    
    const validColors: string[] = [];
    colors.forEach(color => {
      try {
        const validColor = chroma(color).hex();
        validColors.push(validColor);
      } catch (e) {
        // Skip invalid colors
      }
    });
    
    setPreviewColors(validColors);
  }, [inputValue]);

  const handleTestPalette = () => {
    const colors = inputValue
      .split(/[,\n]+/)
      .map(c => c.trim())
      .filter(Boolean);
    
    if (colors.length > 0) {
      onTestPalette(colors);
      console.log("Test palette clicked:", colors);
    }
  };

  const handleTrySample = () => {
    const sampleColors = "#f91d71, #fd806a, #ffd025, #74d551, #76c4f4, #7c70ff";
    setInputValue(sampleColors);
    onTestPalette(sampleColors.split(", "));
    console.log("Try sample palette clicked");
  };

  const handleClear = () => {
    setInputValue("");
    setPreviewColors([]);
    onClear();
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="p-6 space-y-4">
        {/* Color swatches preview */}
        {previewColors.length > 0 && (
          <div className="flex gap-3 flex-wrap pb-2">
            {previewColors.map((color, index) => (
              <div
                key={index}
                className="w-14 h-14 rounded-lg border-2 border-border"
                style={{ backgroundColor: color }}
                title={color}
                data-testid={`swatch-preview-${index}`}
              />
            ))}
          </div>
        )}

        {/* Textarea for color input */}
        <Textarea
          placeholder="Enter colors separated by commas or line breaks&#10;#f91d71, #fd806a, #ffd025, #74d551, #76c4f4, #7c70ff"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="min-h-[120px] font-mono text-sm resize-none"
          data-testid="textarea-color-input"
        />
        
        {/* Action buttons */}
        <div className="flex gap-3 flex-wrap pt-2">
          <Button 
            onClick={handleTestPalette}
            size="lg"
            className="flex-1 min-w-[200px] bg-foreground text-background hover:bg-foreground/90"
            data-testid="button-test-palette"
          >
            Test Palette
          </Button>
          
          <Button
            onClick={handleTrySample}
            variant="outline"
            size="lg"
            data-testid="button-try-sample"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Try Sample Palette
          </Button>
          
          <Button
            onClick={handleClear}
            variant="outline"
            size="icon"
            className="h-11 w-11"
            data-testid="button-clear-palette"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
