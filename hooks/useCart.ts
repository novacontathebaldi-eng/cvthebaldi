import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount } = useCartStore();
  const { toggleCart, isCartOpen } = useUIStore();

  const addToCart = (product: any) => {
    addItem(product);
    if (!isCartOpen) toggleCart();
  };

  return {
    items,
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,
    total: total(),
    itemCount: itemCount(),
    isOpen: isCartOpen,
    toggleCart
  };
};
