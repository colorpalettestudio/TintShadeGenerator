import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chroma from "chroma-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ColorInputProps {
  onTestPalette: (colors: string[]) => void;
  onClear: () => void;
  currentColors: string[];
}

export default function ColorInput({ onTestPalette, onClear, currentColors = [] }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(currentColors.join(", "));
  const [previewColors, setPreviewColors] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newColor, setNewColor] = useState("");
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

  const handleAddColor = () => {
    if (!newColor.trim()) return;
    
    try {
      const validColor = chroma(newColor.trim()).hex();
      const currentColors = inputValue
        .split(/[,\n]+/)
        .map(c => c.trim())
        .filter(Boolean);
      
      currentColors.push(validColor);
      const newValue = currentColors.join(", ");
      setInputValue(newValue);
      onTestPalette(currentColors);
      setNewColor("");
      setShowAddDialog(false);
      toast({ description: "Color added!" });
    } catch (e) {
      toast({
        title: "Invalid color",
        description: "Please enter a valid HEX, RGB, or HSL color.",
        variant: "destructive"
      });
    }
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
            Generate Tints and Shades
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
            onClick={() => setShowAddDialog(true)}
            variant="outline"
            size="icon"
            className="h-11 w-11"
            data-testid="button-add-color"
          >
            <Plus className="w-4 h-4" />
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

      {/* Add Color Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Color</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="text"
              placeholder="#FF6F61 or rgb(255,111,97)"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddColor()}
              className="font-mono"
              data-testid="input-add-color"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddDialog(false);
                setNewColor("");
              }}
              data-testid="button-cancel-add-color"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddColor}
              data-testid="button-confirm-add-color"
            >
              Add Color
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
