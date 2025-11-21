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
  translations: Record<string, ProductTranslation>; // Keyed by language code (fr, en, etc.)
  price: number;
  category: ProductCategory;
  images: string[];
  available: boolean;
  createdAt: string;
  dimensions?: string;
  medium?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
