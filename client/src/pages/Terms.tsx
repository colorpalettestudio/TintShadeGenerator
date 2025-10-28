import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-foreground leading-relaxed">
              By accessing and using Tint & Shade Generator, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="text-foreground leading-relaxed">
              This tool is provided free of charge for personal and commercial use. You may use the generated 
              color palettes in any project without attribution, though it's always appreciated.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-foreground leading-relaxed">
              The materials on Tint & Shade Generator are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, 
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p className="text-foreground leading-relaxed">
              In no event shall The Color Palette Studio or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on this site.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p className="text-foreground leading-relaxed">
              We may revise these terms of service at any time without notice. By using this website you are 
              agreeing to be bound by the then current version of these terms of service.
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
