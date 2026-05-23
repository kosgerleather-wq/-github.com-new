"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useCart } from "@/store/CartContext";
import type { NavLink } from "@/types";

const navLinks: NavLink[] = [
  { label: "Shop",          href: "/shop" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Journal",       href: "/journal" },
  { label: "About",         href: "/about" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { cart, openCart }        = useCart();
  const cartCount = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-700",
          scrolled
            ? "bg-[#F5F1EB]/90 backdrop-blur-md border-b border-[#E6DED4]"
            : "bg-transparent"
        )}
      >
        <div className="container-luxury flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-heading text-xl tracking-widest uppercase transition-opacity duration-400",
              scrolled ? "text-[#1B1A17]" : "text-white"
            )}
          >
            Artisan
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "label transition-opacity duration-400 hover:opacity-100",
                  scrolled ? "text-[#B8ADA1]" : "text-white/70"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Cart button */}
            <button
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} items`}
              className={cn(
                "label relative transition-opacity duration-400 hover:opacity-100",
                scrolled ? "text-[#B8ADA1]" : "text-white/70"
              )}
            >
              Cart
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-3 w-4 h-4 rounded-full bg-[#7A5230] text-white text-[10px] flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger */}
            <button
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "block w-6 h-px transition-all duration-400 origin-center",
                    scrolled ? "bg-[#1B1A17]" : "bg-white",
                    i === 0 && menuOpen && "rotate-45 translate-y-[9px]",
                    i === 1 && menuOpen && "opacity-0",
                    i === 2 && menuOpen && "-rotate-45 -translate-y-[9px]"
                  )}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#F5F1EB] flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="font-heading text-4xl font-light text-[#1B1A17] tracking-tight"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto mb-12">
              <p className="label text-[#B8ADA1]">Made slowly. Built to last.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
