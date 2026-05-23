const DOMAIN  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const TOKEN   = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
const API_URL = `https://${DOMAIN}/api/2024-10/graphql.json`;

interface ShopifyResponse<T> {
  data:   T;
  errors?: { message: string }[];
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: {
  query:      string;
  variables?: Record<string, unknown>;
  cache?:     RequestCache;
  tags?:      string[];
}): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      "Missing Shopify env vars. Copy .env.local.example → .env.local and fill in your credentials."
    );
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type":                  "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags ? { next: { tags } } : {}),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json: ShopifyResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(" | "));
  }

  return json.data;
}
