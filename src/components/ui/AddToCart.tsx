"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useCart } from "@/store/CartContext";

interface AddToCartProps {
  productId:  string;
  variantId?: string;
  price:      number;
  currency:   string;
  inStock?:   boolean;
}

export default function AddToCart({
  productId, variantId, price, currency, inStock = true,
}: AddToCartProps) {
  const { addItem } = useCart();
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency", currency, minimumFractionDigits: 0,
  }).format(price);

  const handleAdd = async () => {
    if (state !== "idle" || !inStock) return;
    setState("adding");
    try {
      const id = variantId ?? productId;
      await addItem(id);
    } catch {
      // cart drawer still opens; Shopify error handled in context
    } finally {
      setState("added");
      setTimeout(() => setState("idle"), 2500);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-heading text-2xl font-light text-[#1B1A17]">{formatted}</span>
        {inStock ? (
          <span className="label text-[#7A5230]">In Stock</span>
        ) : (
          <span className="label text-[#B8ADA1]">Sold Out</span>
        )}
      </div>

      <motion.button
        onClick={handleAdd}
        disabled={!inStock || state === "adding"}
        whileTap={inStock ? { scale: 0.98 } : {}}
        className={cn(
          "relative w-full py-5 label tracking-widest uppercase transition-all duration-500 overflow-hidden",
          inStock
            ? "bg-[#1B1A17] text-[#F5F1EB] hover:bg-[#7A5230]"
            : "bg-[#E6DED4] text-[#B8ADA1] cursor-not-allowed"
        )}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span key="idle"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}
            >
              {inStock ? "Add to Cart" : "Sold Out"}
            </motion.span>
          )}
          {state === "adding" && (
            <motion.span key="adding"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
              Adding
            </motion.span>
          )}
          {state === "added" && (
            <motion.span key="added"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}
            >
              Added to Cart ✓
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="label text-center text-[#B8ADA1] mt-1">
        Free shipping on orders over $150
      </p>
    </div>
  );
}

/* ── Sticky mobile bar ───────────────────────────────────────── */
export function StickyAddToCart({
  productId, variantId, title, price, currency, inStock = true,
}: AddToCartProps & { title: string }) {
  const { addItem } = useCart();
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency", currency, minimumFractionDigits: 0,
  }).format(price);

  const handleAdd = async () => {
    if (state !== "idle" || !inStock) return;
    setState("adding");
    try { await addItem(variantId ?? productId); } catch { /* noop */ }
    setState("added");
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#F5F1EB]/95 backdrop-blur-md border-t border-[#E6DED4] px-6 py-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-body text-xs font-light text-[#1B1A17] truncate">{title}</p>
        <p className="font-heading text-lg font-light text-[#1B1A17]">{formatted}</p>
      </div>
      <button
        onClick={handleAdd}
        disabled={!inStock || state === "adding"}
        className={cn(
          "shrink-0 label px-8 py-4 transition-all duration-400",
          inStock
            ? "bg-[#1B1A17] text-[#F5F1EB] hover:bg-[#7A5230]"
            : "bg-[#E6DED4] text-[#B8ADA1] cursor-not-allowed"
        )}
      >
        {state === "added" ? "Added ✓" : state === "adding" ? "…" : "Add to Cart"}
      </button>
    </div>
  );
}
