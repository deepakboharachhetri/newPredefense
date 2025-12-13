import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "API Docs", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Status", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-medium text-footer-foreground">PreDefense</span>
            </a>
            <p className="text-sm text-footer-foreground/60 mb-6 max-w-xs">
              Protecting the future. Next-generation proactive cybersecurity for modern teams.
            </p>
            
            {/* Newsletter */}
            <div>
              <p className="text-sm font-medium text-footer-foreground mb-3">
                Subscribe to security updates
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-2 bg-footer-foreground/5 border border-footer-foreground/10 rounded-lg text-sm text-footer-foreground placeholder:text-footer-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button variant="hero" size="default" className="rounded-lg">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-footer-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-foreground/60 hover:text-footer-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-footer-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-foreground/60 hover:text-footer-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-footer-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-foreground/60 hover:text-footer-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-footer-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-footer-foreground/40">
            © {new Date().getFullYear()} PreDefense. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-footer-foreground/40 hover:text-footer-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-footer-foreground/40 hover:text-footer-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
