import { z } from "zod";
import { EState } from "@/enums/api/models/state";
import { PointSchema } from "./point";
import { RankedMapSchema } from "./rankedMap";
import { SongDifficultySchema } from "./songDifficulty";
import { ScoreSchema } from "./score";

export const RankedScoreBaseSchema = z.object({
  id: z.number(),
  scoreID: z.number(),
  prevScoreID: z.optional(z.number()),
  rankedMapID: z.number(),
  pointID: z.number(),
  playerID: z.number(),
  songDifficultyID: z.number(),
  guildID: z.number(),
  point: z.optional(PointSchema),
  state: z.nativeEnum(EState),
  effectiveScore: z.number(),
  rawPoints: z.number(),
  createdUnixTime: z.number(),
  modifiedUnixTime: z.number(),
  rank: z.number(),
  weight: z.number(),
  rowNumber: z.number(),
});

export const RankedScoreWithoutScoreSchema = RankedScoreBaseSchema.extend({
  rankedMap: z.optional(RankedMapSchema),
  point: z.optional(PointSchema),
  songDifficulty: z.optional(SongDifficultySchema),
});

export const RankedScoreWithoutSongDifficultySchema =
  RankedScoreBaseSchema.extend({
    score: z.optional(ScoreSchema),
    rankedMap: z.optional(RankedMapSchema),
    point: z.optional(PointSchema),
  });

export const RankedScoreSchema = RankedScoreBaseSchema.extend({
  score: z.optional(ScoreSchema),
  rankedMap: z.optional(RankedMapSchema),
  point: z.optional(PointSchema),
  songDifficulty: z.optional(SongDifficultySchema),
});

export type RankedScore = z.infer<typeof RankedScoreSchema>;
