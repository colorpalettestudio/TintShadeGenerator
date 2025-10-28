import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-foreground leading-relaxed">
              Welcome to Tint & Shade Generator. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we handle your information when you use our service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
            <p className="text-foreground leading-relaxed">
              Our tool operates entirely in your browser. We do not collect, store, or transmit any color data you enter. 
              All color generation and manipulation happens locally on your device.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <p className="text-foreground leading-relaxed">
              We may use analytics tools to understand how visitors use our site. This data is aggregated and anonymous, 
              helping us improve the user experience.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="text-foreground leading-relaxed">
              We may use cookies to improve your browsing experience and remember your preferences. 
              You can control cookie settings through your browser.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-foreground leading-relaxed">
              If you have any questions about this privacy policy, please contact us through our contact page.
            </p>
          </section>
          
          <p className="text-sm text-muted-foreground mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
