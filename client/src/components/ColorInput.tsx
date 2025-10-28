import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Trash2, Pipette, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ColorInputProps {
  onTestPalette: (colors: string[]) => void;
  onClear: () => void;
  currentColors: string[];
}

export default function ColorInput({ onTestPalette, onClear, currentColors = [] }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(currentColors.join(", "));
  const [singleColor, setSingleColor] = useState("");
  const { toast } = useToast();

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

  const handleAddSingleColor = () => {
    if (!singleColor.trim()) return;
    
    const currentColors = inputValue
      .split(/[,\n]+/)
      .map(c => c.trim())
      .filter(Boolean);
    
    currentColors.push(singleColor.trim());
    const newValue = currentColors.join(", ");
    setInputValue(newValue);
    setSingleColor("");
    onTestPalette(currentColors);
    console.log("Single color added:", singleColor);
  };

  const handleEyeDropper = async () => {
    if ("EyeDropper" in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        setSingleColor(result.sRGBHex);
        console.log("Eyedropper selected:", result.sRGBHex);
      } catch (e) {
        console.log("Eyedropper cancelled");
      }
    } else {
      toast({
        title: "Not supported",
        description: "Eyedropper is not supported in this browser.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="#FF6F61 or rgb(255,111,97)"
              value={singleColor}
              onChange={(e) => setSingleColor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSingleColor()}
              className="flex-1"
              data-testid="input-single-color"
            />
            {"EyeDropper" in window && (
              <Button
                size="icon"
                variant="outline"
                onClick={handleEyeDropper}
                data-testid="button-eyedropper"
                title="Pick color from screen"
              >
                <Pipette className="w-4 h-4" />
              </Button>
            )}
            <Button 
              onClick={handleAddSingleColor}
              data-testid="button-add-single-color"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Color
            </Button>
          </div>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">or</span>
          </div>
          
          <Textarea
            placeholder="Paste multiple colors (HEX, RGB, or HSL)&#10;#FF6F61, #6B5B95, #88B04B&#10;or one per line..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="min-h-[100px] font-mono text-sm resize-none"
            data-testid="textarea-color-input"
          />
        </div>
        
        <div className="flex gap-3 flex-wrap pt-2">
          <Button 
            onClick={handleTestPalette}
            size="lg"
            className="flex-1 min-w-[200px]"
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
            Try Sample
          </Button>
          
          <Button
            onClick={onClear}
            variant="outline"
            size="lg"
            data-testid="button-clear-palette"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </Card>
    </div>
  );
}
