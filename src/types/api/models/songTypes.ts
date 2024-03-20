import { z } from "zod";
import { EDifficulty } from "@/enums/api/models/difficulty";
import { GameModeSchema } from "./gameMode";

export const SongWithoutSongDifficultyBaseSchema = z.object({
  id: z.number(),
  hash: z.string(),
  beatSaverKey: z.string().nullish(),
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

export const SongDifficultyBaseSchema = z.object({
  id: z.number(),
  gameMode: GameModeSchema,
  difficulty: z.nativeEnum(EDifficulty),
  blid: z.nullable(z.string()),
});

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

export const RankedMapVersionBaseSchema = z.object({
  version: z.number().default(1),
});

export const SongDifficultySchema = SongDifficultyBaseSchema.extend({
  song: z.nullable(SongWithoutSongDifficultyBaseSchema),
  songDifficultyStats: z.nullable(SongDifficultyStatsBaseSchema),
});

export const SongSchema = SongWithoutSongDifficultyBaseSchema.extend({
  songDifficulties: z.array(SongDifficultySchema),
});

export const RankedMapVersionSchema = RankedMapVersionBaseSchema.extend({
  songDifficulty: SongDifficultySchema.nullish(),
});

export type RankedMapVersion = z.infer<typeof RankedMapVersionSchema>;

export type Song = z.infer<typeof SongSchema>;

export const SongDifficultyBaseWithoutSongSchema =
  SongDifficultyBaseSchema.extend({
    songDifficultyStats: z.nullable(SongDifficultyStatsBaseSchema),
  });

export const SongDifficultyBaseWithoutSongDifficultyStatsSchema =
  SongDifficultyBaseSchema.extend({
    songDifficultyStats: z.nullable(SongDifficultyStatsBaseSchema),
    song: z.nullable(SongWithoutSongDifficultyBaseSchema),
    rankedMapVersions: z.nullable(z.array(RankedMapVersionBaseSchema)),
  });

export const SongDifficultyBaseWithoutRankedMapVersionsSchema =
  SongDifficultyBaseSchema.extend({
    songDifficultyStats: z.nullable(SongDifficultyStatsBaseSchema),
    song: z.nullable(SongWithoutSongDifficultyBaseSchema),
  });

export type SongDifficulty = z.infer<typeof SongDifficultySchema>;

export const SongDifficultyStatsSchema = SongDifficultyStatsBaseSchema.extend({
  songDifficulties: z.nullable(
    z.array(SongDifficultyBaseWithoutSongDifficultyStatsSchema),
  ),
});

export type SongDifficultyStats = z.infer<typeof SongDifficultyStatsSchema>;
