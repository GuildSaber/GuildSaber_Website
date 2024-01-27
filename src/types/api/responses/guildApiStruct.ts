import { z } from "zod";

export const GuildStatsSchema = z.object({
  memberCount: z.number(),
  rankedMapCount: z.number(),
  rankedScoreCount: z.number(),
});

export type GuildStats = z.infer<typeof GuildStatsSchema>;
