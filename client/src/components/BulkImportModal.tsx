import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import chroma from "chroma-js";

interface BulkImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (colors: Array<{ color: string; name: string }>) => void;
}

interface ParsedColor {
  original: string;
  color: string | null;
  error?: string;
}

function parseColorInput(input: string): ParsedColor[] {
  const lines = input.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  
  return lines.map(line => {
    try {
      const cleanedColor = line.replace(/^['"]|['"]$/g, '');
      const color = chroma(cleanedColor);
      return {
        original: line,
        color: color.hex()
      };
    } catch (e) {
      return {
        original: line,
        color: null,
        error: "Invalid color format"
      };
    }
  });
}

export default function BulkImportModal({ open, onOpenChange, onImport }: BulkImportModalProps) {
  const [inputText, setInputText] = useState("");
  const parsedColors = parseColorInput(inputText);
  const validColors = parsedColors.filter(p => p.color !== null);
  const invalidColors = parsedColors.filter(p => p.color === null);

  const handleImport = () => {
    const colorsToImport = validColors.map((p, index) => ({
      color: p.color!,
      name: `Color ${index + 1}`
    }));
    
    onImport(colorsToImport);
    setInputText("");
    onOpenChange(false);
    console.log("Bulk import confirmed:", colorsToImport);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulk Import Colors</DialogTitle>
          <DialogDescription>
            Paste your colors as HEX, RGB, or HSL. Separate with commas or newlines.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="#FF6F61, rgb(100, 200, 150), hsl(200, 50%, 50%)&#10;#3B82F6&#10;rgb(239, 68, 68)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
            data-testid="textarea-bulk-import"
          />

          {parsedColors.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Preview ({validColors.length} valid, {invalidColors.length} invalid)</h4>
              
              <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto p-3 bg-muted/50 rounded-lg">
                {parsedColors.map((parsed, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                    data-testid={`preview-color-${index}`}
                  >
                    {parsed.color ? (
                      <>
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: parsed.color }}
                        />
                        <Badge variant="secondary" className="font-mono text-xs">
                          {parsed.color}
                        </Badge>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </>
                    ) : (
                      <>
                        <Badge variant="destructive" className="text-xs">
                          {parsed.original}
                        </Badge>
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-import">
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={validColors.length === 0}
            data-testid="button-confirm-import"
          >
            Import {validColors.length} Color{validColors.length !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
