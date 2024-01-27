import { z } from "zod";
import { GameModeSchema } from "./gameMode";
import { SongBaseSchema } from "./song";
import { SongDifficultyStatsBaseSchema } from "./songDifficultyStats";
import { RankedMapVersionBaseSchema } from "./rankedMapVersion";
import { EDifficulty } from "@/enums/api/models/difficulty";

export const SongDifficultyBaseSchema = z.object({
  id: z.number(),
  songID: z.number(),
  gameModeID: z.number(),
  gmeMode: GameModeSchema,
  Difficulty: z.nativeEnum(EDifficulty),
  blid: z.optional(z.string()),
  songDifficultyStatsID: z.number(),
});

export const SongDifficultyBaseWithoutSongSchema =
  SongDifficultyBaseSchema.extend({
    rankedMapVersions: z.optional(z.array(RankedMapVersionBaseSchema)),
    songDifficultyStats: z.optional(SongDifficultyStatsBaseSchema),
  });

export const SongDifficultyBaseWithoutSongDifficultyStatsSchema =
  SongDifficultyBaseSchema.extend({
    songDifficultyStats: z.optional(SongDifficultyStatsBaseSchema),
    song: z.optional(SongBaseSchema),
    rankedMapVersions: z.optional(z.array(RankedMapVersionBaseSchema)),
  });

export const SongDifficultyBaseWithoutRankedMapVersionsSchema =
  SongDifficultyBaseSchema.extend({
    songDifficultyStats: z.optional(SongDifficultyStatsBaseSchema),
    song: z.optional(SongBaseSchema),
  });

export const SongDifficultySchema = SongDifficultyBaseSchema.extend({
  song: z.optional(SongBaseSchema),
  songDifficultyStats: z.optional(SongDifficultyStatsBaseSchema),
  rankedMapVersions: z.optional(z.array(RankedMapVersionBaseSchema)),
});

export type SongDifficulty = z.infer<typeof SongDifficultySchema>;
