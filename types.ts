export enum Language {
  FR = 'fr',
  EN = 'en',
  DE = 'de',
  PT = 'pt'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export enum ProductCategory {
  ALL = 'all',
  PAINTINGS = 'paintings',
  JEWELRY = 'jewelry',
  DIGITAL = 'digital',
  PRINTS = 'prints'
}

export interface ProductTranslation {
  title: string;
  description: string;
  tags: string[];
}

export interface Product {
  id: string;
  translations: Record<Language, ProductTranslation>;
  price: number;
  category: ProductCategory;
  images: string[];
  available: boolean;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  photoURL?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
