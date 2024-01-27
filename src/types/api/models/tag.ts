import { z } from "zod";
import { RankedMapSchema } from "./rankedMap";

export const TagSchema = z.object({
  ID: z.number(),
  Name: z.string(),
  Description: z.optional(z.string()),
  RankedMaps: z.optional(z.array(RankedMapSchema)),
});

export type Tag = z.infer<typeof TagSchema>;
