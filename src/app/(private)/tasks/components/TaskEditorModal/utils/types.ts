import { Task } from "@/lib/types";
import { ColumnType } from "../../../utils/types";
import { z } from "zod";
import { taskSchema } from "./schema";

export type Props = {
  columns?: ColumnType[];
  editValues?: Task | null;
  totalTasks?: number;
  onClose: () => void;
};

export type TaskPayload = z.infer<typeof taskSchema>;
