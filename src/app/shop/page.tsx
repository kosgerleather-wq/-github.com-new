import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { ProductGrid } from "@/components/ui";
import ShopFilters from "@/components/ui/ShopFilters";
import Pagination  from "@/components/ui/Pagination";
import EmptyState  from "@/components/ui/EmptyState";
import { getProducts } from "@/lib/products";
import type { ProductCategory } from "@/types";
import type { SortOption } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Handcrafted full-grain leather bags, wallets and accessories.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const sp       = await searchParams;
  const category = (sp.category ?? "all") as ProductCategory | "all";
  const sort     = (sp.sort     ?? "featured") as SortOption;
  const page     = Math.max(1, parseInt(sp.page ?? "1", 10));

  const { data: products, total, totalPages } = getProducts({ category, sort, page });

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-0">
        {/* Page header */}
        <div className="container-luxury mb-16">
          <p className="label text-[#B8ADA1] mb-4">Shop</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-heading font-light text-[#1B1A17]">
              {category === "all"    ? "All Products"  :
               category === "bags"       ? "Bags"      :
               category === "wallets"    ? "Wallets"   : "Accessories"}
            </h1>
            <p className="label text-[#B8ADA1]">
              {total} {total === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="container-luxury mb-12">
          <Suspense fallback={null}>
            <ShopFilters />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="container-luxury section-padding pt-0">
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <ProductGrid products={products} columns={3} />
              <Suspense fallback={null}>
                <Pagination currentPage={page} totalPages={totalPages} />
              </Suspense>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
