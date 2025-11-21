import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "London, UK",
    text: "The abstract piece I purchased transformed my living room entirely. The depth of color is mesmerizing.",
    rating: 5
  },
  {
    id: 2,
    name: "Jean-Pierre Dubois",
    location: "Paris, FR",
    text: "Une livraison rapide et une œuvre encore plus belle en vrai. L'attention aux détails est sublime.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Müller",
    location: "Berlin, DE",
    text: "Meeh's digital art collection is truly forward-thinking. A perfect addition to my modern office.",
    rating: 5
  },
  {
    id: 4,
    name: "Marc Weber",
    location: "Luxembourg, LU",
    text: "Proud to support local talent. The texture work on the canvas is incredible.",
    rating: 5
  },
  {
    id: 5,
    name: "Sofia Costa",
    location: "Lisbon, PT",
    text: "A arte chegou impecável. As cores vibram de uma forma que fotos não conseguem capturar.",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-[#151515] overflow-hidden relative">
        
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl text-primary dark:text-white mb-4"
        >
            Collector's Voices
        </motion.h2>
        <p className="text-gray-500 uppercase tracking-widest text-sm">Trusted by art lovers worldwide</p>
      </div>

      {/* Gradient Masks for smooth fade out on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#151515] to-transparent z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#151515] to-transparent z-20" />

      <div className="flex">
        <motion.div 
          className="flex gap-8 pl-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30 
          }}
        >
          {/* Double the array to create infinite loop effect */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
            <div 
                key={`${item.id}-${idx}`}
                className="w-[400px] flex-shrink-0 relative group"
            >
                <div className="bg-gray-50 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 p-8 rounded-sm h-full transition-all duration-300 hover:bg-white hover:shadow-2xl dark:hover:bg-white/10">
                    <Quote className="text-accent/20 absolute top-6 right-6 w-12 h-12" />
                    
                    <div className="flex gap-1 mb-6">
                        {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} size={16} className="fill-accent text-accent" />
                        ))}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 italic mb-8 leading-relaxed font-light">
                        "{item.text}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-serif font-bold text-sm">
                            {item.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-primary dark:text-white text-sm">{item.name}</h4>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{item.location}</span>
                        </div>
                    </div>
                </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};