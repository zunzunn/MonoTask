"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppNav from "@/components/AppNav";
import TaskSidebar from "@/components/tasks/TaskSidebar";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskToolbar from "@/components/tasks/TaskToolbar";
import TaskInput from "@/components/tasks/TaskInput";
import TaskCard from "@/components/tasks/TaskCard";
import EmptyState from "@/components/tasks/EmptyState";
import { useTaskStore } from "@/store/taskStore";
import {
  Task,
  primarySections,
  customLists,
} from "@/components/tasks/types";

const allSections = [...primarySections, ...customLists];

export default function TasksPage() {
  const [activeList, setActiveList] = useState("today");
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [filterPriority, setFilterPriority] = useState("all");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const tasks = useTaskStore((s) => s.tasks);
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const toggleComplete = useTaskStore((s) => s.toggleComplete);
  const addSubtask = useTaskStore((s) => s.addSubtask);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);

  const baseTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (activeList === "completed") return task.completed;
        return task.list === activeList && !task.completed;
      }),
    [tasks, activeList],
  );

  const searchedTasks = useMemo(() => {
    if (!searchQuery) return baseTasks;
    const q = searchQuery.toLowerCase();
    return baseTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(q) ||
        task.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [baseTasks, searchQuery]);

  const priorityFiltered = useMemo(() => {
    if (filterPriority === "all") return searchedTasks;
    return searchedTasks.filter(
      (task) => task.priority === filterPriority,
    );
  }, [searchedTasks, filterPriority]);

  const sortedTasks = useMemo(() => {
    const sorted = [...priorityFiltered];
    switch (sortBy) {
      case "dueDate":
        sorted.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        });
        break;
      case "dueDateDesc":
        sorted.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return b.dueDate.localeCompare(a.dueDate);
        });
        break;
      case "priority": {
        const order = { high: 0, medium: 1, low: 2, none: 3 };
        sorted.sort(
          (a, b) => order[a.priority] - order[b.priority],
        );
        break;
      }
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return sorted;
  }, [priorityFiltered, sortBy]);

  const handleCreateTask = (title: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      dueDate: "",
      priority: "none",
      tags: [],
      notes: "",
      subtasks: [],
      completed: false,
      list: activeList === "completed" ? "inbox" : activeList,
    };
    addTask(newTask);
    setExpandedTaskId(newTask.id);
  };

  const emptyType =
    searchQuery
      ? "search"
      : filterPriority !== "all"
        ? "filtered"
        : activeList === "completed"
          ? "completed"
          : "empty";

  const focusInput = () => inputRef.current?.focus();

  const allCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div
      className="min-h-screen bg-[#faf6f0] transition-colors duration-300"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
      }}
    >
      <AppNav />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#4a7c59] opacity-[0.08] blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#78a886] opacity-[0.08] blur-3xl" />
        <div className="absolute left-1/3 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[#c8e8d0] opacity-[0.08] blur-3xl md:block" />
      </div>

      {/* Mobile section switcher */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-6 md:hidden">
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
          {allSections.map((s) => (
            <button
              key={s.id}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all ${
                activeList === s.id
                  ? "bg-[#4a7c59] text-white shadow-[0_0_12px_rgba(74,124,89,0.25)]"
                  : "border border-[#e4e0d8] bg-white/60 text-[#4a4e4a] hover:bg-white"
              }`}
              onClick={() => setActiveList(s.id)}
            >
              <span
                className="material-symbols-outlined mr-1.5 align-middle text-base"
                style={{
                  fontVariationSettings:
                    "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                {s.icon}
              </span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl gap-6 px-5 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Sidebar */}
        <div className="hidden md:block">
          <TaskSidebar
            activeList={activeList}
            onSelectList={setActiveList}
            tasks={tasks}
          />
        </div>

        {/* Workspace */}
        <main className="min-w-0 flex-1 space-y-5">
          <TaskHeader
            activeList={activeList}
            taskCount={sortedTasks.length}
            completedCount={completedCount}
            totalCount={allCount}
          />

          <TaskToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterPriority={filterPriority}
            onFilterChange={setFilterPriority}
          />

          <TaskInput onCreate={handleCreateTask} inputRef={inputRef} />

          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                expanded={expandedTaskId === task.id}
                onToggle={() =>
                  setExpandedTaskId(
                    expandedTaskId === task.id ? null : task.id,
                  )
                }
                onToggleComplete={() => toggleComplete(task.id)}
                onUpdateTask={(updates) => updateTask(task.id, updates)}
                onDeleteTask={() => deleteTask(task.id)}
                onAddSubtask={(title) => addSubtask(task.id, title)}
                onToggleSubtask={(subtaskId) =>
                  toggleSubtask(task.id, subtaskId)
                }
              />
            ))}
          </AnimatePresence>

          {sortedTasks.length === 0 && (
            <EmptyState type={emptyType} onCreateTask={focusInput} />
          )}
        </main>
      </motion.div>
    </div>
  );
}
