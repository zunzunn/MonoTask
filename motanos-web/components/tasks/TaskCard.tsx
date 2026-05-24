"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Task, Priority, primarySections, customLists } from "./types";

const priorityColors: Record<
  string,
  { dot: string; bg: string; label: string }
> = {
  high: { dot: "#b86a6a", bg: "#fdf2f2", label: "High" },
  medium: { dot: "#b8944a", bg: "#fdf8ee", label: "Med" },
  low: { dot: "#78a886", bg: "#f4faf6", label: "Low" },
};

const priorityCycle: Priority[] = ["none", "low", "medium", "high"];

function PriorityBadge({
  priority,
  onClick,
}: {
  priority: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const c =
    priorityColors[priority] ?? {
      dot: "#c4c8bc",
      bg: "#f5f5f0",
      label: "None",
    };
  return (
    <motion.button
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
      style={{ backgroundColor: c.bg, color: c.dot }}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.9 } : undefined}
      type="button"
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: c.dot }}
      />
      {c.label}
    </motion.button>
  );
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="rounded-md bg-[#f0ece4] px-2 py-0.5 text-[11px] font-semibold text-[#6b6358]">
      {tag}
    </span>
  );
}

function Checkbox({
  checked,
  onClick,
  size = "md",
}: {
  checked: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const svgSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <motion.button
      className={`relative flex shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${sizeClass}`}
      style={{
        borderColor: checked ? "#4a7c59" : "#c4c8bc",
        backgroundColor: checked ? "#4a7c59" : "transparent",
      }}
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      type="button"
    >
      {checked && (
        <motion.svg
          viewBox="0 0 24 24"
          className={`${svgSize} text-white`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            fill="currentColor"
          />
        </motion.svg>
      )}
    </motion.button>
  );
}

function CompletionBurst() {
  const dots = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * 360;
    const dist = 16 + Math.random() * 12;
    return {
      dx: Math.cos((angle * Math.PI) / 180) * dist,
      dy: Math.sin((angle * Math.PI) / 180) * dist,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#4a7c59]"
          initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
          animate={{ x: d.dx, y: d.dy, opacity: 0, scale: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: i * 0.02,
          }}
        />
      ))}
    </div>
  );
}

export default function TaskCard({
  task,
  expanded,
  onToggle,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onAddSubtask,
  onToggleSubtask,
}: {
  task: Task;
  expanded: boolean;
  onToggle: () => void;
  onToggleComplete: () => void;
  onUpdateTask: (updates: Partial<Task>) => void;
  onDeleteTask: () => void;
  onAddSubtask: (title: string) => void;
  onToggleSubtask: (id: string) => void;
}) {
  const [subtaskInput, setSubtaskInput] = useState("");
  const [newTagInput, setNewTagInput] = useState("");
  const [burstKey, setBurstKey] = useState(0);
  const moveLists = [
    ...primarySections.filter((s) => s.id !== "completed"),
    ...customLists,
  ];

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!task.completed) setBurstKey((p) => p + 1);
    onToggleComplete();
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (subtaskInput.trim()) {
      onAddSubtask(subtaskInput.trim());
      setSubtaskInput("");
    }
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const val = newTagInput.trim();
    if (val && !task.tags.includes(val)) {
      onUpdateTask({ tags: [...task.tags, val] });
      setNewTagInput("");
    }
  };

  const cyclePriority = (e: React.MouseEvent) => {
    e.stopPropagation();
    const idx = priorityCycle.indexOf(task.priority);
    const next = priorityCycle[(idx + 1) % priorityCycle.length];
    onUpdateTask({ priority: next });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`relative cursor-pointer rounded-3xl border p-5 transition-colors duration-200 ${
        expanded
          ? "border-[#b9d2bf] bg-white shadow-[0_8px_30px_rgba(46,50,48,0.08)]"
          : "border-[#e4e0d8] bg-white/85 shadow-[0_4px_20px_rgba(46,50,48,0.06)] hover:border-[#d0d4c8] hover:shadow-[0_10px_36px_rgba(46,50,48,0.10)]"
      }`}
      onClick={onToggle}
      whileHover={{ y: -2 }}
      whileTap={expanded ? undefined : { scale: 0.997 }}
    >
      {/* Main row */}
      <div className="flex items-start gap-3">
        <div className="relative">
          <Checkbox checked={task.completed} onClick={handleComplete} />
          {burstKey > 0 && <CompletionBurst key={burstKey} />}
        </div>

        <div className="min-w-0 flex-1">
          {expanded ? (
            <input
              defaultValue={task.title}
              className="w-full bg-transparent text-sm font-semibold text-[#2e3230] outline-none"
              onBlur={(e) => {
                const val = e.target.value.trim();
                if (val && val !== task.title)
                  onUpdateTask({ title: val });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={`text-sm font-semibold transition-colors ${
                task.completed
                  ? "text-[#74796e] line-through"
                  : "text-[#2e3230]"
              }`}
            >
              {task.title}
            </span>
          )}

          {/* Meta row (collapsed) */}
          {!expanded && (
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {task.dueDate && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#74796e]">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{
                      fontVariationSettings:
                        "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
                    }}
                  >
                    schedule
                  </span>
                  {task.dueDate}
                </span>
              )}
              {task.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!expanded && <PriorityBadge priority={task.priority} />}
          <motion.span
            className="material-symbols-outlined text-lg text-[#c4c8bc] transition-colors duration-200"
            style={{
              fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
            }}
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            expand_more
          </motion.span>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Meta row (expanded) */}
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#e4e0d8] pt-4">
              {/* Due date */}
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm text-[#74796e]"
                  style={{
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
                  }}
                >
                  schedule
                </span>
                <input
                  defaultValue={task.dueDate || ""}
                  className="w-28 bg-transparent text-xs font-semibold text-[#74796e] outline-none placeholder:text-[#c4c8bc]"
                  placeholder="Add date"
                  onBlur={(e) => {
                    const val = e.target.value.trim();
                    if (val !== (task.dueDate || ""))
                      onUpdateTask({ dueDate: val });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Priority cycle */}
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <PriorityBadge priority={task.priority} onClick={cyclePriority} />
              </div>

              {/* Move to list */}
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <span
                  className="material-symbols-outlined text-sm text-[#74796e]"
                  style={{
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
                  }}
                >
                  drive_file_move
                </span>
                <select
                  className="cursor-pointer rounded-lg border border-[#e4e0d8] bg-white/60 px-1.5 py-0.5 text-[11px] font-bold text-[#74796e] outline-none transition hover:border-[#c4c8bc]"
                  defaultValue={task.list}
                  onChange={(e) => {
                    e.stopPropagation();
                    onUpdateTask({ list: e.target.value });
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {moveLists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delete */}
              <motion.button
                className="ml-auto flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[#fdf2f2]"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Delete task"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-lg text-[#b86a6a]/40 transition-colors hover:text-[#b86a6a]"
                  style={{
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  delete
                </span>
              </motion.button>
            </div>

            {/* Tags */}
            <div
              className="mt-3 flex flex-wrap items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-[#f0ece4] px-2 py-0.5 text-[11px] font-semibold text-[#6b6358]"
                >
                  {tag}
                  <button
                    className="flex h-3.5 w-3.5 items-center justify-center rounded-full transition hover:bg-[#d4ccbf]"
                    onClick={() =>
                      onUpdateTask({
                        tags: task.tags.filter((t) => t !== tag),
                      })
                    }
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{
                        fontVariationSettings:
                          "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 16",
                      }}
                    >
                      close
                    </span>
                  </button>
                </span>
              ))}
              <form onSubmit={handleAddTag}>
                <input
                  className="w-16 bg-transparent text-[11px] font-semibold text-[#6b6358] outline-none placeholder:text-[#c4c8bc]"
                  placeholder="+ tag"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onBlur={() => {
                    if (newTagInput.trim()) {
                      const val = newTagInput.trim();
                      if (!task.tags.includes(val)) {
                        onUpdateTask({ tags: [...task.tags, val] });
                      }
                      setNewTagInput("");
                    }
                  }}
                />
              </form>
            </div>

            {/* Notes */}
            <div className="mt-4">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#74796e]">
                Notes
              </p>
              <textarea
                defaultValue={task.notes || ""}
                className="w-full resize-none rounded-xl border border-[#e4e0d8] bg-[#faf6f0]/50 px-3 py-2 text-sm leading-relaxed text-[#4a4e4a] outline-none transition placeholder:text-[#c4c8bc] focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/10"
                rows={3}
                placeholder="Add notes..."
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  if (val !== (task.notes || ""))
                    onUpdateTask({ notes: val });
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#74796e]">
                  Subtasks &mdash;{" "}
                  {task.subtasks.filter((s) => s.done).length}/
                  {task.subtasks.length}
                </p>
                {task.subtasks.map((st) => (
                  <div key={st.id} className="flex items-center gap-2.5 pl-1">
                    <Checkbox
                      checked={st.done}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSubtask(st.id);
                      }}
                    />
                    <span
                      className={`text-sm ${
                        st.done
                          ? "text-[#74796e] line-through"
                          : "text-[#4a4e4a]"
                      }`}
                    >
                      {st.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Add subtask */}
            <form
              className="mt-3 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleAddSubtask}
            >
              <span
                className="material-symbols-outlined text-sm text-[#c4c8bc]"
                style={{
                  fontVariationSettings:
                    "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
                }}
              >
                add
              </span>
              <input
                className="flex-1 bg-transparent text-sm text-[#2e3230] outline-none placeholder:text-[#c4c8bc]"
                placeholder="Add subtask..."
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
