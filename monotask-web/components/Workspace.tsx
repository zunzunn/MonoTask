"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Source = "idle" | "ai" | "fallback";

const starterTask = "Clean my room";
const starterSteps = [
  "Take one slow breath.",
  "Pick up 5 things from the floor.",
  "Put clothes in one pile.",
  "Clear one small surface.",
  "Take a 2-minute reset.",
];

export default function Workspace() {
  const [taskInput, setTaskInput] = useState(starterTask);
  const [activeTask, setActiveTask] = useState(starterTask);
  const [steps, setSteps] = useState(starterSteps);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [completed, setCompleted] = useState(1);
  const [sparks, setSparks] = useState(1);
  const [potatoEnergy, setPotatoEnergy] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState<Source>("idle");
  const [showCalmZone, setShowCalmZone] = useState(false);

  const currentStep = steps[currentIndex] || "You finished this path.";
  const isComplete = currentIndex >= steps.length;

  const progressText = useMemo(() => {
    const done = Math.min(completed, steps.length);
    return `${done} / ${steps.length} tiny steps`;
  }, [completed, steps.length]);

  async function decomposeTask(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const task = taskInput.trim();

    if (!task) {
      setError("Give MonoTask one thing to hold for you.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, potatoEnergy }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Could not break down that task.");
      }

      setActiveTask(task);
      setSteps(data.steps);
      setCurrentIndex(0);
      setCompleted(0);
      setSource(data.source === "ai" ? "ai" : "fallback");
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

    const nextCompleted = completed + 1;
    setCompleted(nextCompleted);
    setSparks((value) => (value >= 5 ? 1 : value + 1));
    setCurrentIndex((index) => index + 1);
  }

  function makeEasier() {
    if (isComplete) return;

    const softened = potatoEnergy
      ? "Take one breath, then touch one thing related to this."
      : "Do only the first 30 seconds of this step.";

    setSteps((items) =>
      items.map((item, index) => (index === currentIndex ? softened : item)),
    );
    setPotatoEnergy(true);
  }

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        potatoEnergy ? "bg-[#fbf3e8]" : "bg-[#faf6f0]"
      }`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
      }}
    >
      <nav className="sticky top-0 z-50 bg-[#faf6f0]/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-[#4a7c59]"
            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
          >
            MonoTask
          </Link>
          <div className="hidden items-center gap-7 text-sm font-semibold text-[#4a4e4a] md:flex">
            <a className="border-b-2 border-[#4a7c59] pb-1 text-[#4a7c59]" href="#">
              Today
            </a>
            <a className="rounded-full px-3 py-2 transition hover:bg-[#e4e0d8]/40" href="#">
              Garden
            </a>
            <a className="rounded-full px-3 py-2 transition hover:bg-[#e4e0d8]/40" href="#">
              Settings
            </a>
          </div>
          <Link
            href="/"
            className="rounded-full border border-[#c4c8bc] px-4 py-2 text-sm font-semibold text-[#4a4e4a] transition hover:bg-white"
          >
            Landing
          </Link>
        </div>
      </nav>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl flex-col items-center justify-center px-5 py-12">
        <div className="absolute right-5 top-5 z-20 flex flex-col items-end">
          <label className="flex cursor-pointer items-center gap-3">
            <span className="text-sm font-semibold text-[#4a4e4a]">
              Potato Energy
            </span>
            <input
              checked={potatoEnergy}
              onChange={(event) => setPotatoEnergy(event.target.checked)}
              className="sr-only"
              type="checkbox"
            />
            <span
              className={`relative block h-6 w-11 rounded-full transition ${
                potatoEnergy ? "bg-[#4a7c59]" : "bg-[#c4c8bc]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  potatoEnergy ? "left-6" : "left-1"
                }`}
              />
            </span>
          </label>
          <span className="mt-1 text-xs text-[#74796e]">
            Smallest possible steps today.
          </span>
        </div>

        <section className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 overflow-hidden rounded-3xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(46,50,48,0.06)] md:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#78a886] opacity-10 blur-2xl" />

          <form onSubmit={decomposeTask} className="flex w-full flex-col gap-3 sm:flex-row">
            <input
              aria-label="Task to break down"
              value={taskInput}
              onChange={(event) => setTaskInput(event.target.value)}
              className="min-h-12 flex-1 rounded-2xl border border-[#c4c8bc] bg-[#faf6f0] px-4 text-base text-[#2e3230] outline-none transition focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/20"
              placeholder="What's the one thing you're avoiding?"
            />
            <button
              disabled={isLoading}
              className="rounded-2xl bg-[#4a7c59] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3f6d4c] disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
            >
              {isLoading ? "Breaking it down..." : "Start"}
            </button>
          </form>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74796e]">
              {progressText}
            </p>
            <h1
              className="text-4xl font-semibold tracking-tight text-[#2e3230] md:text-5xl"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              {activeTask}
            </h1>
            <p className="text-xl font-medium leading-relaxed text-[#4a4e4a] md:text-2xl">
              {isComplete ? "Path complete. Let that count." : currentStep}
            </p>
            {source === "fallback" && (
              <p className="text-xs font-semibold text-[#74796e]">
                Local steps shown. Add an AI key later for custom decomposition.
              </p>
            )}
            {error && <p className="text-sm font-semibold text-[#b83230]">{error}</p>}
          </div>

          <div className="mt-2 flex w-full max-w-xs flex-col items-center gap-4">
            <button
              onClick={completeStep}
              disabled={isComplete || isLoading}
              className="w-full rounded-2xl bg-[#4a7c59] px-8 py-4 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#3f6d4c] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              {isComplete ? "Done for now" : "Done"}
            </button>
            <button
              onClick={makeEasier}
              disabled={isComplete}
              className="text-sm font-semibold text-[#4a7c59] opacity-80 transition hover:opacity-100 disabled:opacity-40"
              type="button"
            >
              Make this easier
            </button>
          </div>
        </section>

        <div className="relative z-10 mt-14 flex w-full max-w-md items-center justify-center gap-4">
          <div className="absolute left-0 right-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-[#e4e0d8]" />
          <div
            className="absolute left-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-[#4a7c59] opacity-40 transition-all"
            style={{
              width: `${steps.length <= 1 ? 0 : Math.min((completed / steps.length) * 100, 100)}%`,
            }}
          />
          {steps.map((step, index) => {
            const isDone = index < completed;
            const isActive = index === currentIndex && !isComplete;
            const isLocked = index > completed;

            return (
              <button
                aria-label={step}
                className={`flex shrink-0 items-center justify-center rounded-full transition ${
                  isActive
                    ? "h-10 w-10 border-4 border-[#4a7c59] bg-white shadow-[0_0_15px_rgba(74,124,89,0.3)]"
                    : isDone
                      ? "h-6 w-6 bg-[#4a7c59] text-white"
                      : "h-6 w-6 border-2 border-[#c4c8bc] bg-white"
                }`}
                disabled={isLocked}
                key={`${step}-${index}`}
                onClick={() => setCurrentIndex(index)}
                type="button"
              >
                {isDone ? (
                  <span className="text-xs">✓</span>
                ) : isActive ? (
                  <span className="h-3 w-3 animate-pulse rounded-full bg-[#4a7c59]" />
                ) : null}
              </button>
            );
          })}
        </div>
      </main>

      <div className="fixed bottom-6 left-6 z-20">
        <button
          onClick={() => setShowCalmZone((value) => !value)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4e0d8] bg-[#f5f1ea] text-[#4a4e4a] shadow-sm transition hover:bg-[#f0ece4]"
          title="Calm Zone"
          type="button"
        >
          <span className="text-xl">✦</span>
        </button>
        {showCalmZone && (
          <div className="mt-3 flex gap-2 rounded-2xl border border-[#e4e0d8] bg-white/85 p-3 shadow-sm backdrop-blur">
            <span className="h-5 w-7 rounded-full bg-[#d4ccbf]" />
            <span className="h-6 w-6 rounded-full bg-[#c8e8d0]" />
            <span className="h-4 w-8 rounded-full bg-[#f8e0a8]" />
          </div>
        )}
      </div>

      <div className="fixed bottom-6 right-6 z-20 flex flex-col items-center gap-2">
        <div className="relative flex h-20 w-16 flex-col items-center justify-end overflow-hidden rounded-b-md rounded-t-2xl border border-[#c4c8bc]/40 bg-white/80 pb-2 shadow-sm backdrop-blur-sm">
          <div className="absolute left-2 top-0 h-full w-2 -skew-x-12 bg-white opacity-30" />
          <div className="relative z-10 flex flex-wrap-reverse justify-center gap-1 px-2">
            {Array.from({ length: Math.min(sparks || 5, 5) }).map((_, index) => (
              <span
                className="h-2.5 w-2.5 rounded-full bg-[#705c30] shadow-[0_0_8px_rgba(112,92,48,0.8)]"
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
