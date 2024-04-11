import { z } from "zod";

export const LevelSchema = z.object({
  id: z.number(),
  guildID: z.number(),
  name: z.string(),
  number: z.number(),
  color: z.number(),
  canUseNumber: z.boolean(),
  threshold: z.number(),
  discordRoleID: z.string().nullish(),
});

export type Level = z.infer<typeof LevelSchema>;
