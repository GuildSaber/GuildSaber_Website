import { z } from "zod";

export const MemebersStateSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  instance: z.string(),
  additionalProp1: z.string().optional(),
  additionalProp2: z.string().optional(),
  additionalProp3: z.string().optional(),
});

export type MemebersState = z.infer<typeof MemebersStateSchema>;
