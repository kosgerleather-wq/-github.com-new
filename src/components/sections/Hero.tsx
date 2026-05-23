"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* Placeholder — replace with real Cloudinary image */}
        <div className="absolute inset-0 bg-[#2C2416]" />
        {/* Grain overlay for luxury texture */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-luxury relative z-10 pb-20 md:pb-28"
        style={{ opacity }}
      >
        <motion.p
          className="label text-white/50 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Handcrafted since 2010
        </motion.p>

        <motion.h1
          className="font-heading text-white font-light leading-none tracking-tight max-w-3xl"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          Made slowly.
          <br />
          Built to last.
        </motion.h1>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <Button href="/shop" variant="primary" size="lg"
            className="bg-[#F5F1EB] text-[#1B1A17] border-[#F5F1EB] hover:bg-white hover:border-white"
          >
            Shop Collection
          </Button>
          <Button href="/craftsmanship" variant="ghost" size="lg"
            className="border-white/40 text-white hover:bg-white/10 hover:border-white"
          >
            Our Craft
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="label text-white/40 [writing-mode:vertical-rl]">Scroll</span>
        <motion.div
          className="w-px h-12 bg-white/20 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
