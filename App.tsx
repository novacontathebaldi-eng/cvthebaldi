import React, { useEffect } from 'react';
import { useUIStore } from './store';
import { Header, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Chatbot } from './components/Chatbot';
import { Cart } from './components/Cart';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import { Theme } from './types';

const App: React.FC = () => {
  const { theme } = useUIStore();

  // Setup Theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === Theme.SYSTEM) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
    } else {
        root.classList.add(theme);
    }
  }, [theme]);

  // Setup Lenis Smooth Scroll
  useEffect(() => {
    // Fix: Cast options to any to avoid strict type checking failures on build
    // properties like 'direction' changed to 'orientation' in newer versions
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical', 
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
    } as any);

    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
        lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen relative">
        <Header />
        
        <main>
            {/* Hero Section */}
            <Hero />

            {/* About Section (Snapshot) */}
            <section className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-[#1a1a1a] py-20 px-6">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img 
                            src="https://picsum.photos/seed/meeh/800/1000" 
                            alt="Melissa Pelussi" 
                            className="w-full h-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                    <motion.div 
                         initial={{ opacity: 0, x: 50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                         className="space-y-6"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-white">About the Artist</h2>
                        <div className="w-20 h-1 bg-accent" />
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Melissa Pelussi, known as "Meeh", is a Luxembourg-based contemporary artist whose work transcends traditional boundaries.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Her collections explore the raw emotions of abstract expressionism combined with the precision of modern digital art. Each piece is a unique journey into color and form.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Catalog Section */}
            <Catalog />

            {/* Newsletter Section */}
            <section className="py-24 bg-accent/10 dark:bg-black">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <h2 className="font-serif text-3xl mb-4 text-primary dark:text-white">Join the Collector's Circle</h2>
                    <p className="text-gray-500 mb-8">Subscribe to receive exclusive updates on new releases and exhibitions.</p>
                    <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 px-6 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:border-accent transition-colors dark:text-white"
                        />
                        <button className="px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary font-bold uppercase tracking-widest hover:bg-accent transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </main>

        <Footer />

        {/* Global Overlays */}
        <Cart />
        <Chatbot />
    </div>
  );
};

export default App;