import { z } from "zod";

import { Task } from "@/lib/types";

import { taskSchema } from "./schema";
import { ColumnType } from "../../../utils/types";

export type Props = {
  columns?: ColumnType[];
  editValues?: Task | null;
  totalTasks?: number;
  onClose: () => void;
};

export type TaskPayload = z.infer<typeof taskSchema>;
