import { z } from "zod";
import { PlayerSchema } from "./player";
import { PointSchema } from "./point";
import { CategorySchema } from "./category";

export const PlayerCategoryPointStatSchema = z.object({
  playerID: z.number(),
  pointID: z.number(),
  categoryID: z.number(),
  value: z.number(),
  player: z.nullable(PlayerSchema),
  point: z.nullable(PointSchema),
  category: z.nullable(CategorySchema),
});

export type PlayerCategoryPointStat = z.infer<
  typeof PlayerCategoryPointStatSchema
>;
