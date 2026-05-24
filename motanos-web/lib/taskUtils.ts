import { Task } from "@/components/tasks/types";

export function parseDateString(dateStr?: string): Date | null {
  if (!dateStr || dateStr === "Done") return null;

  if (dateStr === "Today") {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  if (dateStr === "Tomorrow") {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  const parsed = new Date(`${dateStr}, ${new Date().getFullYear()}`);
  if (!isNaN(parsed.getTime())) {
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  }

  return null;
}

export function isDueTodayOrOverdue(dateStr?: string): boolean {
  const date = parseDateString(dateStr);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() <= today.getTime();
}

export function isUpcoming(dateStr?: string): boolean {
  const date = parseDateString(dateStr);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() > today.getTime();
}

export function getTasksByView(view: string, tasks: Task[]): Task[] {
  switch (view) {
    case "today":
      return tasks.filter(
        (t) => !t.completed && isDueTodayOrOverdue(t.dueDate),
      );
    case "upcoming":
      return tasks.filter((t) => !t.completed && isUpcoming(t.dueDate));
    case "completed":
      return tasks.filter((t) => t.completed);
    case "inbox":
      return tasks.filter((t) => t.listId === "inbox" && !t.completed);
    default:
      return tasks.filter((t) => t.listId === view && !t.completed);
  }
}

export function getIncompleteCount(view: string, tasks: Task[]): number {
  if (view === "completed") return tasks.filter((t) => t.completed).length;
  return getTasksByView(view, tasks).length;
}
