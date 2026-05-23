import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider } from "@/store/CartContext";
import CartDrawer from "@/components/layout/CartDrawer";
import SkipNav from "@/components/ui/SkipNav";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Leather Brand — Handcrafted Leather Goods",
    template: "%s — Leather Brand",
  },
  description:
    "Full-grain vegetable tanned leather goods. Handcrafted slowly in small batches. Built to last a lifetime.",
  keywords: [
    "handmade leather bags",
    "handcrafted leather goods",
    "full grain leather bag",
    "vegetable tanned leather",
    "artisan leather bags",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Leather Brand",
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://leather-brand.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SkipNav />
        <CartProvider>
          <div id="main-content" className="flex flex-col flex-1">
            {children}
          </div>
          <CartDrawer />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </body>
    </html>
  );
}
