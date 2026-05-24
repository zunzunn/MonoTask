"use client";

import { motion } from "framer-motion";

const particles = [
  { x: 20, y: 30, size: 6, delay: 0, duration: 5 },
  { x: 72, y: 18, size: 4, delay: 1.2, duration: 4.5 },
  { x: 82, y: 68, size: 5, delay: 2.4, duration: 5.5 },
  { x: 28, y: 78, size: 3, delay: 0.6, duration: 4 },
  { x: 50, y: 8, size: 4.5, delay: 1.8, duration: 6 },
  { x: 12, y: 55, size: 5, delay: 3, duration: 5 },
  { x: 65, y: 88, size: 3.5, delay: 0.3, duration: 4.8 },
  { x: 40, y: 45, size: 4, delay: 2.1, duration: 5.2 },
];

type EmptyType = "empty" | "search" | "filtered" | "completed";

const config: Record<
  EmptyType,
  { icon: string; title: string; subtitle: string; showButton: boolean }
> = {
  empty: {
    icon: "checklist",
    title: "No Tasks Yet",
    subtitle: "Start building your day",
    showButton: true,
  },
  search: {
    icon: "search_off",
    title: "No Results",
    subtitle: "Try different keywords",
    showButton: false,
  },
  filtered: {
    icon: "filter_alt_off",
    title: "No Matching Tasks",
    subtitle: "Try adjusting your filters",
    showButton: false,
  },
  completed: {
    icon: "celebration",
    title: "All Done",
    subtitle: "You completed everything — enjoy the calm",
    showButton: false,
  },
};

export default function EmptyState({
  type = "empty",
  onCreateTask,
}: {
  type?: EmptyType;
  onCreateTask?: () => void;
}) {
  const c = config[type];

  return (
    <motion.div
      className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#e4e0d8] bg-white/60 p-10 text-center backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-[#4a7c59]/15 blur-3xl" />

      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#4a7c59]/15"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.15, 0.5, 0.15] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="relative mb-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <span
          className="material-symbols-outlined text-7xl text-[#4a7c59]/25"
          style={{
            fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48",
          }}
        >
          {c.icon}
        </span>
      </motion.div>

      <motion.div
        className="relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b704f]">
          {c.title}
        </p>
        <h3
          className="mt-2 text-2xl font-semibold tracking-tight text-[#2e3230]"
          style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
        >
          {c.subtitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#74796e]">
          Every focus session begins with a single task.
        </p>
      </motion.div>

      {c.showButton && onCreateTask && (
        <motion.button
          className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#4a7c59] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(74,124,89,0.25)] transition hover:bg-[#3f6d4c] hover:shadow-[0_6px_24px_rgba(74,124,89,0.35)]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.23, 1, 0.32, 1],
          }}
          onClick={onCreateTask}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="material-symbols-outlined text-lg"
            style={{
              fontVariationSettings:
                "'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24",
            }}
          >
            add
          </span>
          Create Task
        </motion.button>
      )}
    </motion.div>
  );
}
