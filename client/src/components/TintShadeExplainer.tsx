export default function TintShadeExplainer() {
  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          What Are Tints and Shades?
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Tints are lighter versions of a color created by adding white. Shades are darker versions created by adding black. Designers use them to create depth and hierarchy without switching palettes.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tints Example */}
          <div className="space-y-4">
            <div className="rounded-lg border overflow-hidden bg-card">
              <div className="p-8 bg-[#4169E1] text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Tints (Lighter)</h3>
                <p className="text-sm opacity-90">Base Color + White</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2 flex-1">
                    <div className="w-12 h-12 rounded border-2 border-border bg-[#4169E1]" title="Base Color"></div>
                    <div className="flex items-center text-xl">+</div>
                    <div className="w-12 h-12 rounded border-2 border-border bg-white" title="White"></div>
                  </div>
                  <div className="flex items-center text-xl">=</div>
                  <div className="w-12 h-12 rounded border-2 border-border bg-[#8FA8EC]" title="Tint"></div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#4169E1' }} title="#4169E1"></div>
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#6B84E7' }} title="25% White"></div>
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#8FA8EC' }} title="50% White"></div>
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#B4C7F1' }} title="75% White"></div>
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#D9E5F8' }} title="95% White"></div>
                </div>
                <p className="text-sm text-muted-foreground text-center pt-2">
                  Perfect for light backgrounds and subtle accents
                </p>
              </div>
            </div>
          </div>

          {/* Shades Example */}
          <div className="space-y-4">
            <div className="rounded-lg border overflow-hidden bg-card">
              <div className="p-8 bg-[#4169E1] text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Shades (Darker)</h3>
                <p className="text-sm opacity-90">Base Color + Black</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2 flex-1">
                    <div className="w-12 h-12 rounded border-2 border-border bg-[#4169E1]" title="Base Color"></div>
                    <div className="flex items-center text-xl">+</div>
                    <div className="w-12 h-12 rounded border-2 border-border bg-black" title="Black"></div>
                  </div>
                  <div className="flex items-center text-xl">=</div>
                  <div className="w-12 h-12 rounded border-2 border-border bg-[#314FA9]" title="Shade"></div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#4169E1' }} title="#4169E1"></div>
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#314FA9' }} title="25% Black"></div>
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#203571' }} title="50% Black"></div>
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#101A38' }} title="75% Black"></div>
                  <div className="flex-1 h-16 rounded" style={{ backgroundColor: '#030712' }} title="95% Black"></div>
                </div>
                <p className="text-sm text-muted-foreground text-center pt-2">
                  Great for hover states and text on light backgrounds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
