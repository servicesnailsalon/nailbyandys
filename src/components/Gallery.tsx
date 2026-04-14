import { motion } from 'motion/react';

const images = [
  'https://lh3.googleusercontent.com/Q5GKV4IimqGXSCDO_7h2l_akSEojLHckmalJy4OJHIArsEAspElnBbPtEYSTI4fo942r9EbMx3oyRI75NQ=s360-w360-h360',
  'https://lh3.googleusercontent.com/8dwaGmy0Pdr8eSiL9pbtqVXvP1USrcJXsrnkfLhOqvGHNqKLlf2AvcgBNsV_zkelJ1jS2qdJqTBGtzIeYw=s360-w360-h360',
  'https://lh3.googleusercontent.com/3OJBVps8F6SUyzl9bY3shDqeqMu8Tbdc-sEyNluebYdui8ktTzCw1w1Z3fZtQOX3fDqUZT_PXj5Bw7C1Bg=s360-w360-h360',
  'https://lh3.googleusercontent.com/bir7RXz8UTmIwP3bOnFbAzakafPpk-wY4v83Ckroe8wdDlEvUeSKac8eHlO-BRiKXLYQ26l7N5HrTNCj0A=s360-w360-h360',
  'https://lh3.googleusercontent.com/NTapZGiYSv41mJfYH2or4K1lY7tmuIEo2tSScibsxSmF7d-d2UM49b-NvJB_vnULly4GdxyW_o4IWq2BNg=s360-w360-h360',
  'https://lh3.googleusercontent.com/UtT5Kc0BIXprJpCV7qIezH41Gn-ANO9YB5vEABxyU_vjyjZjPiuxWfvnmQB7u4dgbb97tCf-GLVJVrkIug=s360-w360-h360',
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-2">Our Masterpieces</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold">Gallery</h3>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer"
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <span className="text-2xl">+</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
