import { z } from "zod";

import { RankedMapSchema } from "./rankedTypes";
import { CategoryLevelsSchema } from "./categoryLevels";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  guildID: z.number(),
  rankedMaps: z.array(RankedMapSchema).nullish(),
  categoryLevels: z.array(CategoryLevelsSchema).nullish(),
});

export type Category = z.infer<typeof CategorySchema>;
