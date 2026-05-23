"use client";

import {
  createContext, useContext, useEffect, useReducer, useCallback,
  type ReactNode,
} from "react";
import {
  shopifyCreateCart, shopifyGetCart,
  shopifyAddToCart, shopifyUpdateCartLine, shopifyRemoveCartLine,
} from "@/lib/shopify";
import type { NormalizedCart } from "@/lib/shopify/normalize";

const CART_ID_KEY = "leather_cart_id";

/* ── State ─────────────────────────────────────────────────── */
interface CartState {
  cart:        NormalizedCart | null;
  isOpen:      boolean;
  isLoading:   boolean;
}

type CartAction =
  | { type: "SET_CART";    cart: NormalizedCart }
  | { type: "SET_OPEN";    open: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "CLEAR" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":    return { ...state, cart: action.cart, isLoading: false };
    case "SET_OPEN":    return { ...state, isOpen: action.open };
    case "SET_LOADING": return { ...state, isLoading: action.loading };
    case "CLEAR":       return { cart: null, isOpen: false, isLoading: false };
    default:            return state;
  }
}

/* ── Context ────────────────────────────────────────────────── */
interface CartContextValue extends CartState {
  addItem:    (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number)    => Promise<void>;
  removeItem: (lineId: string)                       => Promise<void>;
  openCart:   () => void;
  closeCart:  () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    cart: null, isOpen: false, isLoading: false,
  });

  /* Restore cart from localStorage on mount */
  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    dispatch({ type: "SET_LOADING", loading: true });
    shopifyGetCart(cartId)
      .then((cart) => {
        if (cart) dispatch({ type: "SET_CART", cart });
        else { localStorage.removeItem(CART_ID_KEY); dispatch({ type: "CLEAR" }); }
      })
      .catch(() => dispatch({ type: "SET_LOADING", loading: false }));
  }, []);

  const getOrCreateCart = useCallback(async () => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId && state.cart) return state.cart;
    const cart = await shopifyCreateCart();
    localStorage.setItem(CART_ID_KEY, cart.id);
    dispatch({ type: "SET_CART", cart });
    return cart;
  }, [state.cart]);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    dispatch({ type: "SET_LOADING", loading: true });
    try {
      const current = await getOrCreateCart();
      const cart    = await shopifyAddToCart(current.id, variantId, quantity);
      localStorage.setItem(CART_ID_KEY, cart.id);
      dispatch({ type: "SET_CART", cart });
      dispatch({ type: "SET_OPEN", open: true });
    } catch (err) {
      console.error("addItem failed:", err);
      dispatch({ type: "SET_LOADING", loading: false });
    }
  }, [getOrCreateCart]);

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    const cartId = state.cart?.id;
    if (!cartId) return;
    dispatch({ type: "SET_LOADING", loading: true });
    try {
      if (quantity <= 0) {
        const cart = await shopifyRemoveCartLine(cartId, lineId);
        dispatch({ type: "SET_CART", cart });
      } else {
        const cart = await shopifyUpdateCartLine(cartId, lineId, quantity);
        dispatch({ type: "SET_CART", cart });
      }
    } catch (err) {
      console.error("updateItem failed:", err);
      dispatch({ type: "SET_LOADING", loading: false });
    }
  }, [state.cart?.id]);

  const removeItem = useCallback(async (lineId: string) => {
    const cartId = state.cart?.id;
    if (!cartId) return;
    dispatch({ type: "SET_LOADING", loading: true });
    try {
      const cart = await shopifyRemoveCartLine(cartId, lineId);
      dispatch({ type: "SET_CART", cart });
    } catch (err) {
      console.error("removeItem failed:", err);
      dispatch({ type: "SET_LOADING", loading: false });
    }
  }, [state.cart?.id]);

  return (
    <CartContext.Provider value={{
      ...state,
      addItem, updateItem, removeItem,
      openCart:  () => dispatch({ type: "SET_OPEN", open: true }),
      closeCart: () => dispatch({ type: "SET_OPEN", open: false }),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
