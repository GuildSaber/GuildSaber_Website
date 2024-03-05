import { z } from "zod";

export const AveragePositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

export type AveragePosition = z.infer<typeof AveragePositionSchema>;

export const HitTrackerSchema = z.object({
  scoreID: z.number(),
  maxCombo: z.number(),
  maxStreak: z.optional(z.number()),
  leftTiming: z.number(),
  rightTiming: z.number(),
  leftMiss: z.number(),
  rightMiss: z.number(),
  leftBadCuts: z.number(),
  rightBadCuts: z.number(),
  leftBombs: z.number(),
  rightBombs: z.number(),
});

export type HitTracker = z.infer<typeof HitTrackerSchema>;

export const WinTrackerSchema = z.object({
  scoreID: z.number(),
  won: z.boolean(),
  endTime: z.number(),
  pauseCount: z.number(),
  totalPauseDuration: z.number(),
  jumpDistance: z.number(),
  averageHeight: z.number(),
  averageHeadPosition: z.optional(AveragePositionSchema),
  totalScore: z.number(),
  maxScore: z.number(),
});

export type WinTracker = z.infer<typeof WinTrackerSchema>;

export const AccuracyTrackerSchema = z.object({
  scoreID: z.number(),
  accRight: z.number(),
  accLeft: z.number(),
  leftPreSwing: z.number(),
  rightPreSwing: z.number(),
  averagePreSwing: z.number(),
  leftPostSwing: z.number(),
  rightPostSwing: z.number(),
  leftTimeDependence: z.number(),
  rightTimeDependence: z.number(),
  leftAverageCut: z.string(),
  rightAverageCut: z.string(),
  gridAcc: z.string(),
  fC_Acc: z.number(),
});

export type AccuracyTracker = z.infer<typeof AccuracyTrackerSchema>;

export const ScoreGraphTrackerSchema = z.object({
  scoreID: z.number(),
  graph: z.string(),
});

export type ScoreGraphTracker = z.infer<typeof ScoreGraphTrackerSchema>;
