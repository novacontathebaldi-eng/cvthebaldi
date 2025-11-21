import React, { useEffect, useState } from 'react';
import { ShoppingBag, User, Search, Menu, X, Globe, Sun, Moon, Monitor } from 'lucide-react';
import { useUIStore, useCartStore, useAuthStore } from '../store';
import { Theme, Language } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';

// --- Header ---
export const Header: React.FC = () => {
  const { isCartOpen, toggleCart, isMobileMenuOpen, toggleMobileMenu, toggleSearch } = useUIStore();
  const { items } = useCartStore();
  const { user, login, logout } = useAuthStore();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? 'bg-primary/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center z-50 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-3">
                <span className="font-serif font-bold text-white text-xl">M</span>
            </div>
            <span className={`font-serif text-2xl font-bold tracking-tighter ${scrolled ? 'text-white' : 'text-white mix-blend-difference'}`}>
                MELISSA PELUSSI
            </span>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <button onClick={toggleSearch} className="hover:text-accent transition-colors"><Search size={20} /></button>
          
          <div className="relative group">
            <button className="hover:text-accent transition-colors flex items-center gap-2">
               <User size={20} />
               {mounted && user && <span className="text-xs">{user.displayName.split(' ')[0]}</span>}
            </button>
             <div className="absolute right-0 mt-2 w-48 bg-primary border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                {mounted && user ? (
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 rounded">{t('nav.logout')}</button>
                ) : (
                    <button onClick={login} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 rounded">{t('nav.login')}</button>
                )}
             </div>
          </div>

          <button onClick={toggleCart} className="relative hover:text-accent transition-colors">
            <ShoppingBag size={20} />
            {mounted && items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {items.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white z-50" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.header>
  );
};

// --- Footer ---
export const Footer: React.FC = () => {
  const { theme, setTheme } = useUIStore();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: Language.FR, flag: '🇫🇷', label: 'FR' },
    { code: Language.EN, flag: '🇬🇧', label: 'EN' },
    { code: Language.DE, flag: '🇩🇪', label: 'DE' },
    { code: Language.PT, flag: '🇵🇹', label: 'PT' },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-accent">Melissa Pelussi</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-500">{t('footer.links')}</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">{t('nav.catalog')}</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">{t('nav.about')}</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-500">{t('footer.legal')}</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-500">{t('footer.settings')}</h4>
            
            {/* Modern Language Selector */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/5 p-1.5 rounded-full border border-white/10 flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Globe size={16} />
                 </div>
                 <div className="flex items-center gap-1 pr-1">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={`
                                h-8 px-3 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2
                                ${language === lang.code 
                                    ? 'bg-accent text-white shadow-lg transform scale-105' 
                                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                }
                            `}
                        >
                            <span className="text-base">{lang.flag}</span>
                            <span className="uppercase tracking-wider">{lang.label}</span>
                        </button>
                    ))}
                 </div>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="flex gap-2 bg-white/5 p-1 rounded-lg inline-flex border border-white/10">
                {mounted && [Theme.LIGHT, Theme.DARK, Theme.SYSTEM].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`p-2 rounded transition-colors ${theme === t ? 'bg-accent text-white shadow-md' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                        {t === Theme.LIGHT && <Sun size={16} />}
                        {t === Theme.DARK && <Moon size={16} />}
                        {t === Theme.SYSTEM && <Monitor size={16} />}
                    </button>
                ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2025 Melissa Pelussi. {t('footer.rights')}</p>
          <p>Designed by THEBALDI</p>
        </div>
      </div>
    </footer>
  );
};