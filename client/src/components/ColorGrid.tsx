import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import ColorInput from "./ColorInput";
import ColorTableRow from "./ColorTableRow";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import chroma from "chroma-js";

interface Color {
  id: string;
  color: string;
  name: string;
}

// Updated to 25%, 50%, 75%, 95% for tints and shades
const TINT_STEPS = [95, 75, 50, 25, 0, -25, -50, -75, -95];

export default function ColorGrid() {
  const [colors, setColors] = useState<Color[]>([]);
  const { toast } = useToast();

  const handleTestPalette = (colorInputs: string[]) => {
    const validColors: Color[] = [];
    
    colorInputs.forEach((colorInput, index) => {
      try {
        const validColor = chroma(colorInput.trim()).hex();
        validColors.push({
          id: `color-${Date.now()}-${index}`,
          color: validColor,
          name: `Color ${index + 1}`
        });
      } catch (e) {
        console.log("Invalid color skipped:", colorInput);
      }
    });
    
    if (validColors.length > 0) {
      setColors(validColors);
      console.log("tintshade_generate event");
      toast({ 
        description: `Generated tints & shades for ${validColors.length} color${validColors.length !== 1 ? 's' : ''}!` 
      });
    } else {
      toast({
        title: "No valid colors",
        description: "Please enter valid HEX, RGB, or HSL colors.",
        variant: "destructive"
      });
    }
  };

  const removeColor = (id: string) => {
    setColors(colors.filter(c => c.id !== id));
  };

  const renameColor = (id: string, newName: string) => {
    setColors(colors.map(c => c.id === id ? { ...c, name: newName } : c));
  };

  const clearPalette = () => {
    setColors([]);
  };

  const copyAllComma = () => {
    const allColors = colors.flatMap(c => 
      generateAllSwatches(c.color).map(s => s.color)
    ).join(', ');
    navigator.clipboard.writeText(allColors);
    toast({ description: "All codes copied!" });
    console.log("copy_all event (comma)");
  };

  const copyAllLines = () => {
    const allColors = colors.flatMap(c => 
      generateAllSwatches(c.color).map(s => s.color)
    ).join('\n');
    navigator.clipboard.writeText(allColors);
    toast({ description: "All codes copied!" });
    console.log("copy_all event (lines)");
  };

  const exportPNG = async () => {
    const gridElement = document.getElementById("color-table");
    if (!gridElement) return;
    
    try {
      const canvas = await html2canvas(gridElement, { backgroundColor: "#ffffff" });
      const link = document.createElement("a");
      link.download = "tint-shade-palette.png";
      link.href = canvas.toDataURL();
      link.click();
      console.log("export_png event");
      toast({ description: "PNG exported!" });
    } catch (e) {
      toast({ title: "Export failed", description: "Could not export PNG", variant: "destructive" });
    }
  };

  const exportPDF = async () => {
    const gridElement = document.getElementById("color-table");
    if (!gridElement) return;
    
    try {
      const canvas = await html2canvas(gridElement, { backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("tint-shade-palette.pdf");
      console.log("export_pdf event");
      toast({ description: "PDF exported!" });
    } catch (e) {
      toast({ title: "Export failed", description: "Could not export PDF", variant: "destructive" });
    }
  };

  const exportCSV = () => {
    const rows = ["Color Name,Base Color,Step,HEX"];
    colors.forEach(color => {
      const swatches = generateAllSwatches(color.color);
      swatches.forEach(swatch => {
        rows.push(`${color.name},${color.color},${swatch.label},${swatch.color}`);
      });
    });
    
    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tint-shade-palette.csv';
    link.click();
    console.log("export_csv event");
    toast({ description: "CSV exported!" });
  };

  return (
    <section className="w-full py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ColorInput 
          onTestPalette={handleTestPalette}
          onClear={clearPalette}
          currentColors={colors.map(c => c.color)}
        />

        {colors.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              variant="outline"
              onClick={copyAllComma}
              data-testid="button-copy-all-comma"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy All (Comma)
            </Button>
            
            <Button
              variant="outline"
              onClick={copyAllLines}
              data-testid="button-copy-all-lines"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy All (Lines)
            </Button>
            
            <Button
              variant="outline"
              onClick={exportPNG}
              data-testid="button-export-png"
            >
              <Download className="w-4 h-4 mr-2" />
              PNG
            </Button>
            
            <Button
              variant="outline"
              onClick={exportPDF}
              data-testid="button-export-pdf"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            
            <Button
              variant="outline"
              onClick={exportCSV}
              data-testid="button-export-csv"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
          </div>
        )}

        {colors.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-1">Add colors above to generate tints and shades</p>
            <p className="text-sm text-muted-foreground">Try the sample palette to see it in action</p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden" id="color-table" data-testid="color-table">
            <div className="flex items-center gap-2 border-b bg-muted/50">
              <div className="w-48 flex-shrink-0 p-3 border-r">
                <div className="font-semibold text-sm">Color Name</div>
              </div>
              
              <div className="flex-1 flex overflow-x-auto">
                {TINT_STEPS.map((step, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-[80px] p-2 text-center"
                  >
                    <div className="text-xs font-medium text-muted-foreground">
                      {step === 0 ? 'Base' : step > 0 ? `+${step}%` : `−${Math.abs(step)}%`}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="w-32 flex-shrink-0 p-3 border-l">
                <div className="text-xs font-medium text-muted-foreground">Actions</div>
              </div>
            </div>

            {colors.map(color => (
              <ColorTableRow
                key={color.id}
                id={color.id}
                color={color.color}
                name={color.name}
                onRemove={removeColor}
                onRename={renameColor}
                tintSteps={TINT_STEPS}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Helper function for CSV export - uses simple mixing approach
function generateAllSwatches(baseColor: string) {
  const swatches: Array<{ color: string; label: string }> = [];
  
  try {
    const base = chroma(baseColor);
    
    TINT_STEPS.forEach(step => {
      if (step === 0) {
        swatches.push({ color: base.hex().toUpperCase(), label: 'Base' });
      } else if (step > 0) {
        // Tint: mix with white
        const tintColor = chroma.mix(base, '#ffffff', step / 100, 'rgb');
        swatches.push({ color: tintColor.hex().toUpperCase(), label: `+${step}%` });
      } else {
        // Shade: mix with black
        const absStep = Math.abs(step);
        const shadeColor = chroma.mix(base, '#000000', absStep / 100, 'rgb');
        swatches.push({ color: shadeColor.hex().toUpperCase(), label: `−${absStep}%` });
      }
    });
  } catch (error) {
    console.error("Error generating swatches:", error);
  }
  
  return swatches;
}
