import { Suspense } from "react";
import { notFound }  from "next/navigation";
import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { ProductGrid } from "@/components/ui";
import Pagination  from "@/components/ui/Pagination";
import EmptyState  from "@/components/ui/EmptyState";
import { getProducts } from "@/lib/products";
import type { ProductCategory } from "@/types";
import type { SortOption } from "@/lib/products";

const VALID_CATEGORIES: ProductCategory[] = ["bags", "wallets", "accessories"];

const CATEGORY_META: Record<ProductCategory, { title: string; description: string }> = {
  bags:        { title: "Bags",        description: "Handcrafted leather bags built for a lifetime." },
  wallets:     { title: "Wallets",     description: "Slim, full-grain leather wallets and cardholders." },
  accessories: { title: "Accessories", description: "Leather accessories crafted with the same care." },
};

interface CategoryPageProps {
  params:       Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ProductCategory)) return {};
  const meta = CATEGORY_META[category as ProductCategory];
  return { title: meta.title, description: meta.description };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as ProductCategory)) notFound();

  const sp   = await searchParams;
  const sort = (sp.sort ?? "featured") as SortOption;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));

  const cat = category as ProductCategory;
  const { data: products, total, totalPages } = getProducts({ category: cat, sort, page });
  const meta = CATEGORY_META[cat];

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-0">
        {/* Header */}
        <div className="container-luxury mb-16">
          <p className="label text-[#B8ADA1] mb-4">
            <a href="/shop" className="hover:text-[#7A5230] transition-colors duration-300">Shop</a>
            {" / "}
            {meta.title}
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-heading font-light text-[#1B1A17]">{meta.title}</h1>
            <p className="label text-[#B8ADA1]">
              {total} {total === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <p className="font-body text-sm font-light text-[#B8ADA1] mt-4 max-w-md">
            {meta.description}
          </p>
        </div>

        {/* Sort */}
        <div className="container-luxury mb-12">
          <div className="flex items-center justify-end gap-3 pb-8 border-b border-[#E6DED4]">
            <span className="label text-[#B8ADA1]">Sort:</span>
            {/* Sort is handled client-side via Pagination/router in parent — here we show current */}
            <span className="label text-[#1B1A17] capitalize">{sort.replace("-", " ")}</span>
          </div>
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
