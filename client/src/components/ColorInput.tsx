import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pipette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ColorInputProps {
  onAddColor: (color: string, name?: string) => void;
}

export default function ColorInput({ onAddColor }: ColorInputProps) {
  const [colorValue, setColorValue] = useState("");
  const { toast } = useToast();

  const handleAddColor = () => {
    if (!colorValue.trim()) return;
    
    onAddColor(colorValue.trim());
    setColorValue("");
    console.log("Add color triggered:", colorValue);
  };

  const handleEyeDropper = async () => {
    if ("EyeDropper" in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        setColorValue(result.sRGBHex);
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
    <div className="flex gap-2 flex-wrap">
      <div className="flex gap-2 flex-1 min-w-[200px]">
        <Input
          type="text"
          placeholder="#FF6F61 or rgb(255,111,97)"
          value={colorValue}
          onChange={(e) => setColorValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddColor()}
          className="flex-1"
          data-testid="input-color"
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
      </div>
      <Button onClick={handleAddColor} data-testid="button-add-color">
        Add Color
      </Button>
    </div>
  );
}
