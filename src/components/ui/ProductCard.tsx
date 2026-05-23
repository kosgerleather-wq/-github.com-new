"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency ?? "USD",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link href={`/products/${product.handle}`} className={cn("group block", className)}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#EDE8E1] aspect-[3/4]">
        {product.images[0] && (
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
            priority={priority}
          />
        )}

        {/* Second image on hover */}
        {product.images[1] && (
          <Image
            src={product.images[1].src}
            alt={product.images[1].alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.new && (
            <span className="label bg-[#1B1A17] text-[#F5F1EB] px-3 py-1">
              New
            </span>
          )}
        </div>

        {/* Quick add — appears on hover */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <button
            className="w-full bg-[#F5F1EB]/90 backdrop-blur-sm text-[#1B1A17] label py-3 hover:bg-[#1B1A17] hover:text-[#F5F1EB] transition-colors duration-400"
            onClick={(e) => {
              e.preventDefault();
              // cart action handled by parent or cart context
            }}
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-body text-sm font-light text-[#1B1A17] tracking-wide group-hover:text-[#7A5230] transition-colors duration-400">
            {product.title}
          </p>
          {product.material && (
            <p className="label mt-1 text-[#B8ADA1]">{product.material}</p>
          )}
        </div>
        <p className="font-body text-sm font-light text-[#1B1A17] whitespace-nowrap">
          {price}
        </p>
      </div>
    </Link>
  );
}
