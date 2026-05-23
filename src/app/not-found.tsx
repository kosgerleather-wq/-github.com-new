import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center section-padding pt-40">
        <p className="label text-[#B8ADA1] mb-6">404</p>
        <h1 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-light text-[#1B1A17] leading-tight mb-6">
          Page not found.
        </h1>
        <p className="font-body text-sm font-light text-[#B8ADA1] max-w-sm mb-12">
          The page you are looking for may have moved or no longer exists. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="label px-10 py-4 bg-[#1B1A17] text-[#F5F1EB] hover:bg-[#7A5230] transition-colors duration-500"
          >
            Shop Collection
          </Link>
          <Link
            href="/"
            className="label px-10 py-4 border border-[#E6DED4] text-[#1B1A17] hover:border-[#1B1A17] transition-colors duration-500"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
