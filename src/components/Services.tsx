import { motion } from 'motion/react';
import { Sparkles, Heart, ShieldCheck, Zap } from 'lucide-react';

const services = [
  {
    title: 'Manicure',
    description: 'Expert shaping, cuticle care, and premium polish for flawless hands.',
    icon: Sparkles,
  },
  {
    title: 'Pedicure',
    description: 'Relaxing soak, exfoliation, and massage for rejuvenated feet.',
    icon: Heart,
  },
  {
    title: 'Nail Art',
    description: 'Custom designs from minimalist elegance to bold statements.',
    icon: Zap,
  },
  {
    title: 'Gel & Acrylic',
    description: 'Long-lasting, durable enhancements with a natural finish.',
    icon: ShieldCheck,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-2">What We Offer</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold">Our Services</h3>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">{service.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
