"use client";

import { Dispatch, SetStateAction, useSyncExternalStore } from "react";

export type Source = "idle" | "ai" | "fallback";

export type FocusTask = {
  id: string;
  title: string;
  icon: string;
  steps: string[];
  currentIndex: number;
  completed: number;
  source: Source;
};

const TASKS_KEY = "monotask.tasks";
const ACTIVE_TASK_KEY = "monotask.activeTaskId";
const listeners = new Set<() => void>();

const starterSteps = [
  "No pressure. Take one slow breath.",
  "Pick up one thing from the floor.",
  "Put it anywhere it belongs.",
];

export const starterTask: FocusTask = {
  id: "clean-room",
  title: "Clean my room",
  icon: "cleaning_services",
  steps: starterSteps,
  currentIndex: 1,
  completed: 1,
  source: "idle",
};

const starterTasks = [starterTask];
let cachedTasksRaw: string | null = null;
let cachedTasks: FocusTask[] = starterTasks;
let cachedActiveTaskId = starterTask.id;

export const iconOptions = [
  { icon: "cleaning_services", label: "Cleaning" },
  { icon: "menu_book", label: "Study" },
  { icon: "mail", label: "Message" },
  { icon: "laptop_mac", label: "Computer" },
  { icon: "shopping_bag", label: "Errand" },
  { icon: "call", label: "Call" },
  { icon: "edit_document", label: "Writing" },
  { icon: "local_florist", label: "Care" },
];

export function createTaskId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getTaskStatus(task: FocusTask) {
  if (task.completed <= 0) return "pending";
  if (task.completed >= task.steps.length) return "done";
  return "started";
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readTasksSnapshot() {
  if (typeof window === "undefined") return starterTasks;

  try {
    const stored = window.localStorage.getItem(TASKS_KEY);
    if (!stored) {
      cachedTasksRaw = null;
      cachedTasks = starterTasks;
      return cachedTasks;
    }

    if (stored === cachedTasksRaw) return cachedTasks;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      cachedTasksRaw = stored;
      cachedTasks = starterTasks;
      return cachedTasks;
    }

    const validTasks = parsed.filter((task): task is FocusTask => {
      return (
        typeof task?.id === "string" &&
        typeof task?.title === "string" &&
        typeof task?.icon === "string" &&
        Array.isArray(task?.steps)
      );
    });

    cachedTasksRaw = stored;
    cachedTasks = validTasks.length > 0 ? validTasks : starterTasks;
    return cachedTasks;
  } catch {
    return starterTasks;
  }
}

function readActiveTaskIdSnapshot() {
  const tasks = readTasksSnapshot();

  if (typeof window === "undefined") return tasks[0]?.id ?? starterTask.id;

  const stored = window.localStorage.getItem(ACTIVE_TASK_KEY);
  cachedActiveTaskId = tasks.some((task) => task.id === stored)
    ? stored ?? tasks[0].id
    : tasks[0].id;
  return cachedActiveTaskId;
}

export function useTaskStore() {
  const tasks = useSyncExternalStore(
    subscribe,
    readTasksSnapshot,
    () => starterTasks,
  );
  const activeTaskId = useSyncExternalStore(
    subscribe,
    readActiveTaskIdSnapshot,
    () => starterTask.id,
  );

  const setTasks: Dispatch<SetStateAction<FocusTask[]>> = (update) => {
    const current = readTasksSnapshot();
    const next =
      typeof update === "function"
        ? (update as (value: FocusTask[]) => FocusTask[])(current)
        : update;

    cachedTasks = next;
    cachedTasksRaw = JSON.stringify(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TASKS_KEY, cachedTasksRaw);
    }
    emitChange();
  };

  function setActiveTaskId(taskId: string) {
    cachedActiveTaskId = taskId;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(ACTIVE_TASK_KEY, taskId);
    }
    emitChange();
  }

  return {
    activeTaskId,
    setActiveTaskId,
    setTasks,
    tasks,
  };
}
