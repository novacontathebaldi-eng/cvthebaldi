import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "10px"]);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-gray-900">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y, scale, filter: `blur(${blur})` }}
      >
        <img 
            src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/8faf1f51-ea46-4fff-a971-7c27a89fb94a.png" 
            alt="Art Background" 
            className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-primary/20" />
      </motion.div>

      {/* Content - Force Visible Initial State */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-6 drop-shadow-lg font-bold">
                {t('hero.subtitle')}
            </h2>
        </motion.div>
        
        <motion.h1 
            className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-10 font-bold tracking-tight drop-shadow-xl"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {t('hero.title')}
        </motion.h1>

        <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
        >
            <button
                className="px-10 py-4 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 uppercase tracking-[0.2em] text-xs md:text-sm font-bold rounded-sm backdrop-blur-sm"
                onClick={() => {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                {t('hero.cta')}
            </button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] tracking-widest uppercase opacity-80">{t('hero.scroll')}</span>
        <motion.div 
            className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};