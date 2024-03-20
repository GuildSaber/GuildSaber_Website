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
  bL_ScoreID: z.number().nullable(),
  maxCombo: z.number(),
  fullCombo: z.boolean(),
  missedNotes: z.number(),
  badCuts: z.number(),
  hmd: z.nativeEnum(EHMD),
  controller: z.nativeEnum(EController),
  hasTrackers: z.boolean(),
  hitTracker: z.optional(HitTrackerSchema).nullable(),
  winTracker: z.optional(WinTrackerSchema).nullable(),
  accuracyTracker: z.optional(AccuracyTrackerSchema).nullable(),
  graphTracker: z.optional(ScoreGraphTrackerSchema).nullable(),
});

export type Score = z.infer<typeof ScoreSchema>;
