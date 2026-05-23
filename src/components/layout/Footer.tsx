import Link from "next/link";
import FooterNewsletterForm from "./FooterNewsletterForm";

const shopLinks   = [
  { label: "Bags",        href: "/shop/bags" },
  { label: "Wallets",     href: "/shop/wallets" },
  { label: "Accessories", href: "/shop/accessories" },
];

const brandLinks  = [
  { label: "About",          href: "/about" },
  { label: "Craftsmanship",  href: "/craftsmanship" },
  { label: "Journal",        href: "/journal" },
  { label: "Contact",        href: "/contact" },
];

const legalLinks  = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms",          href: "/terms" },
  { label: "Shipping",       href: "/shipping" },
  { label: "Returns",        href: "/returns" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B1A17] text-[#B8ADA1]">
      <div className="container-luxury section-padding">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-heading text-2xl tracking-widest uppercase text-white hover:opacity-75 transition-opacity"
            >
              Artisan
            </Link>
            <p className="mt-6 text-sm leading-relaxed font-light max-w-xs">
              Full-grain vegetable tanned leather goods. Handcrafted slowly in small batches.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="label text-white/40 mb-6">Shop</p>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm font-light hover:text-white transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div>
            <p className="label text-white/40 mb-6">Brand</p>
            <ul className="flex flex-col gap-3">
              {brandLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm font-light hover:text-white transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="label text-white/40 mb-6">Stay in touch</p>
            <p className="text-sm font-light mb-6 leading-relaxed">
              Slow updates. New arrivals and stories from the workshop.
            </p>
            <FooterNewsletterForm />
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8">
          <p className="text-xs text-white/30 font-light">
            © {new Date().getFullYear()} Artisan. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-white/30 hover:text-white/60 transition-colors duration-300 font-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
