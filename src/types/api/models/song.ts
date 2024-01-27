import { z } from "zod";
import { SongDifficultySchema } from "./songDifficulty";

export const SongBaseSchema = z.object({
  id: z.number(),
  hash: z.string(),
  beatSaverKey: z.optional(z.string()),
  name: z.string(),
  songName: z.string(),
  songSubName: z.string(),
  songAuthorName: z.string(),
  mapperName: z.string(),
  isAutoMapped: z.boolean(),
  bpm: z.number(),
  duration: z.number(),
  unixUploadedTime: z.number(),
  coverURL: z.string(),
});

export const SongSchema = SongBaseSchema.extend({
  songDifficulties: z.array(SongDifficultySchema),
});

export type Song = z.infer<typeof SongSchema>;
