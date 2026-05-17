"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AppNavProps = {
  tinyStepsMode?: boolean;
};

const navItems = [
  { href: "/app", label: "Today" },
  { href: "/app/tasks", label: "Tasks" },
  { href: "#", label: "Garden" },
  { href: "#", label: "Settings" },
];

export default function AppNav({ tinyStepsMode = false }: AppNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-500 ${
        tinyStepsMode ? "bg-[#fff3e8]/80" : "bg-[#faf6f0]/90"
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-[#4a7c59]"
          style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
        >
          MonoTask
        </Link>
        <div
          className={`hidden items-center gap-7 text-sm font-semibold text-[#4a4e4a] transition-opacity duration-500 md:flex ${
            tinyStepsMode ? "opacity-55" : "opacity-100"
          }`}
        >
          {navItems.map((item) => {
            const isActive =
              item.href !== "#" &&
              (pathname === item.href ||
                (item.href === "/app/tasks" && pathname.startsWith("/app/tasks")));

            return (
              <Link
                className={`rounded-full px-3 py-2 transition ${
                  isActive
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
          className="rounded-full border border-[#c4c8bc] px-4 py-2 text-sm font-semibold text-[#4a4e4a] transition hover:bg-white"
        >
          Landing
        </Link>
      </div>
    </nav>
  );
}
