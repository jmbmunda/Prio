import { Project, Prisma, Tag as TagType } from "@prisma/client";

import { MAP_PROJECT_COLOR } from "./constants";

export type ProjectType = Project & {
  tasks?: Task[];
  status?: string | null;
};

export type ProjectStatus = keyof typeof MAP_PROJECT_COLOR;

export type Task = Prisma.TaskGetPayload<{ include: { images: true } }>;

export type Tag = Omit<TagType, "tasks" | "tasksTags">;

export enum Status {
  TODO,
  ONGOING,
  COMPLETED,
  BLOCKER,
  FOR_REVIEW,
  PUBLISHED,
}
