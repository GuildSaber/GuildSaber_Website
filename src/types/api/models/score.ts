import { EController } from "@/enums/api/models/controller";
import { EHMD } from "@/enums/api/models/hmd";
import { z } from "zod";
import {
  AccuracyTrackerSchema,
  HitTrackerSchema,
  ScoreGraphTrackerSchema,
  WinTrackerSchema,
} from "./trackers";

export const ScoreSchema = z.object({
  id: z.number(),
  playerID: z.number(),
  songDifficultyID: z.number(),
  baseScore: z.number(),
  modifiers: z.number(),
  unixTimeSet: z.number(),
  bL_ScoreID: z.number().nullish(),
  maxCombo: z.number(),
  fullCombo: z.boolean(),
  missedNotes: z.number(),
  badCuts: z.number(),
  hmd: z.nativeEnum(EHMD),
  controller: z.nativeEnum(EController),
  hasTrackers: z.boolean(),
  hitTracker: HitTrackerSchema.nullish(),
  winTracker: WinTrackerSchema.nullish(),
  accuracyTracker: AccuracyTrackerSchema.nullish(),
  graphTracker: ScoreGraphTrackerSchema.nullish(),
});

export type Score = z.infer<typeof ScoreSchema>;
