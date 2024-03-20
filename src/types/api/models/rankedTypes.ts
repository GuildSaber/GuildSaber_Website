import { ECustomModifierRating as ECustomModRatingFlag } from "@/enums/api/models//customModifierRating";
import { ERankingState } from "@/enums/api/models//rankingState";
import { z } from "zod";
import { PointSchema } from "./point";
import { ScoreSchema } from "./score";
import { RankedMapVersionSchema, SongDifficultySchema } from "./songTypes";

export const StarsSchema = z.object({
  difficulty: z.number().nullish(),
  acc: z.number().nullish(),
});

export const InRatingSchema = z.object({
  stars: StarsSchema,
});

export const ModifiersRatingSchema = z.object({
  slowerSong: InRatingSchema.nullish(),
  fasterSong: InRatingSchema.nullish(),
  superFastSong: InRatingSchema.nullish(),
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
  prevScoreID: z.number().nullish(),
  pointID: z.number(),
  playerID: z.number(),
  point: PointSchema.nullish(),
  state: z.number(),
  effectiveScore: z.number(),
  rawPoints: z.number(),
  createdUnixTime: z.number(),
  modifiedUnixTime: z.number(),
  rank: z.number(),
  weight: z.number(),
  rowNumber: z.number(),
});

export const RankedScoreWithoutScoreSchema = RankedScoreBaseSchema.extend({
  rankedMap: RankedMapSchema.nullish(),
  point: PointSchema.nullish(),
  songDifficulty: SongDifficultySchema.nullish(),
});

export const RankedScoreWithoutSongDifficultySchema =
  RankedScoreBaseSchema.extend({
    score: ScoreSchema.nullish(),
    rankedMap: RankedMapSchema.nullish(),
    point: PointSchema.nullish(),
  });

export const RankedScoreWithoutRankedMapNorSongDifficultySchema =
  RankedScoreBaseSchema.extend({
    score: ScoreSchema.nullish(),
    point: PointSchema.nullish(),
  });

export const RankedScoreSchema = RankedScoreBaseSchema.extend({
  score: ScoreSchema.nullish(),
  rankedMap: RankedMapSchema.nullish(),
  point: PointSchema.nullish(),
  songDifficulty: SongDifficultySchema.nullish(),
});

export type RankedScore = z.infer<typeof RankedScoreSchema>;
