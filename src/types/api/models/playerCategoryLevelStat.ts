import { z } from "zod";
import { CategoryLevelSchema } from "./categoryLevel";

export const PlayerCategoryLevelStatSchema = z.object({
  playerID: z.number(),
  guildID: z.number(),
  categoryID: z.number(),
  levelID: z.number().nullish(),
  nextLevelID: z.number().nullish(),
  xp: z.number(),
  level: CategoryLevelSchema.nullish(),
  nextLevel: CategoryLevelSchema.nullish(),
});

export type PlayerCategoryLevelStat = z.infer<
  typeof PlayerCategoryLevelStatSchema
>;
