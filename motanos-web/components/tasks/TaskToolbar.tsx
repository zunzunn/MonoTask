"use client";

import { motion } from "framer-motion";

export default function TaskToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterPriority,
  onFilterChange,
}: {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  filterPriority: string;
  onFilterChange: (filter: string) => void;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 rounded-2xl border border-[#e4e0d8] bg-white/70 px-4 py-2.5 shadow-[0_2px_12px_rgba(46,50,48,0.04)] backdrop-blur-sm transition-all duration-200 focus-within:border-[#4a7c59] focus-within:shadow-[0_0_0_4px_rgba(74,124,89,0.08)]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <span
        className="material-symbols-outlined text-lg text-[#74796e]"
        style={{
          fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
        }}
      >
        search
      </span>
      <input
        className="flex-1 bg-transparent text-sm font-medium text-[#2e3230] outline-none placeholder:text-[#74796e]/50"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {searchQuery && (
        <motion.button
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e4e0d8] text-[10px] text-[#74796e] transition hover:bg-[#d4ccbf]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => onSearchChange("")}
          type="button"
        >
          ✕
        </motion.button>
      )}

      <div className="h-5 w-px shrink-0 bg-[#e4e0d8]" />

      <select
        className="cursor-pointer bg-transparent text-xs font-bold text-[#74796e] outline-none"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="dueDate">Date ↑</option>
        <option value="dueDateDesc">Date ↓</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>

      <div className="h-5 w-px shrink-0 bg-[#e4e0d8]" />

      <div className="flex items-center gap-1">
        <span
          className="material-symbols-outlined text-sm text-[#74796e]"
          style={{
            fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
          }}
        >
          filter_alt
        </span>
        <select
          className="cursor-pointer bg-transparent text-xs font-bold text-[#74796e] outline-none"
          value={filterPriority}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </motion.div>
  );
}
