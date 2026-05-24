"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TaskInput({
  onCreate,
  inputRef,
}: {
  onCreate: (title: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const [title, setTitle] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        className={`flex items-center gap-3 rounded-2xl border bg-white/70 px-4 py-3 transition-all duration-200 ${
          focused ? "shadow-[0_0_0_4px_rgba(74,124,89,0.10)]" : ""
        }`}
        style={{
          borderColor: focused ? "#4a7c59" : "#c4c8bc",
        }}
      >
        <span
          className="material-symbols-outlined text-lg text-[#4a7c59]"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
        >
          add_circle
        </span>
        <input
          ref={inputRef}
          className="flex-1 bg-transparent text-sm font-semibold text-[#2e3230] outline-none placeholder:text-[#74796e]/60"
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {title.trim() && (
          <motion.button
            type="submit"
            className="rounded-xl bg-[#4a7c59] px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_2px_8px_rgba(74,124,89,0.25)] transition hover:bg-[#3f6d4c]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </motion.button>
        )}
      </motion.div>
    </form>
  );
}
