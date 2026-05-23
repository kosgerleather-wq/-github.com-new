"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/utils/motion";

export default function Newsletter() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Klaviyo / API call goes here
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-[#F5F1EB] border-t border-[#E6DED4]">
      <div className="container-luxury">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="label text-[#B8ADA1] mb-6">
            Newsletter
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-heading font-light text-[#1B1A17] leading-tight mb-6"
          >
            Slow updates from
            <br />
            the workshop.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-body text-sm font-light text-[#B8ADA1] leading-relaxed mb-12"
          >
            New arrivals, behind-the-scenes craft stories, and nothing else.
            <br />
            We send rarely and carefully.
          </motion.p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-xl font-light text-[#7A5230]"
            >
              Thank you. We&apos;ll be in touch.
            </motion.p>
          ) : (
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 border-b border-[#1B1A17] max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="flex-1 bg-transparent py-3 text-sm font-light text-[#1B1A17] placeholder:text-[#B8ADA1] outline-none"
              />
              <button
                type="submit"
                className="label text-[#1B1A17] hover:text-[#7A5230] transition-colors duration-400 py-3 pl-6 whitespace-nowrap"
              >
                Subscribe
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
