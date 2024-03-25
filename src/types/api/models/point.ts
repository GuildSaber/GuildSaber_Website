import { z } from "zod";

export const ModifierValuesStructSchema = z.object({
  offPlatform: z.number(),
  noFail: z.number(),
  noBombs: z.number(),
  noArrows: z.number(),
  noObstacles: z.number(),
  slowerSong: z.number(),
  fasterSong: z.number(),
  superFastSong: z.number(),
  ghostNotes: z.number(),
  disappearing: z.number(),
  batteryEnergy: z.number(),
  instaFail: z.number(),
  smallNotes: z.number(),
  proMode: z.number(),
  strictAngles: z.number(),
  oldDots: z.number(),
});

export type ModifierValuesStruct = z.infer<typeof ModifierValuesStructSchema>;

export const PointSchema = z.object({
  id: z.number(),
  guildID: z.number(),
  name: z.string(),
  modifierValues: ModifierValuesStructSchema,
  difficultyScale: z.number(),
  accuracyScale: z.number(),
  slopeMultiplier: z.number(),
  isSlopeEnabled: z.boolean(),
  isAccCurveEnabled: z.boolean(),
  defaultAverageAccForPointCalculation: z.number(),
  diffCurve: z.string(),
  accCurve: z.string(),
});

export const SimplePointSchema = z.object({
  id: z.number(),
  guildID: z.number(),
  name: z.string(),
});

export type Point = z.infer<typeof PointSchema>;

export type SimplePoints = z.infer<typeof SimplePointSchema>;
