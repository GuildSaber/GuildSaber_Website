import { ECustomModifierRating as ECustomModRatingFlag } from "@/enums/api/models//customModifierRating";
import { ERankingState } from "@/enums/api/models//rankingState";
import { EState } from "@/enums/api/models/state";
import { z } from "zod";
import { PointSchema } from "./point";
import { ScoreSchema } from "./score";
import { RankedMapVersionSchema, SongDifficultySchema } from "./songTypes";

export const StarsSchema = z.object({
  difficulty: z.number().nullable(),
  acc: z.number().nullable(),
});

export const InRatingSchema = z.object({
  stars: StarsSchema,
});

export const ModifiersRatingSchema = z.object({
  slowerSong: InRatingSchema.nullable(),
  fasterSong: InRatingSchema.nullable(),
  superFastSong: InRatingSchema.nullable(),
});

export const RankedMapDifficultyRatingSchema = z.object({
  enabledCustomModRatingFlag: z.nativeEnum(ECustomModRatingFlag),
  default: InRatingSchema,
});

export const RequirementStructSchema = z.object({
  doesNeedConfirmation: z.boolean().default(false),
  doesNeedFullCombo: z.boolean().default(false),
  maxPauseDuration: z.number().default(-1.0),
  prohibitedModifiers: z.number().default(0),
  mandatoryModifiers: z.number(),
  minAccuracy: z.number(),
});

export const RankedMapSchema = z.object({
  id: z.number(),
  guildID: z.number(),
  rankingState: z.nativeEnum(ERankingState),
  requirements: RequirementStructSchema,
  rating: RankedMapDifficultyRatingSchema,
  unixCreationTime: z.number(),
  unixEditTime: z.number(),
  rankedMapVersions: z.array(RankedMapVersionSchema),
});

export type RankedMap = z.infer<typeof RankedMapSchema>;

export const RankedScoreBaseSchema = z.object({
  id: z.number(),
  prevScoreID: z.optional(z.number()),
  pointID: z.number(),
  playerID: z.number(),
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

export const RankedScoreWithoutRankedMapNorSongDifficultySchema =
  RankedScoreBaseSchema.extend({
    score: ScoreSchema.nullable().optional(),
    point: PointSchema.nullable().optional(),
  });

export const RankedScoreSchema = RankedScoreBaseSchema.extend({
  score: ScoreSchema.nullable().optional(),
  rankedMap: RankedMapSchema.nullable().optional(),
  point: PointSchema.nullable().optional(),
  songDifficulty: SongDifficultySchema.nullable().optional(),
});

export type RankedScore = z.infer<typeof RankedScoreSchema>;
