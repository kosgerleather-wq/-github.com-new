"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui";

interface EditorialBannerProps {
  label?: string;
  heading?: string;
  body?: string;
  cta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  flip?: boolean;
}

export default function EditorialBanner({
  label     = "Journal",
  heading   = "The bag that goes\neverywhere you do.",
  body      = "Designed for a life in motion. Worn-in leather that maps your days, miles, and years.",
  cta       = { label: "Read More", href: "/journal" },
  imageAlt  = "Leather bag lifestyle",
  flip      = false,
}: EditorialBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(textRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="section-padding overflow-hidden bg-[#F5F1EB]">
      <div className="container-luxury">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
            flip ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Image */}
          <div
            className={`relative aspect-[4/5] overflow-hidden bg-[#EDE8E1] ${
              flip ? "lg:col-start-2" : ""
            }`}
          >
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              {/* Replace with real image */}
              <div className="w-full h-[110%] bg-gradient-to-br from-[#A56A43]/30 to-[#7A5230]/20" />
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: flip ? 24 : -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className={flip ? "lg:col-start-1 lg:row-start-1" : ""}
          >
            <p className="label text-[#B8ADA1] mb-6">{label}</p>
            <h2 className="font-heading font-light text-[#1B1A17] leading-tight mb-8 whitespace-pre-line">
              {heading}
            </h2>
            <p className="font-body text-sm font-light text-[#B8ADA1] leading-relaxed max-w-sm mb-10">
              {body}
            </p>
            <Button href={cta.href} variant="ghost">
              {cta.label}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
