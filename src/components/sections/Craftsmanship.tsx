"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui";
import { staggerContainer, fadeUp, scaleReveal } from "@/utils/motion";

const steps = [
  { number: "01", label: "Selecting",   body: "Only the finest full-grain hides sourced from Tuscany and Spain." },
  { number: "02", label: "Cutting",     body: "Each panel cut by hand using century-old templates." },
  { number: "03", label: "Stitching",   body: "Saddle-stitched with waxed linen thread for lifelong hold." },
  { number: "04", label: "Finishing",   body: "Edges burnished and painted by hand. Never rushed." },
];

export default function Craftsmanship() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="section-padding bg-[#1B1A17] overflow-hidden">
      <div className="container-luxury">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — image grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                variants={scaleReveal}
                className="aspect-square bg-[#2C2416] overflow-hidden"
              >
                {/* Replace with real workshop images */}
                <div className="w-full h-full bg-gradient-to-br from-[#3D2E1A] to-[#1B1A17]" />
              </motion.div>
            ))}
          </motion.div>

          {/* Right — text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.p variants={fadeUp} className="label text-[#7A5230] mb-6">
              Craftsmanship
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-heading font-light text-white leading-tight mb-8"
            >
              A process refined
              <br />
              over generations.
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[#B8ADA1] font-light leading-relaxed mb-12 max-w-md">
              Every piece leaves our workshop carrying the marks of skilled hands —
              the slight imperfections that machines cannot replicate and time makes beautiful.
            </motion.p>

            {/* Process steps */}
            <motion.ol variants={staggerContainer} className="flex flex-col gap-8 mb-12">
              {steps.map((step) => (
                <motion.li
                  key={step.number}
                  variants={fadeUp}
                  className="flex gap-6 items-start border-t border-white/10 pt-6"
                >
                  <span className="label text-[#7A5230] shrink-0 w-8">{step.number}</span>
                  <div>
                    <p className="font-body text-sm font-medium text-white tracking-wide mb-1">
                      {step.label}
                    </p>
                    <p className="text-[#B8ADA1] text-sm font-light leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            <motion.div variants={fadeUp}>
              <Button
                href="/craftsmanship"
                variant="secondary"
                className="border-white/30 text-white hover:bg-white hover:text-[#1B1A17]"
              >
                The Full Story
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
