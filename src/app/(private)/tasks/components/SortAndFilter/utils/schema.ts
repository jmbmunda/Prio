import { z } from "zod";

export const filterSchema = z.object({
  status: z.string().optional(),
  priority: z.string().optional(),
});
