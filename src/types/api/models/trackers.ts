import { z } from "zod";

export const AveragePositionSchema = z.object({
  X: z.number(),
  Y: z.number(),
  Z: z.number(),
});

export type AveragePosition = z.infer<typeof AveragePositionSchema>;

export const HitTrackerSchema = z.object({
  ScoreID: z.number(),
  MaxCombo: z.number(),
  MaxStreak: z.optional(z.number()),
  LeftTiming: z.number(),
  RightTiming: z.number(),
  LeftMiss: z.number(),
  RightMiss: z.number(),
  LeftBadCuts: z.number(),
  RightBadCuts: z.number(),
  LeftBombs: z.number(),
  RightBombs: z.number(),
});

export type HitTracker = z.infer<typeof HitTrackerSchema>;

export const WinTrackerSchema = z.object({
  ScoreID: z.number(),
  Won: z.boolean(),
  EndTime: z.number(),
  PauseCount: z.number(),
  TotalPauseDuration: z.number(),
  JumpDistance: z.number(),
  AverageHeight: z.number(),
  AverageHeadPosition: z.optional(AveragePositionSchema),
  TotalScore: z.number(),
  MaxScore: z.number(),
});

export type WinTracker = z.infer<typeof WinTrackerSchema>;

export const AccuracyTrackerSchema = z.object({
  ScoreID: z.number(),
  AccRight: z.number(),
  AccLeft: z.number(),
  LeftPreSwing: z.number(),
  RightPreSwing: z.number(),
  AveragePreSwing: z.number(),
  LeftPostSwing: z.number(),
  RightPostSwing: z.number(),
  LeftTimeDependence: z.number(),
  RightTimeDependence: z.number(),
  LeftAverageCut: z.string(),
  RightAverageCut: z.string(),
  GridAcc: z.string(),
  FC_Acc: z.number(),
});

export type AccuracyTracker = z.infer<typeof AccuracyTrackerSchema>;

export const ScoreGraphTrackerSchema = z.object({
  ScoreID: z.number(),
  Graph: z.string(),
});

export type ScoreGraphTracker = z.infer<typeof ScoreGraphTrackerSchema>;
