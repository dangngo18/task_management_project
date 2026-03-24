import type z from "zod";
import type { taskFormSchema } from "../schema";

export type TaskFormData = z.infer<typeof taskFormSchema>;
