import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]),
  due_date: z.string().min(1, "Due date is required"),
});
