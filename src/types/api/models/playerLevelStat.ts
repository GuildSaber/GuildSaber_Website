import { z } from "zod";
import { LevelSchema } from "./level";

export const PlayerLevelStatSchema = z.object({
  playerID: z.number(),
  guildID: z.number(),
  levelID: z.number().nullish(),
  nextLevelID: z.number().nullish(),
  xp: z.number(),
  level: LevelSchema.nullish(),
  nextLevel: LevelSchema.nullish(),
});

export type PlayerLevelStat = z.infer<typeof PlayerLevelStatSchema>;
