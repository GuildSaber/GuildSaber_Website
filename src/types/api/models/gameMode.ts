import { z } from "zod";

export const GameModeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type GameMode = z.infer<typeof GameModeSchema>;
