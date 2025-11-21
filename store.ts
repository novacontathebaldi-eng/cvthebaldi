import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, Language, CartItem, Product, User } from './types';

// --- Theme & UI Store ---
interface UIState {
  theme: Theme;
  language: Language;
  isCartOpen: boolean;
  isChatOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: Language) => void;
  toggleCart: () => void;
  toggleChat: () => void;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  closeAllOverlays: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: Theme.DARK,
      language: Language.FR,
      isCartOpen: false,
      isChatOpen: false,
      isSearchOpen: false,
      isMobileMenuOpen: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen, isChatOpen: false, isSearchOpen: false })),
      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen, isCartOpen: false, isSearchOpen: false })),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeAllOverlays: () => set({ isCartOpen: false, isChatOpen: false, isSearchOpen: false, isMobileMenuOpen: false }),
    }),
    { name: 'ui-storage', partialize: (state) => ({ theme: state.theme, language: state.language }) }
  )
);

// --- Cart Store ---
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set((state) => {
        const existing = state.items.find((i) => i.id === product.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map((i) => {
          if (i.id === id) {
            const newQty = Math.max(1, i.quantity + delta);
            return { ...i, quantity: newQty };
          }
          return i;
        })
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    }),
    { name: 'cart-storage' }
  )
);

// --- Auth Store (Simulated for Demo) ---
interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: () => void; // Simulate login
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({
        user: {
          uid: 'demo-123',
          email: 'demo@pelussi.com',
          displayName: 'Demo User',
          role: 'user',
          photoURL: 'https://picsum.photos/100/100'
        },
        isLoading: false
      });
    }, 1500);
  },
  logout: () => set({ user: null }),
}));
