import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, Shuffle, Copy, Trash2 } from "lucide-react";
import ColorInput from "./ColorInput";
import ColorColumn from "./ColorColumn";
import BulkImportModal from "./BulkImportModal";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import chroma from "chroma-js";

interface Color {
  id: string;
  color: string;
  name: string;
}

//todo: remove mock functionality
const EXAMPLE_COLORS = [
  { color: "#FF6F61", name: "Coral Red" },
  { color: "#6B5B95", name: "Royal Purple" },
  { color: "#88B04B", name: "Greenery" }
];

export default function ColorGrid() {
  //todo: remove mock functionality
  const [colors, setColors] = useState<Color[]>(
    EXAMPLE_COLORS.map((c, i) => ({ ...c, id: `color-${i}` }))
  );
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const { toast } = useToast();

  const addColor = (colorValue: string, name?: string) => {
    try {
      const validColor = chroma(colorValue).hex();
      const newColor: Color = {
        id: `color-${Date.now()}`,
        color: validColor,
        name: name || `Color ${colors.length + 1}`
      };
      
      if (colors.length >= 8) {
        toast({
          title: "Maximum colors reached",
          description: "You can add up to 8 colors at a time.",
          variant: "destructive"
        });
        return;
      }
      
      setColors([...colors, newColor]);
      console.log("tintshade_generate event");
    } catch (e) {
      toast({
        title: "Invalid color",
        description: "Please enter a valid HEX, RGB, or HSL color.",
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

  const handleBulkImport = (importedColors: Array<{ color: string; name: string }>) => {
    const limitedColors = importedColors.slice(0, 8);
    const newColors = limitedColors.map((c, i) => ({
      id: `color-${Date.now()}-${i}`,
      ...c
    }));
    
    setColors(newColors);
    console.log("bulk_import_confirm event");
    toast({ description: `Imported ${newColors.length} colors!` });
  };

  const shuffleExamples = () => {
    const shuffled = EXAMPLE_COLORS.sort(() => Math.random() - 0.5).slice(0, 3);
    setColors(shuffled.map((c, i) => ({ ...c, id: `color-${Date.now()}-${i}` })));
    console.log("Shuffle examples triggered");
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
    const gridElement = document.getElementById("color-grid");
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
    const gridElement = document.getElementById("color-grid");
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
    const rows = ["Column,Step,HEX"];
    colors.forEach(color => {
      const swatches = generateAllSwatches(color.color);
      swatches.forEach(swatch => {
        rows.push(`${color.name},${swatch.label},${swatch.color}`);
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

  const clearAll = () => {
    setColors([]);
  };

  return (
    <section className="w-full py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 space-y-4">
          <ColorInput onAddColor={addColor} />
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setBulkImportOpen(true);
                console.log("bulk_import_open event");
              }}
              data-testid="button-bulk-import"
            >
              <Upload className="w-4 h-4 mr-2" />
              Bulk Import
            </Button>
            
            <Button
              variant="outline"
              onClick={shuffleExamples}
              data-testid="button-shuffle"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle Example Colors
            </Button>
            
            <div className="flex-1" />
            
            <Button
              variant="outline"
              onClick={copyAllComma}
              disabled={colors.length === 0}
              data-testid="button-copy-all-comma"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy All (Comma)
            </Button>
            
            <Button
              variant="outline"
              onClick={copyAllLines}
              disabled={colors.length === 0}
              data-testid="button-copy-all-lines"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy All (Line by Line)
            </Button>
            
            <Button
              variant="outline"
              onClick={exportPNG}
              disabled={colors.length === 0}
              data-testid="button-export-png"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PNG
            </Button>
            
            <Button
              variant="outline"
              onClick={exportPDF}
              disabled={colors.length === 0}
              data-testid="button-export-pdf"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            
            <Button
              variant="outline"
              onClick={exportCSV}
              disabled={colors.length === 0}
              data-testid="button-export-csv"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            
            <Button
              variant="outline"
              onClick={clearAll}
              disabled={colors.length === 0}
              data-testid="button-clear-all"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {colors.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-2">No colors added yet</p>
            <p className="text-sm text-muted-foreground">Add a color above to get started</p>
          </div>
        ) : (
          <div
            id="color-grid"
            className="overflow-x-auto pb-4"
            data-testid="color-grid"
          >
            <div className="flex gap-6 min-w-min">
              {colors.map(color => (
                <ColorColumn
                  key={color.id}
                  id={color.id}
                  color={color.color}
                  name={color.name}
                  onRemove={removeColor}
                  onRename={renameColor}
                />
              ))}
            </div>
          </div>
        )}

        <BulkImportModal
          open={bulkImportOpen}
          onOpenChange={setBulkImportOpen}
          onImport={handleBulkImport}
        />
      </div>
    </section>
  );
}

// Helper function for CSV export
function generateAllSwatches(baseColor: string) {
  const swatches: Array<{ color: string; label: string }> = [];
  
  try {
    const base = chroma(baseColor);
    const [l, c, h] = base.oklch();
    
    for (let i = 5; i >= 1; i--) {
      const step = i * 10;
      const newL = Math.min(1, l + (step / 100));
      try {
        const tintColor = chroma.oklch(newL, Math.max(0, c * 0.9), h);
        swatches.push({ color: tintColor.hex().toUpperCase(), label: `+${step}%` });
      } catch (e) {
        const fallback = chroma.mix(baseColor, '#ffffff', step / 100);
        swatches.push({ color: fallback.hex().toUpperCase(), label: `+${step}%` });
      }
    }
    
    swatches.push({ color: base.hex().toUpperCase(), label: 'Base' });
    
    for (let i = 1; i <= 5; i++) {
      const step = i * 10;
      const newL = Math.max(0, l - (step / 100));
      try {
        const shadeColor = chroma.oklch(newL, Math.max(0, c * 0.9), h);
        swatches.push({ color: shadeColor.hex().toUpperCase(), label: `−${step}%` });
      } catch (e) {
        const fallback = chroma.mix(baseColor, '#000000', step / 100);
        swatches.push({ color: fallback.hex().toUpperCase(), label: `−${step}%` });
      }
    }
  } catch (error) {
    console.error("Error generating swatches:", error);
  }
  
  return swatches;
}
