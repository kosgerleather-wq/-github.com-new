"use client";

import Image from "next/image";
import Link  from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/CartContext";
import { cn } from "@/utils/cn";

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCart();

  const subtotal = cart
    ? new Intl.NumberFormat("en-US", {
        style: "currency", currency: cart.currency, minimumFractionDigits: 0,
      }).format(cart.subtotal)
    : "$0";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#F5F1EB] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E6DED4]">
              <div>
                <p className="font-heading text-lg font-light text-[#1B1A17]">Cart</p>
                {cart?.totalQuantity ? (
                  <p className="label text-[#B8ADA1]">
                    {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"}
                  </p>
                ) : null}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="label text-[#B8ADA1] hover:text-[#1B1A17] transition-colors duration-300"
              >
                Close ✕
              </button>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {!cart || cart.lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <p className="font-heading text-2xl font-light text-[#1B1A17]">
                    Your cart is empty.
                  </p>
                  <p className="label text-[#B8ADA1]">
                    Each piece is made slowly. Take your time.
                  </p>
                  <button
                    onClick={closeCart}
                    className="label text-[#7A5230] mt-4 hover:opacity-70 transition-opacity"
                  >
                    Continue Shopping →
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-[#E6DED4]">
                  {cart.lines.map((line) => {
                    const linePrice = new Intl.NumberFormat("en-US", {
                      style: "currency", currency: line.currency, minimumFractionDigits: 0,
                    }).format(line.lineCost);

                    return (
                      <li key={line.id} className="py-6 flex gap-4">
                        {/* Image */}
                        <div className="w-20 h-24 bg-[#EDE8E1] shrink-0 overflow-hidden relative">
                          {line.image ? (
                            <Image
                              src={line.image.src}
                              alt={line.image.alt}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#D4C8B8]" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${line.handle}`}
                            onClick={closeCart}
                            className="font-body text-sm font-light text-[#1B1A17] hover:text-[#7A5230] transition-colors duration-300 line-clamp-2"
                          >
                            {line.title}
                          </Link>
                          {line.variant !== "Default Title" && (
                            <p className="label text-[#B8ADA1] mt-1">{line.variant}</p>
                          )}
                          <p className="font-body text-sm font-light text-[#1B1A17] mt-2">
                            {linePrice}
                          </p>

                          {/* Quantity + remove */}
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center border border-[#E6DED4]">
                              <button
                                onClick={() => updateItem(line.id, line.quantity - 1)}
                                className={cn(
                                  "w-8 h-8 flex items-center justify-center label text-[#B8ADA1]",
                                  "hover:text-[#1B1A17] transition-colors duration-300"
                                )}
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-8 text-center label text-[#1B1A17]">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() => updateItem(line.id, line.quantity + 1)}
                                className={cn(
                                  "w-8 h-8 flex items-center justify-center label text-[#B8ADA1]",
                                  "hover:text-[#1B1A17] transition-colors duration-300"
                                )}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(line.id)}
                              className="label text-[#B8ADA1] hover:text-red-400 transition-colors duration-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.length > 0 && (
              <div className="px-8 py-6 border-t border-[#E6DED4]">
                <div className="flex items-center justify-between mb-6">
                  <p className="font-body text-sm font-light text-[#B8ADA1]">Subtotal</p>
                  <p className="font-heading text-xl font-light text-[#1B1A17]">{subtotal}</p>
                </div>
                <p className="label text-[#B8ADA1] text-center mb-4">
                  Shipping and taxes calculated at checkout
                </p>
                <a
                  href={cart.checkoutUrl}
                  className={cn(
                    "block w-full text-center label py-5 transition-all duration-500",
                    isLoading
                      ? "bg-[#B8ADA1] text-white cursor-not-allowed"
                      : "bg-[#1B1A17] text-[#F5F1EB] hover:bg-[#7A5230]"
                  )}
                >
                  {isLoading ? "Updating…" : "Proceed to Checkout"}
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
