"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  title:  string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:sticky md:top-24 md:self-start">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border transition-all duration-300",
                active === i
                  ? "border-[#1B1A17]"
                  : "border-[#E6DED4] hover:border-[#B8ADA1] opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 aspect-[3/4] bg-[#EDE8E1] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {images[active] ? (
              <Image
                src={images[active].src}
                alt={images[active].alt ?? title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#D4C8B8] to-[#EDE8E1]" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4">
            <span className="label text-[#B8ADA1] bg-[#F5F1EB]/80 backdrop-blur-sm px-2 py-1">
              {active + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
