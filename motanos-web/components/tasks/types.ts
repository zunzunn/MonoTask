export interface SubTask {
  id: string;
  title: string;
  done: boolean;
}

export type Priority = "none" | "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  dueDate?: string;
  priority: Priority;
  tags: string[];
  notes?: string;
  subtasks: SubTask[];
  completed: boolean;
  list: string;
}

export interface SidebarSection {
  id: string;
  icon: string;
  label: string;
}

export const primarySections: SidebarSection[] = [
  { id: "today", icon: "today", label: "Today" },
  { id: "upcoming", icon: "calendar_month", label: "Upcoming" },
  { id: "inbox", icon: "inbox", label: "Inbox" },
  { id: "completed", icon: "check_circle", label: "Completed" },
];

export const customLists: SidebarSection[] = [
  { id: "personal", icon: "person", label: "Personal" },
  { id: "study", icon: "school", label: "Study" },
  { id: "work", icon: "work", label: "Work" },
  { id: "exercise", icon: "fitness_center", label: "Exercise" },
  { id: "shopping", icon: "shopping_cart", label: "Shopping" },
];

export const sidebarFooter: SidebarSection[] = [
  { id: "tags", icon: "label", label: "Tags" },
  { id: "filters", icon: "filter_alt", label: "Filters" },
];
