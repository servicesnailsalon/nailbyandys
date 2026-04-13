import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border/50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight">Nails by Andy's</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Experience the finest nail care and artistry in Concord. 
              We are dedicated to providing a luxurious and hygienic 
              environment for all our clients.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#price" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-colors">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Manicure</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Pedicure</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Nail Art</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Gel & Acrylic</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Waxing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-background border border-border rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nails by Andy's. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
