import { z } from "zod";
import { PlayerSchema } from "../../../../types/api/models/player";

export const PlayerLeaderboardApiStructSchema = z.object({
  Player: PlayerSchema,
  Points: z.number(),
});

export type PlayerLeaderboardApiStruct = z.infer<
  typeof PlayerLeaderboardApiStructSchema
>;
