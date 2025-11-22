import React, { useEffect } from 'react';
import { useUIStore, useThemeStore } from './store';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Chatbot } from './components/Chatbot';
import { Cart } from './components/Cart';
import { Newsletter } from './components/Newsletter';
import { motion } from 'framer-motion';
import { Theme } from './types';

const App: React.FC = () => {
  // CORREÇÃO: Usando useThemeStore para o tema
  const { theme } = useThemeStore();

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
            <Newsletter />
        </main>

        <Footer />

        {/* Global Overlays */}
        <Cart />
        <Chatbot />
    </div>
  );
};

export default App;