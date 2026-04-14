import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/5WnEgnyhNkt1v0mNCLAbXn3yCGHDGPFmmkwEXfK_Zj__1Ga-HBzxfJtCRgx-btRmdFHNBRtEnPSTeu1_-Q=s360-w360-h360"
                alt="Salon Interior"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0" />
            
            <div className="absolute bottom-8 -right-8 bg-card border border-border p-6 rounded-2xl shadow-xl z-20 hidden md:block max-w-[200px]">
              <p className="text-3xl font-bold text-primary mb-1">10+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-2">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8">Nail by Andy's</h3>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                Founded with a passion for beauty and a commitment to hygiene, Nail by Andy's has 
                become the premier destination for nail care in Concord. We believe that your 
                nails are an extension of your personality, and we treat every service as a 
                work of art.
              </p>
              <p>
                Our team of highly skilled technicians stays ahead of the latest trends and 
                techniques to provide you with a service that is not only beautiful but also 
                healthy for your natural nails.
              </p>
              <p>
                Step into our sanctuary of calm and let us pamper you with premium products, 
                meticulous attention to detail, and a warm, welcoming atmosphere.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-xl font-bold mb-2">Premium Products</h4>
                <p className="text-sm text-muted-foreground">We use only the highest quality, non-toxic polishes and treatments.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Expert Artists</h4>
                <p className="text-sm text-muted-foreground">Our technicians are certified professionals with years of experience.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
