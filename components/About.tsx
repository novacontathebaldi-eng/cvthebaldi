import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax suave para a imagem
  const yImage = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const opacityText = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-32 bg-light dark:bg-[#1a1a1a] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-200/50 dark:from-black/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
            
            {/* Image Side - Fixed layout to prevent border overlap issues */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:block">
                {/* Container relativo para segurar imagem e borda */}
                <div className="relative w-full max-w-md mx-auto lg:ml-0">
                    
                    {/* Borda Decorativa - Agora atrás da imagem e alinhada */}
                    <div className="absolute top-4 -right-4 w-full h-full border border-accent/30 rounded-sm z-0" />

                    {/* Container da Imagem */}
                    <motion.div 
                        style={{ y: yImage }}
                        className="relative z-10 overflow-hidden rounded-sm shadow-2xl aspect-[3/4] bg-gray-200 dark:bg-gray-800"
                    >
                        <img 
                            src="https://picsum.photos/seed/meeh_portrait/800/1200" 
                            alt="Melissa Pelussi Portrait" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                        />
                    </motion.div>
                    
                    {/* Glassmorphism Badge - Posicionado absolutamente sobre a imagem */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-8 -left-4 lg:-left-8 bg-white/10 backdrop-blur-[20px] border border-white/20 p-6 rounded-sm shadow-xl max-w-[240px] z-20"
                    >
                        <p className="text-accent font-serif italic text-lg leading-tight">"Art is the silence of thought."</p>
                    </motion.div>
                </div>
            </div>

            {/* Text Side - Scroll Reveal */}
            <motion.div 
                style={{ opacity: opacityText }}
                className="w-full lg:w-1/2 space-y-8"
            >
                <motion.h2 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-5xl lg:text-7xl text-primary dark:text-white leading-none"
                >
                    Beyond <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#F8D568] italic pr-2">
                        The Canvas
                    </span>
                </motion.h2>

                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-24 h-[2px] bg-accent" 
                />

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-light"
                >
                    Melissa Pelussi, known as "Meeh", is a Luxembourg-based contemporary artist whose work transcends traditional boundaries. Her collections explore the raw emotions of abstract expressionism combined with the precision of modern digital art.
                </motion.p>

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-light"
                >
                    Each piece is a unique journey into color and form, designed not just to be seen, but to be felt. From Luxembourg to the world, her art invites you to pause and reflect.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <img 
                        src="https://picsum.photos/seed/signature/200/80" 
                        alt="Signature" 
                        className="h-16 opacity-60 dark:invert" 
                    />
                </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};