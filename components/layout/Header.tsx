import React, { useEffect, useState } from 'react';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useUIStore, useCartStore, useAuthStore } from '../../store';
import { useLanguage } from '../../hooks/useLanguage';

export const Header: React.FC = () => {
  const { isCartOpen, toggleCart, isMobileMenuOpen, toggleMobileMenu, toggleSearch } = useUIStore();
  const { items } = useCartStore();
  const { user, login, logout } = useAuthStore();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-[#0a0a0a]/95 backdrop-blur-lg border-white/5 py-3 shadow-2xl' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center z-50 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center mr-3 shadow-lg group-hover:scale-105 transition-transform">
                <span className="font-serif font-bold text-xl">M</span>
            </div>
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-white drop-shadow-md">
                MELISSA PELUSSI
            </span>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-8 text-white">
          <button onClick={toggleSearch} className="hover:text-accent transition-colors drop-shadow-sm p-2" aria-label={t('common.search')}>
            <Search size={20} />
          </button>
          
          <div className="relative group">
            <button className="hover:text-accent transition-colors flex items-center gap-2 drop-shadow-sm p-2">
               <User size={20} />
               {mounted && user && <span className="text-xs font-medium opacity-80">{user.displayName.split(' ')[0]}</span>}
            </button>
             <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 transform translate-y-2 group-hover:translate-y-0">
                {mounted && user ? (
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded">{t('nav.logout')}</button>
                ) : (
                    <button onClick={login} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded">{t('nav.login')}</button>
                )}
             </div>
          </div>

          <button onClick={toggleCart} className="relative hover:text-accent transition-colors drop-shadow-sm p-2" aria-label={t('cart.title')}>
            <ShoppingBag size={20} />
            {mounted && items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm ring-2 ring-black">
                {items.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white z-50 drop-shadow-md p-2" onClick={toggleMobileMenu} aria-label="Menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};