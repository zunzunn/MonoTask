"use client";

import { motion } from "framer-motion";
import { Task, primarySections, customLists, sidebarFooter } from "./types";

function getCount(list: string, tasks: Task[]): number {
  if (list === "completed") return tasks.filter((t) => t.completed).length;
  return tasks.filter((t) => t.list === list && !t.completed).length;
}

function SidebarItem({
  icon,
  label,
  count,
  active,
  disabled,
  onSelect,
}: {
  icon: string;
  label: string;
  count?: number;
  active: boolean;
  disabled?: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed opacity-40"
          : active
            ? "bg-[#4a7c59]/10 text-[#4a7c59] shadow-[inset_0_0_0_1px_rgba(74,124,89,0.15)]"
            : "text-[#4a4e4a] hover:bg-[#e4e0d8]/50 hover:text-[#2e3230]"
      }`}
      onClick={disabled ? undefined : onSelect}
      whileHover={disabled ? undefined : { x: 3 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      type="button"
    >
      <span
        className="material-symbols-outlined text-lg"
        style={{
          fontVariationSettings: `'FILL' ${active ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
          color: active ? "#4a7c59" : "#74796e",
        }}
      >
        {icon}
      </span>
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
            active
              ? "bg-[#4a7c59]/15 text-[#4a7c59]"
              : "bg-[#e4e0d8] text-[#74796e]"
          }`}
        >
          {count}
        </span>
      )}
      {disabled && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#74796e]">
          Soon
        </span>
      )}
    </motion.button>
  );
}

export default function TaskSidebar({
  activeList,
  onSelectList,
  tasks,
}: {
  activeList: string;
  onSelectList: (id: string) => void;
  tasks: Task[];
}) {
  return (
    <motion.aside
      className="sticky top-[88px] h-fit w-56 shrink-0 rounded-3xl border border-[#e4e0d8] bg-white/85 p-4 shadow-[0_14px_45px_rgba(46,50,48,0.07)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_55px_rgba(46,50,48,0.10)]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 border-b border-[#e4e0d8] pb-3">
        <span
          className="material-symbols-outlined text-[#4a7c59]"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}
        >
          bolt
        </span>
        <span
          className="text-sm font-bold tracking-tight text-[#2e3230]"
          style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
        >
          Focus
        </span>
      </div>

      {/* Primary sections */}
      <div className="space-y-0.5">
        {primarySections.map((section) => (
          <SidebarItem
            key={section.id}
            icon={section.icon}
            label={section.label}
            count={getCount(section.id, tasks)}
            active={activeList === section.id}
            onSelect={() => onSelectList(section.id)}
          />
        ))}
      </div>

      {/* Custom lists */}
      <div className="mt-4 border-t border-[#e4e0d8] pt-3">
        <p className="mb-1.5 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#74796e]">
          Lists
        </p>
        <div className="space-y-0.5">
          {customLists.map((list) => (
            <SidebarItem
              key={list.id}
              icon={list.icon}
              label={list.label}
              count={getCount(list.id, tasks)}
              active={activeList === list.id}
              onSelect={() => onSelectList(list.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer items */}
      <div className="mt-4 border-t border-[#e4e0d8] pt-3">
        <div className="space-y-0.5">
          {sidebarFooter.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={false}
              disabled
              onSelect={() => {}}
            />
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
