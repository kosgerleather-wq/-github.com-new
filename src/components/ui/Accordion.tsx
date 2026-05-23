"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

interface AccordionItem {
  question: string;
  answer:   string;
}

interface AccordionProps {
  items:     AccordionItem[];
  className?: string;
}

function AccordionRow({ item, isOpen, onToggle }: {
  item:     AccordionItem;
  isOpen:   boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E6DED4]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-body text-sm font-light text-[#1B1A17] group-hover:text-[#7A5230] transition-colors duration-300 pr-8">
          {item.question}
        </span>
        <span
          className={cn(
            "shrink-0 text-[#B8ADA1] transition-transform duration-400",
            isOpen && "rotate-45"
          )}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm font-light text-[#B8ADA1] leading-relaxed pb-5 pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("border-t border-[#E6DED4]", className)}>
      {items.map((item, i) => (
        <AccordionRow
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
