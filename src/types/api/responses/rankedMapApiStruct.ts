import { z } from "zod";
import { RequirementStructSchema } from "@/types/api/models/rankedTypes";
import { EDifficulty } from "@/enums/api/models/difficulty";
import { ECustomModifierRating } from "@/enums/api/models/customModifierRating";
import { ERankingState } from "@/enums/api/models/rankingState";
import {
  RankedMapSchema,
  RankedScoreWithoutRankedMapNorSongDifficultySchema,
} from "../models/rankedTypes";
import { SimplePointSchema } from "../models/point";

export const AddRankedMapApiStructSchema = z.object({
  guildID: z.number(),
  mapHash: z.string(),
  difficulty: z.nativeEnum(EDifficulty),
  gameModeID: z.number().nullish(),
  gameMode: z.string().nullish(),
  usedModsModRatingFlag: z.nativeEnum(ECustomModifierRating),
  forcedStarRating: z.number().nullish(),
  rankingState: z.nativeEnum(ERankingState),
  requirements: RequirementStructSchema,
  categoryID: z.number().nullish(),
  playlistID: z.number().nullish(),
});

export type AddRankedMapApiStruct = z.infer<typeof AddRankedMapApiStructSchema>;

export const EditRankedMapApiStructSchema = z.object({
  rankedMapID: z.number(),
  rankingState: z.nativeEnum(ERankingState).nullish(),
  requirements: RequirementStructSchema.nullish(),
});

export type EditRankedMapApiStruct = z.infer<
  typeof EditRankedMapApiStructSchema
>;

export const RankedMapResponseSchema = z.object({
  rankedMap: RankedMapSchema,
  rankedScore:
    RankedScoreWithoutRankedMapNorSongDifficultySchema.nullish(),
  simplePoints: z.array(SimplePointSchema),
});

export type RankedMapResponse = z.infer<typeof RankedMapResponseSchema>;
