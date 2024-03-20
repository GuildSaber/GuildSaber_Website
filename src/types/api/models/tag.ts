import { z } from "zod";
import { RankedMapSchema } from "./rankedTypes";

export const TagSchema = z.object({
  ID: z.number(),
  Name: z.string(),
  Description: z.nullable(z.string()),
  RankedMaps: z.nullable(z.array(RankedMapSchema)),
});

export type Tag = z.infer<typeof TagSchema>;
