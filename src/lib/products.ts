import type { Product, ProductCategory } from "@/types";

export const ALL_PRODUCTS: Product[] = [
  {
    id: "1", handle: "tote-bag-natural", title: "Tote Bag", category: "bags",
    price: 485, currency: "USD", material: "Vegetable Tanned", featured: true, new: true,
    description: "Full-grain vegetable tanned leather sourced from Tuscany. Structured base, open top. Hand-stitched with waxed linen thread.",
    images: [{ src: "/images/placeholder-product-1.jpg", alt: "Natural tote bag", width: 800, height: 1067 }],
  },
  {
    id: "2", handle: "bifold-wallet", title: "Bifold Wallet", category: "wallets",
    price: 145, currency: "USD", material: "Full Grain",
    description: "Slim full-grain bifold. 4 card slots, a bill compartment, vegetable tanned interior.",
    images: [{ src: "/images/placeholder-product-2.jpg", alt: "Bifold wallet", width: 800, height: 1067 }],
  },
  {
    id: "3", handle: "messenger-bag", title: "Messenger Bag", category: "bags",
    price: 620, currency: "USD", material: "Tuscany Leather", featured: true,
    description: "Structured messenger in veg tan leather. Brass buckle closure, padded laptop sleeve.",
    images: [{ src: "/images/placeholder-product-3.jpg", alt: "Messenger bag", width: 800, height: 1067 }],
  },
  {
    id: "4", handle: "slim-card-holder", title: "Card Holder", category: "wallets",
    price: 85, currency: "USD", material: "Full Grain",
    description: "Ultra-slim 3-card holder. Minimal and precise.",
    images: [{ src: "/images/placeholder-bs-1.jpg", alt: "Card holder", width: 800, height: 1067 }],
  },
  {
    id: "5", handle: "weekender-bag", title: "Weekender", category: "bags",
    price: 890, currency: "USD", material: "Vegetable Tanned",
    description: "Generous overnight bag. Structured and supple, with brass fittings.",
    images: [{ src: "/images/placeholder-bs-2.jpg", alt: "Weekender bag", width: 800, height: 1067 }],
  },
  {
    id: "6", handle: "key-organiser", title: "Key Organiser", category: "accessories",
    price: 65, currency: "USD", material: "Full Grain",
    description: "Keeps up to 8 keys silent and organised.",
    images: [{ src: "/images/placeholder-bs-3.jpg", alt: "Key organiser", width: 800, height: 1067 }],
  },
  {
    id: "7", handle: "zip-wallet", title: "Zip Wallet", category: "wallets",
    price: 195, currency: "USD", material: "Tuscany Leather",
    description: "Full-zip wallet with coin compartment and 6 card slots.",
    images: [{ src: "/images/placeholder-bs-4.jpg", alt: "Zip wallet", width: 800, height: 1067 }],
  },
  {
    id: "8", handle: "laptop-sleeve", title: "Laptop Sleeve", category: "accessories",
    price: 225, currency: "USD", material: "Vegetable Tanned", new: true,
    description: "Padded full-grain sleeve for 13\" and 15\" laptops. Zip closure with leather pull.",
    images: [{ src: "/images/placeholder-product-1.jpg", alt: "Laptop sleeve", width: 800, height: 1067 }],
  },
  {
    id: "9", handle: "crossbody-bag", title: "Crossbody", category: "bags",
    price: 340, currency: "USD", material: "Full Grain", new: true,
    description: "Compact crossbody. Adjustable strap, magnetic closure, interior slip pocket.",
    images: [{ src: "/images/placeholder-product-2.jpg", alt: "Crossbody bag", width: 800, height: 1067 }],
  },
  {
    id: "10", handle: "belt-cognac", title: "Leather Belt", category: "accessories",
    price: 115, currency: "USD", material: "Full Grain",
    description: "1.3\" width. Solid brass buckle. Available in sizes 30–42.",
    images: [{ src: "/images/placeholder-product-3.jpg", alt: "Leather belt", width: 800, height: 1067 }],
  },
  {
    id: "11", handle: "notebook-cover", title: "Notebook Cover", category: "accessories",
    price: 95, currency: "USD", material: "Vegetable Tanned",
    description: "Fits standard A5 notebooks. Interior pen loop and card pocket.",
    images: [{ src: "/images/placeholder-bs-1.jpg", alt: "Notebook cover", width: 800, height: 1067 }],
  },
  {
    id: "12", handle: "briefcase", title: "Briefcase", category: "bags",
    price: 980, currency: "USD", material: "Tuscany Leather", featured: true,
    description: "Full-grain briefcase with structured base. Two compartments, leather-lined interior.",
    images: [{ src: "/images/placeholder-bs-2.jpg", alt: "Leather briefcase", width: 800, height: 1067 }],
  },
];

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export function getProductByHandle(handle: string) {
  return ALL_PRODUCTS.find((p) => p.handle === handle) ?? null;
}

export function getRelatedProducts(handle: string, limit = 4) {
  const product = getProductByHandle(handle);
  if (!product) return [];
  return ALL_PRODUCTS
    .filter((p) => p.handle !== handle && p.category === product.category)
    .slice(0, limit);
}

export function getProducts({
  category,
  sort = "featured",
  page = 1,
  perPage = 9,
}: {
  category?: ProductCategory | "all";
  sort?: SortOption;
  page?: number;
  perPage?: number;
}) {
  let items = [...ALL_PRODUCTS];

  if (category && category !== "all") {
    items = items.filter((p) => p.category === category);
  }

  switch (sort) {
    case "price-asc":  items.sort((a, b) => a.price - b.price); break;
    case "price-desc": items.sort((a, b) => b.price - a.price); break;
    case "newest":     items.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); break;
    default:           items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const total = items.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const data  = items.slice(start, start + perPage);

  return { data, total, totalPages, page };
}
