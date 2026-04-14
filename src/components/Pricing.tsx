import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pricingCategories = [
  {
    name: 'Manicure',
    items: [
      { name: 'Classic Manicure', price: '$30+' },
      { name: 'Gel Manicure', price: '$40' },
      { name: 'Signature Spa Manicure', price: '$55' },
      { name: 'Polish Change', price: '$15' },
    ],
  },
  {
    name: 'Pedicure',
    items: [
      { name: 'Classic Pedicure', price: '$40' },
      { name: 'Gel Pedicure', price: '$50' },
      { name: 'Deluxe Spa Pedicure', price: '$70' },
      { name: 'Foot Massage (15 min)', price: '$20' },
    ],
  },
  {
    name: 'Enhancements',
    items: [
      { name: 'Full Set Acrylic', price: '$60+' },
      { name: 'Acrylic Fill', price: '$45+' },
      { name: 'Dipping Powder', price: '$50' },
      { name: 'Nail Repair', price: '$5+' },
    ],
  },
];

export function Pricing() {
  return (
    <section id="price" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-2">Fair & Transparent</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold">Service Menu</h3>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {pricingCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border/50 shadow-xl"
            >
              <h4 className="text-2xl font-heading font-bold mb-8 text-primary border-b border-primary/20 pb-4">
                {category.name}
              </h4>
              <ul className="space-y-6">
                {category.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      <span className="font-medium text-foreground/90">{item.name}</span>
                    </div>
                    <span className="font-bold text-primary">{item.price}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-10 rounded-full" variant="outline">
                Book This Category
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center text-muted-foreground italic">
          * Prices may vary based on length, shape, and complexity of nail art.
        </div>
      </div>
    </section>
  );
}
