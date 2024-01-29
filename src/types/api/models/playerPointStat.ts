import { z } from "zod";
import { PlayerSchema } from "./player";
import { PointSchema } from "./point";

export const PlayerPointStatSchema = z.object({
  playerID: z.number(),
  pointID: z.number(),
  value: z.number(),
  player: z.optional(PlayerSchema),
  point: z.optional(PointSchema),
});

export type PlayerPointStat = z.infer<typeof PlayerPointStatSchema>;
