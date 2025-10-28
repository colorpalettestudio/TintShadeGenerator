import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    const sampleColors = "#FF6F61, #6B5B95, #88B04B, #F7CAC9, #92A8D1, #955251";
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
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="flex gap-2 flex-wrap items-end">
        <div className="flex-1 min-w-[250px] space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Add a single color</label>
          <div className="flex gap-2">
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
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -top-6 left-0 text-sm font-medium text-muted-foreground">
          Or paste multiple colors
        </div>
        <Textarea
          placeholder="Paste your colors here (HEX, RGB, or HSL)&#10;#FF6F61, #6B5B95, #88B04B&#10;or one per line..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="min-h-[120px] font-mono text-sm"
          data-testid="textarea-color-input"
        />
      </div>
      
      <div className="flex gap-3 flex-wrap">
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
          Try Sample Palette
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
    </div>
  );
}
