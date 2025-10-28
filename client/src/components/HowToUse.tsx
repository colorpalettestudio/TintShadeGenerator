export default function HowToUse() {
  return (
    <section className="w-full py-12 px-6 md:px-8 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          How to Use This
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-muted-foreground mb-3">1️⃣</div>
            <p className="font-semibold">Paste your brand colors</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-muted-foreground mb-3">2️⃣</div>
            <p className="font-semibold">Click "Generate Tints and Shades"</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-muted-foreground mb-3">3️⃣</div>
            <p className="font-semibold">Copy the codes you need for text, backgrounds, hover states, and more</p>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t">
          <p className="text-muted-foreground mb-2">
            Want to see if your text meets accessibility standards?
          </p>
          <p className="text-foreground">
            → Try{" "}
            <a 
              href="https://www.colorpalettetester.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-primary transition-colors"
              data-testid="link-color-palette-tester"
            >
              Color Palette Tester
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
