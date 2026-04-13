/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingSystem';
import { LoyaltyProgram } from './components/LoyaltyProgram';
import { ScrollToTop } from './components/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        <Navbar onBookClick={() => setIsBookingOpen(true)} />
        <main>
          <Hero onBookClick={() => setIsBookingOpen(true)} />
          <Services />
          <Pricing />
          <About />
          <LoyaltyProgram />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
        <Toaster position="top-center" />
      </div>
    </AuthProvider>
  );
}
