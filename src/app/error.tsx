"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center section-padding pt-40">
      <p className="label text-[#B8ADA1] mb-6">Something went wrong</p>
      <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] font-light text-[#1B1A17] leading-tight mb-6">
        An unexpected error occurred.
      </h1>
      <p className="font-body text-sm font-light text-[#B8ADA1] max-w-sm mb-12">
        We apologize for the inconvenience. Please try again or return home.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="label px-10 py-4 bg-[#1B1A17] text-[#F5F1EB] hover:bg-[#7A5230] transition-colors duration-500"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="label px-10 py-4 border border-[#E6DED4] text-[#1B1A17] hover:border-[#1B1A17] transition-colors duration-500"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
