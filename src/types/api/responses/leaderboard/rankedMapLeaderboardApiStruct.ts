import { z } from "zod";
import { PlayerSchema } from "../../../../types/api/models/player";
import { RankedScoreSchema } from "../../../../types/api/models/rankedscore";

export const RankedMapLeaderboardApiStructSchema = z.object({
  Player: PlayerSchema,
  RankedScore: RankedScoreSchema,
});

export type RankedMapLeaderboardApiStruct = z.infer<
  typeof RankedMapLeaderboardApiStructSchema
>;
