import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  FeaturedCollection,
  Craftsmanship,
  EditorialBanner,
  BestSellers,
  PatinaStory,
  Newsletter,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1 — Cinematic hero */}
        <Hero />

        {/* 2 — Featured collection */}
        <FeaturedCollection />

        {/* 3 — Craftsmanship */}
        <Craftsmanship />

        {/* 4 — Editorial banner */}
        <EditorialBanner
          label="Journal"
          heading={"The bag that goes\neverywhere you do."}
          body="Designed for a life in motion. Worn-in leather that maps your days, miles, and years."
          cta={{ label: "Read the Story", href: "/journal" }}
        />

        {/* 5 — Best sellers */}
        <BestSellers />

        {/* 6 — Patina story */}
        <PatinaStory />

        {/* 7 — Editorial banner (flipped layout) */}
        <EditorialBanner
          label="About"
          heading={"A workshop.\nNot a factory."}
          body="We make fewer than 200 pieces a month. Each one inspected, finished, and signed before it leaves our hands."
          cta={{ label: "Our Story", href: "/about" }}
          flip
        />

        {/* 8 — Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
