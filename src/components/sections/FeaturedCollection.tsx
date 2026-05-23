"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Button, ProductGrid } from "@/components/ui";
import { staggerContainer, fadeUp } from "@/utils/motion";
import type { Product } from "@/types";

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "1",
    handle: "tote-bag-natural",
    title: "Tote Bag",
    description: "Full-grain vegetable tanned leather tote.",
    price: 485,
    currency: "USD",
    material: "Vegetable Tanned",
    featured: true,
    new: true,
    images: [
      { src: "/images/placeholder-product-1.jpg", alt: "Natural leather tote bag", width: 800, height: 1067 },
    ],
    category: "bags",
  },
  {
    id: "2",
    handle: "bifold-wallet",
    title: "Bifold Wallet",
    description: "Slim full-grain leather bifold.",
    price: 145,
    currency: "USD",
    material: "Full Grain",
    featured: true,
    images: [
      { src: "/images/placeholder-product-2.jpg", alt: "Brown leather bifold wallet", width: 800, height: 1067 },
    ],
    category: "wallets",
  },
  {
    id: "3",
    handle: "messenger-bag",
    title: "Messenger Bag",
    description: "Structured messenger in veg tan leather.",
    price: 620,
    currency: "USD",
    material: "Tuscany Leather",
    featured: true,
    images: [
      { src: "/images/placeholder-product-3.jpg", alt: "Leather messenger bag", width: 800, height: 1067 },
    ],
    category: "bags",
  },
];

export default function FeaturedCollection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="section-padding bg-[#F5F1EB]">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <motion.div variants={fadeUp}>
            <p className="label text-[#B8ADA1] mb-4">Collection</p>
            <h2 className="font-heading font-light text-[#1B1A17]">
              Essential pieces.
              <br />
              Made to endure.
            </h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button href="/shop" variant="ghost" size="md">
              View All
            </Button>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <ProductGrid products={PLACEHOLDER_PRODUCTS} columns={3} />
        </motion.div>
      </div>
    </section>
  );
}
