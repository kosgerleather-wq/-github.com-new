export default function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#1B1A17] focus:text-[#F5F1EB] focus:label"
    >
      Skip to main content
    </a>
  );
}
