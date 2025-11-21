import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // Parallax & Blur Effects based on scroll position
  const y = useTransform(scrollY, [0, 1000], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const blur = useTransform(scrollY, [0, 400], ["0px", "15px"]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  // Text Split Animation Variants
  const sentence: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.08,
      },
    },
  };

  const letter: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const titleText = "MELISSA PELUSSI";

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-black">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y, scale, filter: blur }}
      >
        {/* Abstract Luxury Art Background */}
        <img 
            src="https://picsum.photos/seed/art_luxury/1920/1080" 
            alt="Art Background" 
            className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-primary/90" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 flex flex-col items-center"
        style={{ opacity, y: textY }}
      >
        {/* Logo / Monogram */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 w-20 h-20 border border-accent/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5"
        >
             <span className="font-serif text-3xl text-accent">M</span>
        </motion.div>

        {/* Split Text Title */}
        <motion.h1 
            className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-6 font-bold tracking-tighter overflow-hidden"
            variants={sentence}
            initial="hidden"
            animate="visible"
        >
            {titleText.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter} className="inline-block min-w-[1rem]">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.h1>

        {/* Subtitle with subtle reveal */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
        >
            <h2 className="text-gray-300 text-sm md:text-lg tracking-[0.4em] uppercase font-light">
                {t('hero.subtitle')}
            </h2>
            <div className="w-12 h-[1px] bg-accent mx-auto mt-6" />
        </motion.div>

      </motion.div>
      
      {/* Scroll Indicator (Existing preserved) */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-widest uppercase">{t('hero.scroll')}</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-accent to-transparent" />
      </motion.div>
    </div>
  );
};