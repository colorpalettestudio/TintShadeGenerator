const relatedTools = [
  { name: "Color Palette Fixer", href: "https://colorpalettefixer.com" }
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Tint & Shade Generator</h3>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by{" "}
              <a 
                href="https://thecolorpalettestudio.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors hover-elevate rounded px-1 -mx-1"
                data-testid="link-color-palette-studio"
              >
                The Color Palette Studio
              </a>
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Related Tools</h4>
            <ul className="space-y-2">
              {relatedTools.map((tool) => (
                <li key={tool.name}>
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-1 py-0.5 -mx-1"
                    data-testid={`link-tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://thecolorpalettestudio.com/policies/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-1 py-0.5 -mx-1"
                  data-testid="link-privacy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://thecolorpalettestudio.com/policies/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-1 py-0.5 -mx-1"
                  data-testid="link-terms"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://thecolorpalettestudio.com/pages/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-1 py-0.5 -mx-1"
                  data-testid="link-contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Color Palette Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
