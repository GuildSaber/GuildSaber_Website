import { z } from "zod";

export const LevelSchema = z.object({
  id: z.number(),
  guildId: z.number(),
  value: z.number(),
  discordId: z.bigint(),
});

export type Level = z.infer<typeof LevelSchema>;
