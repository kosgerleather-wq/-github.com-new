"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

export default function SectionWrapper({
  children,
  className,
  id,
  animate = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  if (!animate) {
    return (
      <section id={id} ref={ref} className={cn("section-padding", className)}>
        <div className="container-luxury">{children}</div>
      </section>
    );
  }

  return (
    <section id={id} ref={ref} className={cn("section-padding", className)}>
      <motion.div
        className="container-luxury"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
