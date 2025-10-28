export default function TintsShadesExplainer() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-8 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          What's the Difference Between Tints and Shades?
        </h2>
        
        <p className="text-lg text-foreground leading-relaxed">
          <span className="font-semibold">Tints</span> are lighter versions of a color (more lightness), 
          while <span className="font-semibold">shades</span> are darker versions (less lightness). 
          We generate perceptually even steps so each jump feels consistent.
        </p>
      </div>
    </section>
  );
}
