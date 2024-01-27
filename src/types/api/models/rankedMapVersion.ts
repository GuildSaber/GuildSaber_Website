import { z } from "zod";
import { SongDifficultySchema } from "../models/songDifficulty";

export const RankedMapVersionBaseSchema = z.object({
  version: z.number().default(1),
});

export const RankedMapVersionSchema = RankedMapVersionBaseSchema.extend({
  songDifficulty: z.any(), //z.optional(SongDifficultySchema),
});

export type RankedMapVersion = z.infer<typeof RankedMapVersionSchema>;
