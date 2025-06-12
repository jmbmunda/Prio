import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  due_date: z.date().nullable(),
  status_id: z.string().min(1, "Select a status"),
  images: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      uuid: z.string().optional().nullable(),
    })
  ),
});
