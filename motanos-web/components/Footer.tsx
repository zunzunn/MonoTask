"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full rounded-t-xl flex flex-col md:flex-row justify-between items-center px-5 md:px-8 py-12 transition-all duration-300"
      style={{
        backgroundColor: "#f5f1ea",
        maxWidth: "1024px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        className="mb-6 md:mb-0"
        style={{
          fontFamily: "Hanken Grotesk, sans-serif",
          fontSize: "18px",
          fontWeight: 600,
          color: "#2e3230",
        }}
      >
        &copy; 2024 MotAnos. Designed for deep focus.
      </div>
      <div className="flex gap-6">
        {["Privacy", "Terms", "Journal", "Support"].map((label) => (
          <Link
            key={label}
            href="#"
            className="font-label-md text-sm hover:text-[#6b6358] transition-colors duration-200"
            style={{
              fontFamily: "Atkinson Hyperlegible Next, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "#4a4e4a",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}