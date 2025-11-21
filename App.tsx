import React, { useEffect } from 'react';
import { useThemeStore } from './store';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Chatbot } from './components/Chatbot';
import { Cart } from './components/Cart';
import { Theme } from './types';

const App: React.FC = () => {
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
    <div className="min-h-screen relative bg-light dark:bg-[#121212]">
        <Header />
        
        <main>
            <Hero />
            <About />
            <Catalog />
            <Testimonials />
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