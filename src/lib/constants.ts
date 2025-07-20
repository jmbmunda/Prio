import { Priority } from "@prisma/client";

export const MAP_PROJECT_COLOR = {
  ongoing: "warning",
  completed: "success",
  upcoming: "secondary",
} as const;

export const projects = [
  {
    id: "1",
    name: "Project 1",
    status: "ongoing",
    tasks: 12,
    color: "bg-yellow-50",
    updated_at: "now",
  },
  {
    id: "2",
    name: "Project 2",
    status: "completed",
    tasks: 3,
    color: "bg-red-50",
    updated_at: "2 hours ago",
  },
  {
    id: "3",
    name: "Project 3",
    status: "upcoming",
    tasks: 5,
    color: "bg-indigo-50",
    updated_at: "1 day ago",
  },
];

export const NAVBAR_DRAWER_ID = "navbar-drawer";
export const TASK_DRAWER_ID = "task-drawer";

export const COLUMN_MENU_ID = "column-menu-id";
export const TASK_MENU_ID = "Task-menu-id";

export const MAP_PRIORITY_COLOR: Record<Priority, { color: string; backgroundColor: string }> = {
  HIGH: { color: "#ef4444", backgroundColor: "#fee2e2" },
  MEDIUM: { color: "#ea580c", backgroundColor: "#ffedd5" },
  LOW: { color: "#6b7280", backgroundColor: "#f3f4f6" },
} as const;
