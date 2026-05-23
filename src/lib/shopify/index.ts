import { shopifyFetch } from "./client";
import {
  GET_CART, CART_CREATE, CART_LINES_ADD,
  CART_LINES_UPDATE, CART_LINES_REMOVE,
} from "./queries/cart";
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE, GET_COLLECTION_PRODUCTS } from "./queries/products";
import {
  normalizeProduct, normalizeCart,
  type ShopifyProduct, type ShopifyCart,
} from "./normalize";

/* ── Products ───────────────────────────────────────────────── */

export async function shopifyGetProducts({ first = 20, query = "", after }: {
  first?: number; query?: string; after?: string;
} = {}) {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[]; pageInfo: { hasNextPage: boolean; endCursor: string } } }>({
    query: GET_PRODUCTS,
    variables: { first, query, after, sortKey: "BEST_SELLING" },
    tags: ["products"],
  });
  return {
    products: data.products.edges.map((e) => normalizeProduct(e.node)),
    pageInfo: data.products.pageInfo,
  };
}

export async function shopifyGetProductByHandle(handle: string) {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    tags: [`product-${handle}`],
  });
  return data.productByHandle ? normalizeProduct(data.productByHandle) : null;
}

export async function shopifyGetCollectionProducts(handle: string, first = 20) {
  const data = await shopifyFetch<{
    collectionByHandle: {
      id: string; title: string; description: string;
      products: { edges: { node: ShopifyProduct }[] };
    } | null;
  }>({
    query: GET_COLLECTION_PRODUCTS,
    variables: { handle, first },
    tags: [`collection-${handle}`],
  });
  if (!data.collectionByHandle) return null;
  return {
    ...data.collectionByHandle,
    products: data.collectionByHandle.products.edges.map((e) => normalizeProduct(e.node)),
  };
}

/* ── Cart ───────────────────────────────────────────────────── */

export async function shopifyCreateCart(variantId?: string, quantity = 1) {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query:     CART_CREATE,
    variables: {
      input: variantId
        ? { lines: [{ merchandiseId: variantId, quantity }] }
        : {},
    },
    cache: "no-store",
  });
  return normalizeCart(data.cartCreate.cart);
}

export async function shopifyGetCart(cartId: string) {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query:     GET_CART,
    variables: { cartId },
    cache:     "no-store",
  });
  return data.cart ? normalizeCart(data.cart) : null;
}

export async function shopifyAddToCart(cartId: string, variantId: string, quantity = 1) {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query:     CART_LINES_ADD,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    cache:     "no-store",
  });
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function shopifyUpdateCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query:     CART_LINES_UPDATE,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache:     "no-store",
  });
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function shopifyRemoveCartLine(cartId: string, lineId: string) {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query:     CART_LINES_REMOVE,
    variables: { cartId, lineIds: [lineId] },
    cache:     "no-store",
  });
  return normalizeCart(data.cartLinesRemove.cart);
}
