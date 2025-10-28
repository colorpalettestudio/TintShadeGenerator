export default function HowToUse() {
  return (
    <section className="w-full py-16 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground text-background text-xl font-bold mb-2">
              1
            </div>
            <h3 className="font-bold text-lg">Paste your brand colors</h3>
            <p className="text-muted-foreground text-sm">
              Enter HEX, RGB, or HSL — one per line or comma-separated.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground text-background text-xl font-bold mb-2">
              2
            </div>
            <h3 className="font-bold text-lg">Click "Generate Tints and Shades"</h3>
            <p className="text-muted-foreground text-sm">
              We calculate smooth tints (lighter) and shades (darker) for each color.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground text-background text-xl font-bold mb-2">
              3
            </div>
            <h3 className="font-bold text-lg">Copy the codes you need</h3>
            <p className="text-muted-foreground text-sm">
              Click any swatch to copy, or export the whole palette to PNG or CSV.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
