import type { MetadataRoute } from "next";
import { ALL_PRODUCTS } from "@/lib/products";

const BASE = "https://leather-brand.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/shop`,                lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/shop/bags`,           lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/shop/wallets`,        lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/shop/accessories`,    lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/craftsmanship`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/journal`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/contact`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = ALL_PRODUCTS.map((p) => ({
    url:             `${BASE}/products/${p.handle}`,
    lastModified:    new Date(),
    changeFrequency: "weekly",
    priority:        0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
