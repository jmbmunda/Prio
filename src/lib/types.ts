import { Project } from "@prisma/client";
import { MAP_PROJECT_COLOR } from "./constants";

export type Task = {
  id: number;
  created_at?: Date | null;
  updated_at?: Date | null;
  title: string;
  description: string | null;
  project_id: string | null;
  user_id: number | null;
  status?: string | null;
};

export type ProjectType = Project & {
  tasks?: Task[];
  status?: string | null;
};

export type ProjectStatus = keyof typeof MAP_PROJECT_COLOR;

export enum Status {
  TODO,
  ONGOING,
  COMPLETED,
  BLOCKER,
  FOR_REVIEW,
  PUBLISHED,
}
