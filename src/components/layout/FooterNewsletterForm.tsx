"use client";

import { useState } from "react";

export default function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [done,  setDone]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  if (done) {
    return <p className="text-sm text-white/60 font-light">Thank you. We&apos;ll be in touch.</p>;
  }

  return (
    <form
      className="flex border-b border-white/20 pb-2"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Email address"
        className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
      />
      <button
        type="submit"
        className="label text-white/50 hover:text-white transition-colors duration-300 ml-4"
      >
        Join
      </button>
    </form>
  );
}
