import { z } from "zod";
import { SongDifficultySchema } from "./songDifficulty";

export const SongDifficultyStatsBaseSchema = z.object({
  id: z.number(),
  maxScore: z.number(),
  noteJumpSpeed: z.number(),
  noteCount: z.number(),
  bombCount: z.number(),
  obstacleCount: z.number(),
  notesPerSecond: z.number(),
  duration: z.number(),
});

export const SongDifficultyStatsSchema = SongDifficultyStatsBaseSchema.extend({
  songDifficulties: z.optional(z.array(SongDifficultySchema)),
});

export type SongDifficultyStats = z.infer<typeof SongDifficultyStatsSchema>;
