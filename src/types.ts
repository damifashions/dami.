export type DamiLanguage = 'en' | 'fr' | 'ar';
export type DamiCurrency = 'EUR' | 'USD' | 'MAD';

export interface Product {
  id: string;
  title: Record<DamiLanguage, string>;
  category: 'kimonos' | 'abayas' | 'sets' | 'limited';
  categoryLabel: Record<DamiLanguage, string>;
  price: Record<DamiCurrency, number>;
  imageMain: string;
  imageAlt?: string;
  description: Record<DamiLanguage, string>;
  details: Record<DamiLanguage, string[]>;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'Uniques')[];
  materials: Record<DamiLanguage, string>;
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock?: boolean;
}

export interface LookbookItem {
  id: string;
  title: Record<DamiLanguage, string>;
  subtitle: Record<DamiLanguage, string>;
  imageUrl: string;
  setting: Record<DamiLanguage, string>;
  designerQuote: Record<DamiLanguage, string>;
}

export interface Testimonial {
  id: string;
  quote: Record<DamiLanguage, string>;
  author: string;
  city: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}
