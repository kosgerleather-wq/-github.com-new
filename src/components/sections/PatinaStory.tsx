"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/utils/motion";

const milestones = [
  { year: "Day 1",    label: "Pale & pristine",   body: "The leather arrives raw and firm, pale with natural tannins." },
  { year: "6 Months", label: "First character",   body: "Light scratches develop. The colour deepens at corners and edges." },
  { year: "2 Years",  label: "True patina begins", body: "A warm amber tone emerges. The leather softens to your grip." },
  { year: "10 Years", label: "Heirloom quality",  body: "A rich, deep burnish that only a life well-lived can produce." },
];

export default function PatinaStory() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="section-padding bg-[#EDE8E1]">
      <div className="container-luxury">
        {/* Intro */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mb-20"
        >
          <motion.p variants={fadeUp} className="label text-[#B8ADA1] mb-6">
            Patina
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading font-light text-[#1B1A17] leading-tight mb-8">
            Leather that becomes
            <br />
            better with time.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-sm font-light text-[#B8ADA1] leading-relaxed">
            Vegetable tanning is a 200-year-old process. It uses oak bark and natural extracts —
            no chrome, no shortcuts. The result is leather that responds to your life,
            developing a unique patina that is entirely your own.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden md:block absolute top-8 inset-x-0 h-px bg-[#E6DED4]" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8"
          >
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                variants={fadeUp}
                custom={i}
                className="relative pt-0 md:pt-16"
              >
                {/* Dot */}
                <div className="hidden md:block absolute -top-[3px] left-0 w-[7px] h-[7px] rounded-full bg-[#7A5230]" />

                <p className="label text-[#7A5230] mb-3">{m.year}</p>
                <p className="font-body text-sm font-medium text-[#1B1A17] mb-2 tracking-wide">
                  {m.label}
                </p>
                <p className="font-body text-sm font-light text-[#B8ADA1] leading-relaxed">
                  {m.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
