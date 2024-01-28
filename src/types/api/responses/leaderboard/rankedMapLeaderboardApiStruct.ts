import { z } from "zod";
import { PlayerSchema } from "../../../../types/api/models/player";
import { RankedScoreSchema } from "../../models/rankedTypes";

export const RankedMapLeaderboardApiStructSchema = z.object({
  player: PlayerSchema,
  rankedScore: RankedScoreSchema,
});

export type RankedMapLeaderboardApiStruct = z.infer<
  typeof RankedMapLeaderboardApiStructSchema
>;
