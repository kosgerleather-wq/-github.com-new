"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductGrid } from "@/components/ui";
import { staggerContainer, fadeUp } from "@/utils/motion";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products:  Product[];
  className?: string;
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="section-padding border-t border-[#E6DED4] bg-[#F5F1EB]">
      <div className="container-luxury">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="label text-[#B8ADA1] mb-4">
            You may also like
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading font-light text-[#1B1A17]">
            Made with the same hands.
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeInOut" }}
        >
          <ProductGrid products={products.slice(0, 3)} columns={3} />
        </motion.div>
      </div>
    </section>
  );
}
