import type { Product } from "@/types";

const BASE = "https://leather-brand.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Artisan Leather",
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: "Full-grain vegetable tanned leather goods. Handcrafted slowly in small batches.",
    sameAs: [
      "https://instagram.com/artisanleather",
      "https://pinterest.com/artisanleather",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@leather-brand.com",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Artisan Leather",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE}/shop?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: Product) {
  const price = product.price.toFixed(2);
  const image = product.images[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url: `${BASE}/products/${product.handle}`,
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.src,
        width: String(image.width),
        height: String(image.height),
      },
    }),
    brand: { "@type": "Brand", name: "Artisan Leather" },
    material: product.material,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: `${BASE}/products/${product.handle}`,
      seller: { "@type": "Organization", name: "Artisan Leather" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: product.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
          transitTime:  { "@type": "QuantitativeValue", minValue: 3, maxValue: 5, unitCode: "DAY" },
        },
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.href}`,
    })),
  };
}
