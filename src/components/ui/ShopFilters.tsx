"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/utils/cn";
import type { SortOption } from "@/lib/products";
import type { ProductCategory } from "@/types";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All",         value: "all" },
  { label: "Bags",        value: "bags" },
  { label: "Wallets",     value: "wallets" },
  { label: "Accessories", value: "accessories" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Featured",      value: "featured" },
  { label: "Newest",        value: "newest" },
  { label: "Price: Low",    value: "price-asc" },
  { label: "Price: High",   value: "price-desc" },
];

export default function ShopFilters() {
  const router      = useRouter();
  const pathname    = usePathname();
  const params      = useSearchParams();
  const [, start]   = useTransition();

  const activeCategory = (params.get("category") ?? "all") as ProductCategory | "all";
  const activeSort     = (params.get("sort")     ?? "featured") as SortOption;

  const update = (key: string, value: string) => {
    start(() => {
      const next = new URLSearchParams(params.toString());
      next.set(key, value);
      next.delete("page");
      router.push(`${pathname}?${next.toString()}`);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#E6DED4]">
      {/* Category tabs */}
      <div className="flex items-center gap-6 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => update("category", cat.value)}
            className={cn(
              "label transition-colors duration-300",
              activeCategory === cat.value
                ? "text-[#1B1A17]"
                : "text-[#B8ADA1] hover:text-[#7A5230]"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="label text-[#B8ADA1]">Sort:</span>
        <div className="relative">
          <select
            value={activeSort}
            onChange={(e) => update("sort", e.target.value)}
            className="appearance-none bg-transparent label text-[#1B1A17] pr-6 outline-none cursor-pointer hover:text-[#7A5230] transition-colors duration-300"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#B8ADA1] text-xs">
            ▾
          </span>
        </div>
      </div>
    </div>
  );
}
