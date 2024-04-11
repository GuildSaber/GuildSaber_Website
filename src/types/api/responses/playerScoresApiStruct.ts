import { z } from "zod";
import { PointSchema } from "../models/point";
import { RankedMapSchema } from "../models/rankedTypes";
import { ScoreSchema } from "../models/score";
import { SongDifficultySchema } from "../models/songTypes";
import { PagedListSchema } from "./pagedList";

export const PlayerScoresApiStructSchema = PagedListSchema(
  z.object({
    id: z.number(),
    pointID: z.number(),
    playerID: z.number(),
    score: ScoreSchema,
    prevScore: ScoreSchema.nullish(),
    rankedMap: RankedMapSchema,
    point: PointSchema.nullish(),
    songDifficulty: SongDifficultySchema,
    state: z.number(),
    effectiveScore: z.number(),
    rawPoints: z.number(),
    createdUnixTime: z.number(),
    modifiedUnixTime: z.number(),
    rank: z.number(),
    weight: z.number(),
    rowNumber: z.number(),
  }),
);

export type PlayerScoresApiStruct = z.infer<typeof PlayerScoresApiStructSchema>;
