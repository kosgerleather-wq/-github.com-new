import type { Product, ProductImage, ProductCategory } from "@/types";

/* Raw Shopify API shapes */
interface ShopifyImage   { url: string; altText?: string | null; width: number; height: number }
interface ShopifyMoney   { amount: string; currencyCode: string }
interface ShopifyVariant { id: string; availableForSale: boolean; price: ShopifyMoney; compareAtPrice?: ShopifyMoney | null; selectedOptions: { name: string; value: string }[]; image?: ShopifyImage | null }
interface ShopifyMetafield { key: string; value: string | null }

export interface ShopifyProduct {
  id:               string;
  handle:           string;
  title:            string;
  description:      string;
  availableForSale: boolean;
  productType:      string;
  tags:             string[];
  images:           { edges: { node: ShopifyImage }[] };
  priceRange:       { minVariantPrice: ShopifyMoney };
  variants:         { edges: { node: ShopifyVariant }[] };
  metafields:       (ShopifyMetafield | null)[];
}

export interface ShopifyCartLine {
  id:         string;
  quantity:   number;
  cost:       { totalAmount: ShopifyMoney };
  merchandise: {
    id:    string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    image?: ShopifyImage | null;
    product: { id: string; handle: string; title: string };
    price: ShopifyMoney;
  };
}

export interface ShopifyCart {
  id:            string;
  checkoutUrl:   string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount:    ShopifyMoney;
  };
  lines: { edges: { node: ShopifyCartLine }[] };
}

function edges<T>(connection: { edges: { node: T }[] }): T[] {
  return connection.edges.map((e) => e.node);
}

export function normalizeImage(img: ShopifyImage): ProductImage {
  return { src: img.url, alt: img.altText ?? "", width: img.width, height: img.height };
}

export function normalizeProduct(raw: ShopifyProduct): Product {
  const images   = edges(raw.images).map(normalizeImage);
  const variant  = edges(raw.variants)[0];
  const price    = parseFloat(variant?.price.amount ?? raw.priceRange.minVariantPrice.amount);
  const currency = variant?.price.currencyCode ?? raw.priceRange.minVariantPrice.currencyCode;
  const material = raw.metafields.find((m) => m?.key === "material")?.value ?? undefined;

  const typeMap: Record<string, ProductCategory> = {
    bags:        "bags",
    bag:         "bags",
    wallets:     "wallets",
    wallet:      "wallets",
    accessories: "accessories",
    accessory:   "accessories",
  };
  const category: ProductCategory =
    typeMap[raw.productType.toLowerCase()] ??
    (raw.tags.includes("bag")    ? "bags" :
     raw.tags.includes("wallet") ? "wallets" : "accessories");

  return {
    id:          raw.id,
    handle:      raw.handle,
    title:       raw.title,
    description: raw.description,
    price,
    currency,
    images,
    category,
    material,
    featured:    raw.tags.includes("featured"),
    new:         raw.tags.includes("new"),
  };
}

export function normalizeCart(raw: ShopifyCart) {
  return {
    id:            raw.id,
    checkoutUrl:   raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    subtotal:      parseFloat(raw.cost.subtotalAmount.amount),
    total:         parseFloat(raw.cost.totalAmount.amount),
    currency:      raw.cost.totalAmount.currencyCode,
    lines:         edges(raw.lines).map((line) => ({
      id:        line.id,
      quantity:  line.quantity,
      variantId: line.merchandise.id,
      title:     line.merchandise.product.title,
      handle:    line.merchandise.product.handle,
      variant:   line.merchandise.title,
      image:     line.merchandise.image ? normalizeImage(line.merchandise.image) : null,
      price:     parseFloat(line.merchandise.price.amount),
      currency:  line.merchandise.price.currencyCode,
      lineCost:  parseFloat(line.cost.totalAmount.amount),
    })),
  };
}

export type NormalizedCart     = ReturnType<typeof normalizeCart>;
export type NormalizedCartLine = NormalizedCart["lines"][number];
