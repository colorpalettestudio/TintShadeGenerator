import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2 } from "lucide-react";

interface ColorInputProps {
  onTestPalette: (colors: string[]) => void;
  onClear: () => void;
  currentColors: string[];
}

export default function ColorInput({ onTestPalette, onClear, currentColors = [] }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(currentColors.join(", "));

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

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <Textarea
        placeholder="Paste your colors here (HEX, RGB, or HSL)&#10;#FF6F61, #6B5B95, #88B04B&#10;or one per line..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="min-h-[120px] font-mono text-sm"
        data-testid="textarea-color-input"
      />
      
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
