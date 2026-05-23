"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductGrid, Button } from "@/components/ui";
import { fadeUp, staggerContainer } from "@/utils/motion";
import type { Product } from "@/types";

const BEST_SELLERS: Product[] = [
  {
    id: "bs-1",
    handle: "slim-card-holder",
    title: "Card Holder",
    description: "Ultra-slim 3-card holder in full-grain leather.",
    price: 85,
    currency: "USD",
    material: "Full Grain",
    images: [
      { src: "/images/placeholder-bs-1.jpg", alt: "Leather card holder", width: 800, height: 1067 },
    ],
    category: "wallets",
  },
  {
    id: "bs-2",
    handle: "weekender-bag",
    title: "Weekender",
    description: "Generous overnight bag. Structured and supple.",
    price: 890,
    currency: "USD",
    material: "Vegetable Tanned",
    images: [
      { src: "/images/placeholder-bs-2.jpg", alt: "Leather weekender bag", width: 800, height: 1067 },
    ],
    category: "bags",
  },
  {
    id: "bs-3",
    handle: "key-organiser",
    title: "Key Organiser",
    description: "Keeps up to 8 keys silent and organised.",
    price: 65,
    currency: "USD",
    material: "Full Grain",
    images: [
      { src: "/images/placeholder-bs-3.jpg", alt: "Leather key organiser", width: 800, height: 1067 },
    ],
    category: "accessories",
  },
  {
    id: "bs-4",
    handle: "zip-wallet",
    title: "Zip Wallet",
    description: "Full-zip wallet with coin compartment.",
    price: 195,
    currency: "USD",
    material: "Tuscany Leather",
    images: [
      { src: "/images/placeholder-bs-4.jpg", alt: "Leather zip wallet", width: 800, height: 1067 },
    ],
    category: "wallets",
  },
];

export default function BestSellers() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="section-padding bg-[#F5F1EB]">
      <div className="container-luxury">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <motion.p variants={fadeUp} className="label text-[#B8ADA1] mb-4">
              Best Sellers
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading font-light text-[#1B1A17]">
              The ones that
              <br />
              stay with you.
            </motion.h2>
          </div>

          <motion.div variants={fadeUp}>
            <Button href="/shop" variant="ghost">
              Shop All
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <ProductGrid products={BEST_SELLERS} columns={4} />
        </motion.div>
      </div>
    </section>
  );
}
