import { z } from "zod";

import { RankedMapSchema } from "./rankedMap";
import { CategoryLevelsSchema } from "./categoryLevels";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  guildID: z.number(),
  rankedMaps: z.array(RankedMapSchema).optional(),
  categoryLevels: z.array(CategoryLevelsSchema).optional(),
});

export type Category = z.infer<typeof CategorySchema>;
