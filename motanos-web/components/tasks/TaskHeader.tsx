"use client";

import { motion } from "framer-motion";

const listLabels: Record<string, string> = {
  today: "Today",
  upcoming: "Upcoming",
  inbox: "Inbox",
  completed: "Completed",
  personal: "Personal",
  study: "Study",
  work: "Work",
  exercise: "Exercise",
  shopping: "Shopping",
};

export default function TaskHeader({
  activeList,
  taskCount,
  completedCount,
  totalCount,
}: {
  activeList: string;
  taskCount: number;
  completedCount: number;
  totalCount: number;
}) {
  const globalProgress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="flex items-start justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b704f]">
          Tasks
        </p>
        <h1
          className="mt-1 text-3xl font-semibold tracking-tight text-[#2e3230]"
          style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
        >
          {listLabels[activeList] || activeList}
        </h1>
        <p className="mt-0.5 text-sm text-[#74796e]">
          {taskCount} {taskCount === 1 ? "task" : "tasks"}
        </p>
      </div>

      {/* Global progress ring */}
      {totalCount > 0 && (
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-[#74796e]">
              {completedCount}/{totalCount}
            </p>
            <p className="text-[11px] font-semibold text-[#74796e]/60">
              done
            </p>
          </div>
          <div className="relative h-12 w-12">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#e4e0d8"
                strokeWidth="2.5"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#4a7c59"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${globalProgress} ${100 - globalProgress}`}
                strokeDashoffset="0"
                initial={{ strokeDasharray: `0 100` }}
                animate={{
                  strokeDasharray: `${globalProgress} ${100 - globalProgress}`,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#4a7c59]"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              {Math.round(globalProgress)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
