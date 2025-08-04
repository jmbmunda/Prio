import { Project, Prisma, Tag as TagType } from "@prisma/client";

import { MAP_PROJECT_COLOR } from "./constants";

export type ProjectType = Project & {
  tasks?: Task[];
  status?: string | null;
};

export type ProjectStatus = keyof typeof MAP_PROJECT_COLOR;

export type TaskWithInclude<TInclude extends Prisma.TaskInclude> = Prisma.TaskGetPayload<{
  include: TInclude;
}>;

export type Task = Prisma.TaskGetPayload<object>;
export type TaskWithImages = TaskWithInclude<{ images: true }>;
export type TaskWithStatus = TaskWithInclude<{ status: true }>;
export type TaskWithTags = TaskWithInclude<{ tags: true }>;
export type TaskWithSchedule = TaskWithInclude<{ schedule: true }>;
export type TaskWithUser = TaskWithInclude<{ user: true }>;
export type TaskWithAll = TaskWithInclude<{
  user: true;
  images: true;
  schedule: true;
  status: true;
  tags: true;
}>;

export type Tag = Omit<TagType, "tasks" | "tasksTags">;

export enum Status {
  TODO,
  ONGOING,
  COMPLETED,
  BLOCKER,
  FOR_REVIEW,
  PUBLISHED,
}
