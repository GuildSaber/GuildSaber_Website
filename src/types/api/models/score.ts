import { z } from "zod";
import { EModifiers } from "@/enums/api/models/modifiers";
import { EHMD } from "@/enums/api/models/hmd";
import { EController } from "@/enums/api/models/controller";
import {
  HitTrackerSchema,
  WinTrackerSchema,
  AccuracyTrackerSchema,
  ScoreGraphTrackerSchema,
} from "./trackers";

export const ScoreSchema = z.object({
  id: z.number(),
  playerID: z.number(),
  songDifficultyID: z.number(),
  baseScore: z.number(),
  modifiers: z.nativeEnum(EModifiers),
  unixTimeSet: z.number(),
  bL_ScoreID: z.optional(z.number()),
  maxCombo: z.number(),
  fullCombo: z.boolean(),
  missedNotes: z.number(),
  badCuts: z.number(),
  hmd: z.nativeEnum(EHMD),
  controller: z.nativeEnum(EController),
  hasTrackers: z.boolean(),
  hitTracker: z.optional(HitTrackerSchema),
  winTracker: z.optional(WinTrackerSchema),
  accuracyTracker: z.optional(AccuracyTrackerSchema),
  graphTracker: z.optional(ScoreGraphTrackerSchema),
});

export type Score = z.infer<typeof ScoreSchema>;
