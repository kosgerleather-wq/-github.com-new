"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/utils/cn";

interface PaginationProps {
  currentPage:  number;
  totalPages:   number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();
  const [, start] = useTransition();

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    start(() => {
      const next = new URLSearchParams(params.toString());
      next.set("page", String(page));
      router.push(`${pathname}?${next.toString()}`);
    });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-20">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "label px-4 py-2 border border-[#E6DED4] transition-colors duration-300",
          currentPage === 1
            ? "text-[#E6DED4] cursor-not-allowed"
            : "text-[#B8ADA1] hover:border-[#1B1A17] hover:text-[#1B1A17]"
        )}
      >
        ← Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={cn(
            "w-10 h-10 label border transition-colors duration-300",
            p === currentPage
              ? "border-[#1B1A17] text-[#1B1A17]"
              : "border-[#E6DED4] text-[#B8ADA1] hover:border-[#1B1A17] hover:text-[#1B1A17]"
          )}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "label px-4 py-2 border border-[#E6DED4] transition-colors duration-300",
          currentPage === totalPages
            ? "text-[#E6DED4] cursor-not-allowed"
            : "text-[#B8ADA1] hover:border-[#1B1A17] hover:text-[#1B1A17]"
        )}
      >
        Next →
      </button>
    </div>
  );
}
