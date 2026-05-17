"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="w-full sticky top-0 z-50 flex justify-center items-center px-5 md:px-8 py-5 transition-opacity duration-300"
      style={{
        backgroundColor: "#faf6f0",
        borderBottom: "1px solid #c4c8bc",
      }}
    >
      <div className="w-full max-w-[1024px] flex items-center justify-between">
        <Link
          href="/"
          className="font-headline-md text-xl md:text-2xl tracking-tight cursor-pointer hover:text-[#4a7c59] transition-colors duration-300"
          style={{
            fontFamily: "Hanken Grotesk, sans-serif",
            fontWeight: 600,
            color: "#2e3230",
            lineHeight: "32px",
          }}
        >
          MonoTask
        </Link>
        <Link
          href="/app"
          className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: "#4a7c59",
            color: "#ffffff",
            boxShadow: "0 4px 20px rgba(46, 50, 48, 0.06)",
          }}
        >
          Start
        </Link>
      </div>
    </nav>
  );
}
