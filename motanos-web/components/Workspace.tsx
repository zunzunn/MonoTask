"use client";

import { FormEvent, useMemo, useState } from "react";
import AppNav from "@/components/AppNav";
import {
  createTaskId,
  FocusTask,
  iconOptions,
  useTaskStore,
} from "@/components/taskStore";

export default function Workspace() {
  const { activeTaskId, setActiveTaskId, setTasks, tasks } = useTaskStore();
  const [taskInput, setTaskInput] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].icon);
  const [tinyStepsMode, setTinyStepsMode] = useState(true);
  const [modeMessage, setModeMessage] = useState("We'll make this smaller.");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCalmZone, setShowCalmZone] = useState(false);
  const [sparks, setSparks] = useState(1);

  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? tasks[0];
  const currentStep =
    activeTask.steps[activeTask.currentIndex] || "You finished this path.";
  const isComplete = activeTask.currentIndex >= activeTask.steps.length;

  const progressText = useMemo(() => {
    const done = Math.min(activeTask.completed, activeTask.steps.length);
    return tinyStepsMode
      ? `${done} / ${activeTask.steps.length} soft steps`
      : `${done} / ${activeTask.steps.length} tiny steps`;
  }, [activeTask.completed, activeTask.steps.length, tinyStepsMode]);

  const visibleSteps = tinyStepsMode
    ? activeTask.steps.filter(
        (_, index) =>
          index <= Math.max(activeTask.completed, activeTask.currentIndex + 1),
      )
    : activeTask.steps;

  function updateActiveTask(updater: (task: FocusTask) => FocusTask) {
    setTasks((items) =>
      items.map((task) => (task.id === activeTask.id ? updater(task) : task)),
    );
  }

  function setMode(enabled: boolean) {
    setTinyStepsMode(enabled);
    setModeMessage(enabled ? "We'll make this smaller." : "Back to the full path.");

    if (enabled && !isComplete) {
      updateActiveTask((task) => ({
        ...task,
        steps: task.steps.map((item, index) =>
          index === task.currentIndex && !item.toLowerCase().startsWith("no pressure")
            ? `No pressure. ${item}`
            : item,
        ),
      }));
    }

    window.setTimeout(() => setModeMessage(""), 2200);
  }

  async function addTask(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const title = taskInput.trim();

    if (!title) {
      setError("Give MotAnos one thing to hold for you.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: title, potatoEnergy: tinyStepsMode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Could not break down that task.");
      }

      const newTask: FocusTask = {
        id: createTaskId(),
        title,
        icon: selectedIcon,
        steps: data.steps,
        currentIndex: 0,
        completed: 0,
        source: data.source === "ai" ? "ai" : "fallback",
      };

      setTasks((items) => [newTask, ...items]);
      setActiveTaskId(newTask.id);
      setTaskInput("");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not break down that task.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function completeStep() {
    if (isComplete) return;

    updateActiveTask((task) => ({
      ...task,
      completed: task.completed + 1,
      currentIndex: task.currentIndex + 1,
    }));
    setSparks((value) => (value >= 5 ? 1 : value + 1));
  }

  function makeEasier() {
    if (isComplete) return;

    const softened = tinyStepsMode
      ? "No pressure. Just touch one thing related to this."
      : "Do only the first 30 seconds of this step.";

    updateActiveTask((task) => ({
      ...task,
      steps: task.steps.map((item, index) =>
        index === task.currentIndex ? softened : item,
      ),
    }));
    setMode(true);
  }

  function chooseStep(index: number) {
    if (index > activeTask.completed) return;
    updateActiveTask((task) => ({ ...task, currentIndex: index }));
  }

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        tinyStepsMode ? "bg-[#fff3e8]" : "bg-[#faf6f0]"
      }`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
      }}
    >
      <AppNav tinyStepsMode={tinyStepsMode} />

      <aside className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 md:block">
        <div className="flex max-h-[74vh] w-[76px] flex-col items-center gap-4 overflow-hidden rounded-full border border-[#e5ddcf]/80 bg-[#fffaf4]/82 px-3 py-4 shadow-[0_18px_55px_rgba(46,50,48,0.08)] backdrop-blur-xl">
          <div className="flex max-h-[46vh] flex-col items-center gap-3 overflow-y-auto px-1 py-1">
            {tasks.map((task) => {
              const isActive = task.id === activeTask.id;
              return (
                <button
                  aria-label={`Switch to ${task.title}`}
                  className={`group flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${
                    isActive
                      ? "border-[#b9d2bf] bg-[#e8f1e8] text-[#4a7c59] shadow-[0_0_0_8px_rgba(74,124,89,0.08)]"
                      : "border-transparent bg-transparent text-[#4a4e4a] hover:bg-white/70"
                  }`}
                  key={task.id}
                  onClick={() => setActiveTaskId(task.id)}
                  title={task.title}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[25px]"
                    style={{
                      fontVariationSettings: isActive
                        ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                        : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {task.icon}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="h-px w-8 bg-[#e5ddcf]" />
          <button
            className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ead9c7] bg-[#fffaf4] text-[#4a7c59] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            onClick={() => {
              setTaskInput("");
              window.setTimeout(() => {
                document.getElementById("task-intake")?.focus();
              }, 50);
            }}
            title="Add task"
            type="button"
          >
            <span
              className="material-symbols-outlined text-[28px]"
              style={{
                fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24",
              }}
            >
              add
            </span>
          </button>
        </div>
      </aside>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl flex-col items-center justify-center px-5 py-12 md:pl-24">
        <div className="absolute right-5 top-5 z-20 flex flex-col items-end">
          <label className="flex cursor-pointer items-center gap-3">
            <span className="text-sm font-semibold text-[#4a4e4a]">
              Tiny Steps Mode
            </span>
            <input
              checked={tinyStepsMode}
              onChange={(event) => setMode(event.target.checked)}
              className="sr-only"
              type="checkbox"
            />
            <span
              className={`relative block h-6 w-11 rounded-full transition ${
                tinyStepsMode ? "bg-[#d9a273]" : "bg-[#c4c8bc]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  tinyStepsMode ? "left-6" : "left-1"
                }`}
              />
            </span>
          </label>
          <span className="mt-1 text-xs text-[#74796e]">
            Smallest possible steps today.
          </span>
        </div>

        {modeMessage && (
          <div
            className={`mb-5 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-500 ${
              tinyStepsMode
                ? "bg-[#fffaf4] text-[#705c30]"
                : "bg-white text-[#4a4e4a]"
            }`}
          >
            {modeMessage}
          </div>
        )}

        <section
          className={`relative z-20 mb-5 flex w-full max-w-[720px] flex-col gap-4 overflow-hidden rounded-3xl border p-4 shadow-[0_14px_45px_rgba(46,50,48,0.07)] backdrop-blur-xl transition-all duration-700 md:p-5 ${
            tinyStepsMode
              ? "border-[#ead9c7] bg-[#fffaf4]/92"
              : "border-[#e4e0d8] bg-white/90"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b704f]">
                Add a focus
              </p>
              <h2
                className="mt-1 text-xl font-semibold tracking-tight text-[#2e3230]"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Give this task a place to land.
              </h2>
            </div>
            <div className="hidden rounded-full bg-[#fff3e8] px-3 py-2 text-xs font-semibold text-[#705c30] sm:block">
              {tasks.length} active
            </div>
          </div>

          <form onSubmit={addTask} className="flex flex-col gap-3">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {iconOptions.map((option) => {
                const isSelected = selectedIcon === option.icon;
                return (
                  <button
                    aria-label={option.label}
                    className={`flex h-11 items-center justify-center rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-[#b9d2bf] bg-[#e8f1e8] text-[#4a7c59] shadow-sm"
                        : "border-[#ead9c7] bg-white/60 text-[#6b6358] hover:bg-white"
                    }`}
                    key={option.icon}
                    onClick={() => setSelectedIcon(option.icon)}
                    title={option.label}
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={{
                        fontVariationSettings: isSelected
                          ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                      }}
                    >
                      {option.icon}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                aria-label="Task to add"
                className={`min-h-12 flex-1 rounded-2xl border px-4 text-base text-[#2e3230] outline-none transition focus:ring-4 ${
                  tinyStepsMode
                    ? "border-[#e8c0a0] bg-[#fff3e8] focus:border-[#d9a273] focus:ring-[#d9a273]/20"
                    : "border-[#c4c8bc] bg-[#faf6f0] focus:border-[#4a7c59] focus:ring-[#4a7c59]/20"
                }`}
                id="task-intake"
                onChange={(event) => setTaskInput(event.target.value)}
                placeholder="Add another thing you're avoiding..."
                value={taskInput}
              />
              <button
                className={`rounded-2xl px-5 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  tinyStepsMode
                    ? "bg-[#d9a273] hover:bg-[#c88c5e]"
                    : "bg-[#4a7c59] hover:bg-[#3f6d4c]"
                }`}
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Adding..." : "Add task"}
              </button>
            </div>
          </form>
          {error && <p className="text-sm font-semibold text-[#b83230]">{error}</p>}
        </section>

        <div className="mb-5 flex w-full max-w-[720px] gap-3 overflow-x-auto pb-1 md:hidden">
          {tasks.map((task) => (
            <button
              className={`flex min-w-fit items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                task.id === activeTask.id
                  ? "border-[#b9d2bf] bg-[#e8f1e8] text-[#4a7c59]"
                  : "border-[#ead9c7] bg-[#fffaf4] text-[#4a4e4a]"
              }`}
              key={task.id}
              onClick={() => setActiveTaskId(task.id)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">{task.icon}</span>
              {task.title}
            </button>
          ))}
        </div>

        <section
          className={`relative z-10 flex w-full flex-col items-center gap-8 overflow-hidden rounded-3xl p-6 text-center transition-all duration-700 md:p-12 ${
            tinyStepsMode
              ? "max-w-[720px] scale-[1.02] bg-[#fffaf4] shadow-[0_18px_60px_rgba(112,92,48,0.12)]"
              : "max-w-2xl bg-white shadow-[0_4px_20px_rgba(46,50,48,0.06)]"
          }`}
        >
          <div
            className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-colors duration-700 ${
              tinyStepsMode ? "bg-[#f4d6c4] opacity-40" : "bg-[#78a886] opacity-10"
            }`}
          />

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500 ${
              tinyStepsMode
                ? "border-[#ead9c7] bg-[#fff3e8] text-[#d9a273]"
                : "border-[#c4c8bc] bg-[#faf6f0] text-[#4a7c59]"
            }`}
          >
            <span className="material-symbols-outlined text-[28px]">
              {activeTask.icon}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74796e]">
              {progressText}
            </p>
            <h1
              className="text-4xl font-semibold tracking-tight text-[#2e3230] md:text-5xl"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              {activeTask.title}
            </h1>
            <p className="text-xl font-medium leading-relaxed text-[#4a4e4a] md:text-2xl">
              {isComplete ? "Path complete. Let that count." : currentStep}
            </p>
            {activeTask.source === "fallback" && (
              <p className="text-xs font-semibold text-[#74796e]">
                Local steps shown. Add an AI key later for custom decomposition.
              </p>
            )}
          </div>

          <div className="mt-2 flex w-full max-w-xs flex-col items-center gap-4">
            <button
              className={`w-full rounded-2xl px-8 py-4 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 ${
                tinyStepsMode
                  ? "bg-[#d9a273] hover:bg-[#c88c5e]"
                  : "bg-[#4a7c59] hover:bg-[#3f6d4c]"
              }`}
              disabled={isComplete || isLoading}
              onClick={completeStep}
              type="button"
            >
              {isComplete ? "Done for now" : tinyStepsMode ? "Tiny win" : "Done"}
            </button>
            <button
              className={`text-sm font-semibold opacity-80 transition hover:opacity-100 disabled:opacity-40 ${
                tinyStepsMode ? "text-[#b6784d]" : "text-[#4a7c59]"
              }`}
              disabled={isComplete}
              onClick={makeEasier}
              type="button"
            >
              {tinyStepsMode ? "Even smaller" : "Make this easier"}
            </button>
          </div>
        </section>

        <div className="relative z-10 mt-14 flex w-full max-w-md items-center justify-center gap-4">
          <div className="absolute left-0 right-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-[#e4e0d8]" />
          <div
            className={`absolute left-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 opacity-40 transition-all ${
              tinyStepsMode ? "bg-[#d9a273]" : "bg-[#4a7c59]"
            }`}
            style={{
              width: `${
                activeTask.steps.length <= 1
                  ? 0
                  : Math.min(
                      (activeTask.completed / activeTask.steps.length) * 100,
                      100,
                    )
              }%`,
            }}
          />
          {visibleSteps.map((step, index) => {
            const isDone = index < activeTask.completed;
            const isActive = index === activeTask.currentIndex && !isComplete;
            const isLocked = index > activeTask.completed;

            return (
              <button
                aria-label={step}
                className={`flex shrink-0 items-center justify-center rounded-full transition ${
                  isActive
                    ? tinyStepsMode
                      ? "h-12 w-12 border-4 border-[#d9a273] bg-[#fffaf4] shadow-[0_0_24px_rgba(217,162,115,0.35)]"
                      : "h-10 w-10 border-4 border-[#4a7c59] bg-white shadow-[0_0_15px_rgba(74,124,89,0.3)]"
                    : isDone
                      ? tinyStepsMode
                        ? "h-7 w-7 bg-[#d9a273] text-white"
                        : "h-6 w-6 bg-[#4a7c59] text-white"
                      : "h-6 w-6 border-2 border-[#c4c8bc] bg-white"
                }`}
                disabled={isLocked}
                key={`${step}-${index}`}
                onClick={() => chooseStep(index)}
                type="button"
              >
                {isDone ? (
                  <span className="text-xs">✓</span>
                ) : isActive ? (
                  <span
                    className={`h-3 w-3 animate-pulse rounded-full ${
                      tinyStepsMode ? "bg-[#d9a273]" : "bg-[#4a7c59]"
                    }`}
                  />
                ) : null}
              </button>
            );
          })}
          {tinyStepsMode && activeTask.steps.length > visibleSteps.length && (
            <span className="rounded-full bg-[#fffaf4] px-3 py-1 text-xs font-semibold text-[#9b704f]">
              rest hidden
            </span>
          )}
        </div>
      </main>

      <div className="fixed bottom-6 left-6 z-20">
        <button
          className={`flex h-12 w-12 items-center justify-center rounded-full border text-[#4a4e4a] shadow-sm transition ${
            tinyStepsMode
              ? "border-[#e8c0a0] bg-[#fffaf4] hover:bg-[#fff3e8]"
              : "border-[#e4e0d8] bg-[#f5f1ea] hover:bg-[#f0ece4]"
          }`}
          onClick={() => setShowCalmZone((value) => !value)}
          title="Calm Zone"
          type="button"
        >
          <span className="text-xl">✦</span>
        </button>
        {showCalmZone && (
          <div className="mt-3 flex gap-2 rounded-2xl border border-[#e4e0d8] bg-white/85 p-3 shadow-sm backdrop-blur">
            <span className="h-5 w-7 rounded-full bg-[#d4ccbf]" />
            <span
              className={`h-6 w-6 rounded-full ${
                tinyStepsMode ? "bg-[#f4d6c4]" : "bg-[#c8e8d0]"
              }`}
            />
            <span className="h-4 w-8 rounded-full bg-[#f8e0a8]" />
          </div>
        )}
      </div>

      <div className="fixed bottom-6 right-6 z-20 flex flex-col items-center gap-2">
        <div
          className={`relative flex h-20 w-16 flex-col items-center justify-end overflow-hidden rounded-b-md rounded-t-2xl border pb-2 shadow-sm backdrop-blur-sm transition-colors duration-500 ${
            tinyStepsMode
              ? "border-[#e8c0a0]/60 bg-[#fffaf4]/85"
              : "border-[#c4c8bc]/40 bg-white/80"
          }`}
        >
          <div className="absolute left-2 top-0 h-full w-2 -skew-x-12 bg-white opacity-30" />
          <div className="relative z-10 flex flex-wrap-reverse justify-center gap-1 px-2">
            {Array.from({ length: Math.min(sparks || 5, 5) }).map((_, index) => (
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  tinyStepsMode
                    ? "bg-[#d9a273] shadow-[0_0_10px_rgba(217,162,115,0.85)]"
                    : "bg-[#705c30] shadow-[0_0_8px_rgba(112,92,48,0.8)]"
                }`}
                key={index}
              />
            ))}
          </div>
        </div>
        <span className="text-xs font-semibold text-[#705c30]">
          {sparks} / 5 sparks
        </span>
      </div>
    </div>
  );
}
