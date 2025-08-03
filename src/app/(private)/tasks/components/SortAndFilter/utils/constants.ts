import { Priority } from "@prisma/client";

export const PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export const SORT_OPTIONS = [
  { label: "Title (A-Z)", value: "title:asc" },
  { label: "Title (Z-A)", value: "title:desc" },
  { label: "Due Date (Soonest)", value: "due_date:asc" },
  { label: "Due Date (Latest)", value: "due_date:desc" },
  { label: "Date Created (Newest)", value: "created_at:desc" },
  { label: "Date Created (Oldest)", value: "created_at:asc" },
  { label: "Priority (High → Low)", value: "priority:high" },
  { label: "Priority (Low → High)", value: "priority:low" },
];

export const PRIORITY_ORDER: Record<Priority, number> = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};
