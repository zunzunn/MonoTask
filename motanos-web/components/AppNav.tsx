"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/app", label: "Today" },
  { href: "/app/tasks", label: "Tasks" },
  { href: "/app/garden", label: "Garden" },
  { href: "#", label: "Settings" },
];

export default function AppNav() {
  const pathname = usePathname();
  const isGarden = pathname.startsWith("/app/garden");

  return (
    <motion.nav
      animate={isGarden ? { y: [0, 1.5, 0] } : false}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isGarden
          ? "border-b border-white/12 bg-[#07182b]/58 shadow-[0_18px_60px_rgba(5,16,31,0.34),0_0_40px_rgba(145,204,170,0.08)] backdrop-blur-xl"
          : "bg-[#faf6f0]/90 backdrop-blur-md"
      }`}
      transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
    >
      <div
        className={`mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4 ${
          isGarden ? "text-[#edf7e9]" : ""
        }`}
      >
        <Link
          href="/"
          className={`group flex items-center gap-2 text-2xl font-bold tracking-tight transition duration-500 ${
            isGarden
              ? "text-[#edf7e9] drop-shadow-[0_0_18px_rgba(171,230,180,0.22)] hover:text-[#c9f2c6]"
              : "text-[#4a7c59]"
          }`}
          style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
        >
          {isGarden && (
            <motion.span
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.08, 1] }}
              className="material-symbols-outlined text-[25px] text-[#bdf0bb]"
              style={{
                fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24",
              }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            >
              psychiatry
            </motion.span>
          )}
          MotAnos
        </Link>
        <div
          className={`order-3 flex w-full items-center justify-between gap-2 overflow-x-auto text-sm font-semibold transition-opacity duration-500 md:order-none md:w-auto md:justify-start md:gap-7 ${
            isGarden ? "text-[#dbe8dc]" : "text-[#4a4e4a]"
          }`}
        >
          {navItems.map((item) => {
            const isActive =
              item.href !== "#" &&
                (pathname === item.href ||
                (item.href !== "/app" && pathname.startsWith(item.href)));

            return (
              <Link
                className={`shrink-0 rounded-full px-3 py-2 transition duration-300 ${
                  isGarden
                    ? isActive
                      ? "bg-[#bdf0bb]/14 text-[#dfffcc] shadow-[0_0_22px_rgba(189,240,187,0.22)] ring-1 ring-[#c6f7b8]/28"
                      : "hover:bg-white/10 hover:text-[#f5ffe9] hover:shadow-[0_0_18px_rgba(189,240,187,0.12)]"
                    : isActive
                      ? "border-b-2 border-[#4a7c59] pb-1 text-[#4a7c59]"
                      : "hover:bg-[#e4e0d8]/40"
                }`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link
          href="/"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
            isGarden
              ? "border border-white/12 bg-white/8 text-[#edf7e9] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/14 hover:shadow-[0_0_24px_rgba(189,240,187,0.14)]"
              : "border border-[#c4c8bc] text-[#4a4e4a] hover:bg-white"
          }`}
        >
          Landing
        </Link>
      </div>
    </motion.nav>
  );
}
