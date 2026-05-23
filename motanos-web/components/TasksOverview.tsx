"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AppNav from "@/components/AppNav";
import { FocusTask, getTaskStatus, useTaskStore } from "@/components/taskStore";

const groups = [
  {
    key: "pending",
    label: "Pending",
    helper: "Not started yet. Still safely held.",
  },
  {
    key: "started",
    label: "Started",
    helper: "Already in motion.",
  },
  {
    key: "done",
    label: "Done",
    helper: "Finished paths.",
  },
] as const;

function progressFor(task: FocusTask) {
  if (task.steps.length === 0) return 0;
  return Math.min(Math.round((task.completed / task.steps.length) * 100), 100);
}

function previewFor(task: FocusTask) {
  if (task.completed >= task.steps.length) {
    return "Path complete. Let that count.";
  }

  return task.steps[task.currentIndex] ?? task.steps[task.completed] ?? task.steps[0];
}

export default function TasksOverview() {
  const router = useRouter();
  const { activeTaskId, setActiveTaskId, tasks } = useTaskStore();

  const pending = tasks.filter((task) => getTaskStatus(task) === "pending");
  const started = tasks.filter((task) => getTaskStatus(task) === "started");
  const done = tasks.filter((task) => getTaskStatus(task) === "done");

  const groupedTasks = {
    pending,
    started,
    done,
  };

  function openTask(taskId: string) {
    setActiveTaskId(taskId);
    router.push("/app");
  }

  return (
    <div
      className="min-h-screen bg-[#faf6f0] text-[#2e3230]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
      }}
    >
      <AppNav />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 md:px-8">
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-[#e4e0d8] bg-white/90 p-6 shadow-[0_14px_45px_rgba(46,50,48,0.07)] backdrop-blur-xl md:p-8"
          initial={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b704f]">
                Tasks
              </p>
              <h1
                className="mt-2 text-4xl font-semibold tracking-tight text-[#2e3230] md:text-5xl"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Every focus you are holding.
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#4a4e4a]">
                Track what has not started, what is already moving, and what is
                done without turning it into a dashboard.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <SummaryPill count={pending.length} label="Pending" />
              <SummaryPill count={started.length} label="Started" />
              <SummaryPill count={done.length} label="Done" />
            </div>
          </div>
        </motion.section>

        <motion.div
          animate="show"
          className="grid gap-5 lg:grid-cols-3"
          initial="hidden"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {groups.map((group) => (
            <section
              className="rounded-3xl border border-[#e4e0d8] bg-white/85 p-4 shadow-[0_12px_42px_rgba(46,50,48,0.06)] backdrop-blur"
              key={group.key}
            >
              <div className="mb-4 flex items-start justify-between gap-3 px-1">
                <div>
                  <h2
                    className="text-2xl font-semibold tracking-tight text-[#2e3230]"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    {group.label}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[#74796e]">
                    {group.helper}
                  </p>
                </div>
                <span className="rounded-full bg-[#f0ece4] px-3 py-1 text-sm font-bold text-[#4a4e4a]">
                  {groupedTasks[group.key].length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {groupedTasks[group.key].length === 0 ? (
                  <motion.div
                    className="rounded-3xl border border-dashed border-[#e4e0d8] bg-white/45 p-5 text-sm font-semibold text-[#74796e]"
                    variants={cardVariants}
                  >
                    Nothing here right now.
                  </motion.div>
                ) : (
                  groupedTasks[group.key].map((task) => (
                    <TaskCard
                      isActive={task.id === activeTaskId}
                      key={task.id}
                      onOpen={() => openTask(task.id)}
                      task={task}
                    />
                  ))
                )}
              </div>
            </section>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

function SummaryPill({ count, label }: { count: number; label: string }) {
  return (
    <div className="rounded-2xl border border-[#e4e0d8] bg-white/55 px-4 py-3 text-center shadow-sm">
      <div
        className="text-2xl font-semibold text-[#4a7c59]"
        style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
      >
        {count}
      </div>
      <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#74796e]">
        {label}
      </div>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function TaskCard({
  isActive,
  onOpen,
  task,
}: {
  isActive: boolean;
  onOpen: () => void;
  task: FocusTask;
}) {
  const progress = progressFor(task);
  const status = getTaskStatus(task);

  return (
    <motion.button
      className={`group w-full rounded-3xl border p-5 text-left shadow-sm transition-colors ${
        isActive
          ? "border-[#b9d2bf] bg-[#e8f1e8]"
          : "border-[#e4e0d8] bg-white/65 hover:bg-white"
      }`}
      onClick={onOpen}
      transition={{ duration: 0.24, ease: "easeOut" }}
      type="button"
      variants={cardVariants}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
            isActive
              ? "border-[#b9d2bf] bg-white/70 text-[#4a7c59]"
              : "border-[#e4e0d8] bg-white/70 text-[#6b6358]"
          }`}
        >
          <span className="material-symbols-outlined text-[25px]">
            {task.icon}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3
              className="truncate text-xl font-semibold tracking-tight text-[#2e3230]"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              {task.title}
            </h3>
            <span className="rounded-full bg-[#f0ece4] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#4a4e4a]">
              {status}
            </span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#4a4e4a]">
            {previewFor(task)}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#74796e]">
          <span>
            {Math.min(task.completed, task.steps.length)} / {task.steps.length}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#e4e0d8]">
          <motion.div
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full bg-[#4a7c59]"
            initial={{ width: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.button>
  );
}
