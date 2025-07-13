import { z } from "zod";

export const taskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    start_date: z.date().nullable().optional(),
    due_date: z.date().nullable().optional(),
    status_id: z.string().min(1, "Select a status"),
    images: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        uuid: z.string().optional().nullable(),
      })
    ),
  })
  .refine(({ start_date, due_date }) => !start_date || due_date, {
    path: ["due_date"],
    message: "Due date is required",
  });
