import { z } from "zod";
import { PlayerSchema } from "../../../../types/api/models/player";

export const PlayerLeaderboardApiStructSchema = z.object({
  player: PlayerSchema,
  points: z.number(),
});

export type PlayerLeaderboardApiStruct = z.infer<
  typeof PlayerLeaderboardApiStructSchema
>;
