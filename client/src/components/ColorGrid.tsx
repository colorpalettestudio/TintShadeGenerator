import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy, FileText, Image, File } from "lucide-react";
import ColorInput from "./ColorInput";
import ColorTableRow from "./ColorTableRow";
import ColorMobileCard from "./ColorMobileCard";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import chroma from "chroma-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

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
  
  // Undo/Redo state management
  const historyRef = useRef<Color[][]>([]);
  const historyIndexRef = useRef<number>(-1);
  const isUndoRedoRef = useRef<boolean>(false);

  // Save current state to history
  const saveToHistory = useCallback((currentColors: Color[]) => {
    if (isUndoRedoRef.current) return; // Don't save if we're doing undo/redo
    
    // Remove any future history if we're not at the end
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    }
    
    // Add current state to history
    historyRef.current.push(JSON.parse(JSON.stringify(currentColors)));
    historyIndexRef.current = historyRef.current.length - 1;
    
    // Limit history to 50 states
    if (historyRef.current.length > 50) {
      historyRef.current.shift();
      historyIndexRef.current--;
    }
  }, []);

  // Undo function
  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      isUndoRedoRef.current = true;
      historyIndexRef.current--;
      const previousState = historyRef.current[historyIndexRef.current];
      setColors(JSON.parse(JSON.stringify(previousState)));
      toast({ description: "Undone" });
      setTimeout(() => {
        isUndoRedoRef.current = false;
      }, 0);
    }
  }, [toast]);

  // Redo function
  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      isUndoRedoRef.current = true;
      historyIndexRef.current++;
      const nextState = historyRef.current[historyIndexRef.current];
      setColors(JSON.parse(JSON.stringify(nextState)));
      toast({ description: "Redone" });
      setTimeout(() => {
        isUndoRedoRef.current = false;
      }, 0);
    }
  }, [toast]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      
      if (cmdOrCtrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (cmdOrCtrl && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Auto-load sample palette on mount
  useEffect(() => {
    const sampleColors = ["#f91d71", "#fd806a", "#ffd025", "#74d551", "#76c4f4", "#7c70ff"];
    const validColors: Color[] = [];
    
    sampleColors.forEach((colorInput, index) => {
      try {
        const validColor = chroma(colorInput.trim()).hex();
        validColors.push({
          id: `color-${Date.now()}-${index}`,
          color: validColor,
          name: validColor.toUpperCase()
        });
      } catch (e) {
        console.log("Invalid color skipped:", colorInput);
      }
    });
    
    if (validColors.length > 0) {
      setColors(validColors);
      // Initialize history with the first state
      historyRef.current = [JSON.parse(JSON.stringify(validColors))];
      historyIndexRef.current = 0;
    }
  }, []);

  // Save to history whenever colors change (but not during undo/redo)
  useEffect(() => {
    if (!isUndoRedoRef.current && colors.length > 0) {
      saveToHistory(colors);
    }
  }, [colors, saveToHistory]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setColors((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleTestPalette = (colorInputs: string[]) => {
    const validColors: Color[] = [];
    
    colorInputs.forEach((colorInput, index) => {
      try {
        const validColor = chroma(colorInput.trim()).hex();
        validColors.push({
          id: `color-${Date.now()}-${index}`,
          color: validColor,
          name: validColor.toUpperCase()
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
    toast({ description: "All codes copied (comma-separated)!" });
    console.log("copy_all event (comma)");
  };

  const copyAllLines = () => {
    const allColors = colors.flatMap(c => 
      generateAllSwatches(c.color).map(s => s.color)
    ).join('\n');
    navigator.clipboard.writeText(allColors);
    toast({ description: "All codes copied (line-separated)!" });
    console.log("copy_all event (lines)");
  };

  const copyStudioCode = () => {
    const colorData = colors.map(c => ({
      hex: c.color.toLowerCase(),
      name: ""
    }));
    
    const studioCode = `studiocode?dataStyleName=null&numColorNamePairs=${colors.length}&colorNames=${encodeURIComponent(JSON.stringify(colorData))}&colorCombinationCheckboxes=${encodeURIComponent(JSON.stringify(new Array(16).fill(false)))}&selectedCombinations=${encodeURIComponent(JSON.stringify([]))}`;
    
    navigator.clipboard.writeText(studioCode);
    toast({ description: "Studio Code copied to clipboard!" });
    console.log("copy_studio_code event");
  };

  const exportPNG = async () => {
    const gridElement = document.getElementById("export-view");
    if (!gridElement) return;
    
    try {
      const canvas = await html2canvas(gridElement, { 
        backgroundColor: "#ffffff",
        scale: 2
      });
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
    const gridElement = document.getElementById("export-view");
    if (!gridElement) return;
    
    try {
      const canvas = await html2canvas(gridElement, { 
        backgroundColor: "#ffffff",
        scale: 2
      });
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
    const rows = ["Color,Step,HEX"];
    colors.forEach(color => {
      const swatches = generateAllSwatches(color.color);
      swatches.forEach(swatch => {
        rows.push(`${color.color.toUpperCase()},${swatch.label},${swatch.color}`);
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
    <section className="w-full pt-4 pb-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ColorInput 
          onTestPalette={handleTestPalette}
          onClear={clearPalette}
          currentColors={colors.map(c => c.color)}
        />

        {colors.length > 0 && (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-export-menu"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={copyAllComma} data-testid="menu-copy-all-comma">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All (Comma)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={copyAllLines} data-testid="menu-copy-all-lines">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All (Lines)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={copyStudioCode} data-testid="menu-copy-studio-code">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Studio Code
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={exportPNG} data-testid="menu-export-png">
                  <Image className="w-4 h-4 mr-2" />
                  Download PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportPDF} data-testid="menu-export-pdf">
                  <File className="w-4 h-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportCSV} data-testid="menu-export-csv">
                  <FileText className="w-4 h-4 mr-2" />
                  Download CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {colors.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-1">Add colors above to generate tints and shades</p>
            <p className="text-sm text-muted-foreground">Try the sample palette to see it in action</p>
          </div>
        ) : (
          <>
            {/* Mobile card view */}
            <div className="md:hidden space-y-4">
              {colors.map(color => (
                <ColorMobileCard
                  key={color.id}
                  id={color.id}
                  color={color.color}
                  name={color.name}
                  onRemove={removeColor}
                  tintSteps={TINT_STEPS}
                />
              ))}
            </div>

            {/* Desktop table view */}
            <div className="hidden md:block border rounded-lg overflow-x-auto" id="color-table" data-testid="color-table">
              <div className="min-w-[800px]">
                {/* Category labels row */}
                <div className="flex items-center gap-2 border-b bg-muted/30">
                  <div className="w-32 md:w-48 flex-shrink-0 border-r"></div>
                  
                  <div className="flex-1 flex">
                    {/* Tints section */}
                    <div className="flex-[4] flex items-center justify-center py-2 border-r">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Tints (Lighter)
                      </span>
                    </div>
                    
                    {/* Base section */}
                    <div className="flex-[1] flex items-center justify-center py-2 border-r">
                      <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                        Base
                      </span>
                    </div>
                    
                    {/* Shades section */}
                    <div className="flex-[4] flex items-center justify-center py-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Shades (Darker)
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-24 md:w-32 flex-shrink-0 border-l"></div>
                </div>

                {/* Percentage labels row */}
                <div className="flex items-center gap-2 border-b bg-muted/50">
                  <div className="w-32 md:w-48 flex-shrink-0 p-2 md:p-3 border-r">
                    <div className="font-semibold text-xs md:text-sm">Base Color</div>
                  </div>
                  
                  <div className="flex-1 flex">
                    {TINT_STEPS.map((step, index) => (
                      <div
                        key={index}
                        className="flex-1 min-w-[70px] md:min-w-[80px] p-2 text-center"
                      >
                        <div className="text-xs font-medium text-muted-foreground">
                          {step === 0 ? 'Base' : step > 0 ? `+${step}%` : `−${Math.abs(step)}%`}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="w-24 md:w-32 flex-shrink-0 p-2 md:p-3 border-l">
                    <div className="text-xs font-medium text-muted-foreground hidden md:block">Actions</div>
                  </div>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={colors.map(c => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
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
                  </SortableContext>
                </DndContext>
              </div>
            </div>

            {/* Export-only view (hidden) */}
            <div 
              id="export-view" 
              style={{ position: 'absolute', left: '-9999px', backgroundColor: '#ffffff' }}
            >
              <div style={{ padding: '40px', backgroundColor: '#ffffff' }}>
                <h1 style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  marginBottom: '8px',
                  color: '#000000',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Tint and Shade Palette
                </h1>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666666',
                  marginBottom: '32px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Generated with Tint & Shade Generator
                </p>
                
                {colors.map((color, colorIndex) => {
                  const swatches = generateAllSwatches(color.color);
                  return (
                    <div key={colorIndex} style={{ marginBottom: '32px' }}>
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#000000',
                        fontFamily: 'monospace'
                      }}>
                        {color.color.toUpperCase()}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        {swatches.map((swatch, swatchIndex) => (
                          <div key={swatchIndex} style={{ flex: 1 }}>
                            <div 
                              style={{ 
                                backgroundColor: swatch.color,
                                height: '80px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px'
                              }}
                            />
                            <div style={{ 
                              fontSize: '11px',
                              textAlign: 'center',
                              marginTop: '4px',
                              fontFamily: 'monospace',
                              color: '#000000'
                            }}>
                              {swatch.color.toUpperCase()}
                            </div>
                            <div style={{ 
                              fontSize: '10px',
                              textAlign: 'center',
                              color: '#666666',
                              fontFamily: 'system-ui, sans-serif'
                            }}>
                              {swatch.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
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
