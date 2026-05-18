"use client";

import { FormEvent, useMemo, useState } from "react";
import AppNav from "@/components/AppNav";
import {
  createTaskId,
  FocusTask,
  iconOptions,
  useTaskStore,
} from "@/components/taskStore";

function clampTaskProgress(task: FocusTask, steps = task.steps): FocusTask {
  const completed = Math.min(task.completed, steps.length);
  const currentIndex =
    steps.length === 0 ? 0 : Math.min(task.currentIndex, steps.length);

  return {
    ...task,
    steps,
    completed,
    currentIndex,
  };
}

export default function Workspace() {
  const { activeTaskId, setActiveTaskId, setTasks, tasks } = useTaskStore();
  const [taskInput, setTaskInput] = useState("");
  const [subtaskInput, setSubtaskInput] = useState("");
  const [draftSubtasks, setDraftSubtasks] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].icon);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newActiveSubtask, setNewActiveSubtask] = useState("");
  const [error, setError] = useState("");
  const [showCalmZone, setShowCalmZone] = useState(false);
  const [sparks, setSparks] = useState(1);

  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? tasks[0];
  const hasSubtasks = activeTask.steps.length > 0;
  const currentStep = hasSubtasks
    ? activeTask.steps[activeTask.currentIndex] || "Path complete. Let that count."
    : "No subtasks yet.";
  const isComplete = hasSubtasks && activeTask.currentIndex >= activeTask.steps.length;

  const progressText = useMemo(() => {
    const done = Math.min(activeTask.completed, activeTask.steps.length);
    return `${done} / ${activeTask.steps.length} subtasks`;
  }, [activeTask.completed, activeTask.steps.length]);

  function updateActiveTask(updater: (task: FocusTask) => FocusTask) {
    setTasks((items) =>
      items.map((task) => (task.id === activeTask.id ? updater(task) : task)),
    );
  }

  function addDraftSubtask(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const subtask = subtaskInput.trim();

    if (!subtask) return;

    setDraftSubtasks((items) => [...items, subtask]);
    setSubtaskInput("");
  }

  function removeDraftSubtask(indexToRemove: number) {
    setDraftSubtasks((items) =>
      items.filter((_, index) => index !== indexToRemove),
    );
  }

  function addTask(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const title = taskInput.trim();

    if (!title) {
      setError("Give MotAnos one thing to hold for you.");
      return;
    }

    const inlineSubtask = subtaskInput.trim();
    const steps = inlineSubtask ? [...draftSubtasks, inlineSubtask] : draftSubtasks;
    const newTask: FocusTask = {
      id: createTaskId(),
      title,
      icon: selectedIcon,
      steps,
      currentIndex: 0,
      completed: 0,
      source: "manual",
    };

    setTasks((items) => [newTask, ...items]);
    setActiveTaskId(newTask.id);
    setTaskInput("");
    setSubtaskInput("");
    setDraftSubtasks([]);
    setError("");
  }

  function completeStep() {
    if (!hasSubtasks || isComplete) return;

    updateActiveTask((task) =>
      clampTaskProgress({
        ...task,
        completed: task.completed + 1,
        currentIndex: task.currentIndex + 1,
      }),
    );
    setSparks((value) => (value >= 5 ? 1 : value + 1));
  }

  function chooseStep(index: number) {
    if (index > activeTask.completed) return;
    updateActiveTask((task) => clampTaskProgress({ ...task, currentIndex: index }));
  }

  function addActiveSubtask(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const subtask = newActiveSubtask.trim();

    if (!subtask) return;

    updateActiveTask((task) =>
      clampTaskProgress(task, [...task.steps, subtask]),
    );
    setNewActiveSubtask("");
  }

  function startEditingSubtask(index: number) {
    setEditIndex(index);
    setEditValue(activeTask.steps[index] ?? "");
  }

  function saveEditedSubtask(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const nextValue = editValue.trim();

    if (editIndex === null || !nextValue) {
      setEditIndex(null);
      setEditValue("");
      return;
    }

    updateActiveTask((task) =>
      clampTaskProgress(
        task,
        task.steps.map((step, index) => (index === editIndex ? nextValue : step)),
      ),
    );
    setEditIndex(null);
    setEditValue("");
  }

  function deleteActiveSubtask(indexToRemove: number) {
    updateActiveTask((task) =>
      clampTaskProgress(
        task,
        task.steps.filter((_, index) => index !== indexToRemove),
      ),
    );
    if (editIndex === indexToRemove) {
      setEditIndex(null);
      setEditValue("");
    }
  }

  function moveActiveSubtask(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= activeTask.steps.length) return;

    updateActiveTask((task) => {
      const steps = [...task.steps];
      const [moved] = steps.splice(index, 1);
      steps.splice(targetIndex, 0, moved);
      return clampTaskProgress(task, steps);
    });
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#faf6f0] transition-colors duration-300"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
      }}
    >
      <AppNav />

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
        <section className="relative z-20 mb-5 flex w-full max-w-[720px] flex-col gap-4 overflow-hidden rounded-3xl border border-[#e4e0d8] bg-white/90 p-4 shadow-[0_14px_45px_rgba(46,50,48,0.07)] backdrop-blur-xl transition-all duration-700 md:p-5">
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

            <input
              aria-label="Task to add"
              className="min-h-12 rounded-2xl border border-[#c4c8bc] bg-[#faf6f0] px-4 text-base text-[#2e3230] outline-none transition focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/20"
              id="task-intake"
              onChange={(event) => setTaskInput(event.target.value)}
              placeholder="Add the main task..."
              value={taskInput}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                aria-label="Subtask to add"
                className="min-h-12 flex-1 rounded-2xl border border-[#ead9c7] bg-white/70 px-4 text-base text-[#2e3230] outline-none transition focus:border-[#d9a273] focus:ring-4 focus:ring-[#d9a273]/20"
                onChange={(event) => setSubtaskInput(event.target.value)}
                placeholder="Optional subtask, written by you..."
                value={subtaskInput}
              />
              <button
                className="rounded-2xl border border-[#c4c8bc] px-5 py-3 text-sm font-bold text-[#4a7c59] transition hover:bg-[#e8f1e8]"
                onClick={() => addDraftSubtask()}
                type="button"
              >
                Add subtask
              </button>
            </div>

            {draftSubtasks.length > 0 && (
              <div className="flex flex-col gap-2 rounded-2xl border border-[#ead9c7] bg-[#fffaf4]/70 p-3">
                {draftSubtasks.map((subtask, index) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-[#4a4e4a]"
                    key={`${subtask}-${index}`}
                  >
                    <span>{subtask}</span>
                    <button
                      className="text-[#9b704f] transition hover:text-[#b83230]"
                      onClick={() => removeDraftSubtask(index)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              className="rounded-2xl bg-[#4a7c59] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3f6d4c]"
              type="submit"
            >
              Save task
            </button>
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

        <section className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 overflow-hidden rounded-3xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all duration-700 md:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#78a886] opacity-10 blur-2xl transition-colors duration-700" />

          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c4c8bc] bg-[#faf6f0] text-[#4a7c59] transition-all duration-500">
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
          </div>

          <div className="mt-2 flex w-full max-w-xs flex-col items-center gap-4">
            <button
              className="w-full rounded-2xl bg-[#4a7c59] px-8 py-4 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#3f6d4c] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasSubtasks || isComplete}
              onClick={completeStep}
              type="button"
            >
              {isComplete ? "Done for now" : "Done"}
            </button>
          </div>
        </section>

        <section className="relative z-10 mt-6 w-full max-w-2xl rounded-3xl border border-[#e4e0d8] bg-white/85 p-5 shadow-[0_10px_35px_rgba(46,50,48,0.06)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b704f]">
                Subtasks
              </p>
              <h2
                className="mt-1 text-2xl font-semibold tracking-tight text-[#2e3230]"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Shape the path yourself.
              </h2>
            </div>
          </div>

          <form onSubmit={addActiveSubtask} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              aria-label="New subtask"
              className="min-h-12 flex-1 rounded-2xl border border-[#c4c8bc] bg-[#faf6f0] px-4 text-base text-[#2e3230] outline-none transition focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/20"
              onChange={(event) => setNewActiveSubtask(event.target.value)}
              placeholder="Add a small subtask..."
              value={newActiveSubtask}
            />
            <button
              className="rounded-2xl bg-[#4a7c59] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3f6d4c]"
              type="submit"
            >
              Add
            </button>
          </form>

          <div className="mt-5 flex flex-col gap-3">
            {activeTask.steps.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#ead9c7] bg-[#fffaf4]/65 p-5 text-sm font-semibold text-[#9b704f]">
                No subtasks yet.
              </div>
            ) : (
              activeTask.steps.map((step, index) => {
                const isDone = index < activeTask.completed;
                const isActive = index === activeTask.currentIndex && !isComplete;
                const isEditing = editIndex === index;

                return (
                  <div
                    className={`rounded-2xl border p-3 transition ${
                      isActive
                        ? "border-[#b9d2bf] bg-[#e8f1e8]"
                        : "border-[#ead9c7] bg-[#fffaf4]/65"
                    }`}
                    key={`${step}-${index}`}
                  >
                    {isEditing ? (
                      <form onSubmit={saveEditedSubtask} className="flex gap-2">
                        <input
                          aria-label="Edit subtask"
                          className="min-h-10 flex-1 rounded-xl border border-[#c4c8bc] bg-white px-3 text-sm text-[#2e3230] outline-none transition focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/20"
                          onChange={(event) => setEditValue(event.target.value)}
                          value={editValue}
                        />
                        <button
                          className="rounded-xl bg-[#4a7c59] px-3 text-sm font-bold text-white"
                          type="submit"
                        >
                          Save
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          aria-label={step}
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                            isDone
                              ? "bg-[#4a7c59] text-white"
                              : isActive
                                ? "border-4 border-[#4a7c59] bg-white"
                                : "border-2 border-[#c4c8bc] bg-white"
                          }`}
                          disabled={index > activeTask.completed}
                          onClick={() => chooseStep(index)}
                          type="button"
                        >
                          {isDone ? <span className="text-xs">✓</span> : null}
                        </button>
                        <span className="min-w-0 flex-1 text-left text-sm font-semibold leading-6 text-[#4a4e4a]">
                          {step}
                        </span>
                        <div className="flex shrink-0 items-center gap-1">
                          <button
                            className="rounded-full px-2 py-1 text-xs font-bold text-[#74796e] transition hover:bg-white"
                            disabled={index === 0}
                            onClick={() => moveActiveSubtask(index, -1)}
                            type="button"
                          >
                            Up
                          </button>
                          <button
                            className="rounded-full px-2 py-1 text-xs font-bold text-[#74796e] transition hover:bg-white"
                            disabled={index === activeTask.steps.length - 1}
                            onClick={() => moveActiveSubtask(index, 1)}
                            type="button"
                          >
                            Down
                          </button>
                          <button
                            className="rounded-full px-2 py-1 text-xs font-bold text-[#4a7c59] transition hover:bg-white"
                            onClick={() => startEditingSubtask(index)}
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-full px-2 py-1 text-xs font-bold text-[#9b704f] transition hover:bg-white hover:text-[#b83230]"
                            onClick={() => deleteActiveSubtask(index)}
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {activeTask.steps.length > 0 && (
          <div className="relative z-10 mt-14 flex w-full max-w-md items-center justify-center gap-4">
            <div className="absolute left-0 right-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-[#e4e0d8]" />
            <div
              className="absolute left-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-[#4a7c59] opacity-40 transition-all"
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
            {activeTask.steps.map((step, index) => {
              const isDone = index < activeTask.completed;
              const isActive = index === activeTask.currentIndex && !isComplete;
              const isLocked = index > activeTask.completed;

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
                  onClick={() => chooseStep(index)}
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
        )}
      </main>

      <div className="fixed bottom-6 left-6 z-20">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4e0d8] bg-[#f5f1ea] text-[#4a4e4a] shadow-sm transition hover:bg-[#f0ece4]"
          onClick={() => setShowCalmZone((value) => !value)}
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
        <div className="relative flex h-20 w-16 flex-col items-center justify-end overflow-hidden rounded-b-md rounded-t-2xl border border-[#c4c8bc]/40 bg-white/80 pb-2 shadow-sm backdrop-blur-sm transition-colors duration-500">
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
