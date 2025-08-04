import { z } from "zod";

import { TaskWithAll } from "@/lib/types";

import { taskSchema } from "./schema";

export type Props = {
  editValues?: TaskWithAll | null;
  totalTasks?: number;
  onClose: () => void;
};

export type TaskPayload = z.infer<typeof taskSchema>;
