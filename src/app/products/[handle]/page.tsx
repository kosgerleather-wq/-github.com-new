import { notFound }  from "next/navigation";
import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import ProductGallery from "@/components/ui/ProductGallery";
import AddToCart, { StickyAddToCart } from "@/components/ui/AddToCart";
import Accordion from "@/components/ui/Accordion";
import RelatedProducts from "@/components/sections/RelatedProducts";
import { getProductByHandle, getRelatedProducts, ALL_PRODUCTS } from "@/lib/products";
import { productSchema, breadcrumbSchema } from "@/lib/structured-data";

const PRODUCT_DETAILS = {
  leather: [
    { label: "Material",  value: "Full-grain vegetable tanned leather — Badalassi Carlo, Tuscany" },
    { label: "Lining",    value: "Natural leather, undyed" },
    { label: "Hardware",  value: "Solid brass, antique finish" },
    { label: "Thread",    value: "Waxed linen, hand-stitched" },
    { label: "Patina",    value: "Develops character with use" },
  ],
  craft: [
    { label: "Batch size", value: "Fewer than 200 pieces per month" },
    { label: "Stitching",  value: "Saddle-stitched by hand, 6 stitches per inch" },
    { label: "Edge",       value: "Bevelled, burnished and painted by hand" },
    { label: "Origin",     value: "Made in our studio" },
  ],
};

const FAQ_ITEMS = [
  {
    question: "How long does delivery take?",
    answer:   "Standard delivery takes 3–5 business days. Express (1–2 days) is available at checkout. All orders are shipped with tracking.",
  },
  {
    question: "Do you ship internationally?",
    answer:   "Yes, we ship worldwide. International orders typically take 7–14 business days. Import duties may apply.",
  },
  {
    question: "What is your returns policy?",
    answer:   "We accept returns within 30 days of delivery, provided the item is unused and in original condition. Contact us to initiate a return.",
  },
  {
    question: "How do I care for my leather goods?",
    answer:   "Keep away from prolonged moisture. Condition with a natural wax or leather balm every 6–12 months. The leather will naturally darken and develop a patina over time — this is expected and desirable.",
  },
  {
    question: "Can I request a custom size or colour?",
    answer:   "We occasionally accept custom commissions for established customers. Send us a message through the contact page and we'll let you know what's possible.",
  },
];

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return {};
  return {
    title:       product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle }  = await params;
  const product     = getProductByHandle(handle);

  if (!product) notFound();

  const related = getRelatedProducts(handle, 3);
  const price   = new Intl.NumberFormat("en-US", {
    style: "currency", currency: product.currency, minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home",           href: "/" },
            { name: "Shop",           href: "/shop" },
            { name: product.category, href: `/shop/${product.category}` },
            { name: product.title,    href: `/products/${product.handle}` },
          ])),
        }}
      />
      <Navbar />

      <main className="pt-24 md:pt-28">
        {/* Breadcrumb */}
        <div className="container-luxury py-4 mb-4">
          <p className="label text-[#B8ADA1]">
            <a href="/shop" className="hover:text-[#7A5230] transition-colors duration-300">Shop</a>
            {" / "}
            <a
              href={`/shop/${product.category}`}
              className="hover:text-[#7A5230] transition-colors duration-300 capitalize"
            >
              {product.category}
            </a>
            {" / "}
            <span className="text-[#1B1A17]">{product.title}</span>
          </p>
        </div>

        {/* Main layout */}
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* LEFT — Gallery */}
            <ProductGallery images={product.images} title={product.title} />

            {/* RIGHT — Product info */}
            <div className="lg:pt-4 pb-20 md:pb-8">

              {/* Title + label */}
              <div className="mb-6">
                {product.new && (
                  <p className="label text-[#7A5230] mb-3">New Arrival</p>
                )}
                <h1 className="font-heading font-light text-[#1B1A17] leading-tight mb-2">
                  {product.title}
                </h1>
                {product.material && (
                  <p className="label text-[#B8ADA1]">{product.material}</p>
                )}
              </div>

              {/* Add to cart */}
              <div className="mb-10">
                <AddToCart
                  productId={product.id}
                  price={product.price}
                  currency={product.currency}
                  inStock
                />
              </div>

              {/* Description */}
              <div className="mb-10 pb-10 border-b border-[#E6DED4]">
                <p className="font-body text-sm font-light text-[#B8ADA1] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Leather details */}
              <div className="mb-10 pb-10 border-b border-[#E6DED4]">
                <p className="label text-[#1B1A17] mb-6">Leather Details</p>
                <dl className="flex flex-col gap-3">
                  {PRODUCT_DETAILS.leather.map((d) => (
                    <div key={d.label} className="flex gap-4">
                      <dt className="label text-[#B8ADA1] w-24 shrink-0">{d.label}</dt>
                      <dd className="font-body text-xs font-light text-[#1B1A17] leading-relaxed">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Craftsmanship */}
              <div className="mb-10 pb-10 border-b border-[#E6DED4]">
                <p className="label text-[#1B1A17] mb-6">Craftsmanship</p>
                <dl className="flex flex-col gap-3">
                  {PRODUCT_DETAILS.craft.map((d) => (
                    <div key={d.label} className="flex gap-4">
                      <dt className="label text-[#B8ADA1] w-24 shrink-0">{d.label}</dt>
                      <dd className="font-body text-xs font-light text-[#1B1A17] leading-relaxed">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Guarantee */}
              <div className="mb-10 pb-10 border-b border-[#E6DED4] flex gap-4 items-start">
                <span className="text-[#7A5230] text-lg mt-0.5">◈</span>
                <div>
                  <p className="font-body text-sm font-medium text-[#1B1A17] mb-1">
                    Built to last a lifetime.
                  </p>
                  <p className="font-body text-xs font-light text-[#B8ADA1] leading-relaxed">
                    Every piece carries our lifetime guarantee against manufacturing defects.
                    If something fails because of how it was made, we will repair or replace it — no questions asked.
                  </p>
                </div>
              </div>

              {/* Shipping */}
              <div className="mb-10 pb-10 border-b border-[#E6DED4] flex gap-4 items-start">
                <span className="text-[#7A5230] text-lg mt-0.5">◈</span>
                <div>
                  <p className="font-body text-sm font-medium text-[#1B1A17] mb-1">
                    Free shipping over $150
                  </p>
                  <p className="font-body text-xs font-light text-[#B8ADA1] leading-relaxed">
                    Standard delivery 3–5 days. Express available. Ships in a cloth bag and kraft box.
                  </p>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <p className="label text-[#1B1A17] mb-2">FAQ</p>
                <Accordion items={FAQ_ITEMS} />
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <RelatedProducts products={related} />
      </main>

      {/* Sticky mobile ATC */}
      <StickyAddToCart
        productId={product.id}
        title={product.title}
        price={product.price}
        currency={product.currency}
        inStock
      />

      <Footer />
    </>
  );
}
