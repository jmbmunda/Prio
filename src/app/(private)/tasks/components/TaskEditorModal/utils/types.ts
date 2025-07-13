import { z } from "zod";

import { Task } from "@/lib/types";

import { taskSchema } from "./schema";

export type Props = {
  editValues?: Task | null;
  totalTasks?: number;
  onClose: () => void;
};

export type TaskPayload = z.infer<typeof taskSchema>;
