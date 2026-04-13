import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Booking', href: '#booking' },
  { name: 'Price', href: '#price' },
  { name: 'About Us', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const { user, signIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight">Nails by Andy's</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.name === 'Booking' ? '#' : item.href}
              onClick={item.name === 'Booking' ? (e) => { e.preventDefault(); onBookClick(); } : undefined}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium hidden lg:block">{user.displayName}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={logout} className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" onClick={signIn} className="rounded-full px-6">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
          
          <Button size="sm" className="rounded-full px-6" onClick={onBookClick}>
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b md:hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.name === 'Booking' ? '#' : item.href}
                  className="text-lg font-medium py-2 border-b border-border/50"
                  onClick={(e) => { 
                    setIsMobileMenuOpen(false);
                    if (item.name === 'Booking') {
                      e.preventDefault();
                      onBookClick();
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
              <Button className="w-full mt-2 rounded-full" onClick={() => { setIsMobileMenuOpen(false); onBookClick(); }}>Book Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
