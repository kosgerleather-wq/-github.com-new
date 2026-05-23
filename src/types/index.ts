export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: ProductImage[];
  category: ProductCategory;
  material?: string;
  featured?: boolean;
  new?: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ProductCategory = "bags" | "wallets" | "accessories";

export interface CartItem extends Product {
  quantity: number;
}

export interface NavLink {
  label: string;
  href: string;
}
