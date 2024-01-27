import { ECustomModifierRating as ECustomModRatingFlag } from "@/enums/api/models//customModifierRating";
import { ERankingState } from "@/enums/api/models//rankingState";
import { z } from "zod";
import { RankedScoreSchema } from "./rankedscore";
import { SimplePointSchema } from "./point";
import { RankedMapVersionSchema } from "./rankedMapVersion";

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

export const MapDataSchema = z.object({
  rankedMap: RankedMapSchema,
  rankedScore: z.any(), //RankedScoreSchema.nullable(),
  simplePoints: z.array(SimplePointSchema),
});

export type RankedMap = z.infer<typeof RankedMapSchema>;

export type MapData = z.infer<typeof MapDataSchema>;
