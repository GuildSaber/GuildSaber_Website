import { z } from "zod";

export const GuildAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  smallName: z.string(),
  description: z.string(),
  color: z.number(),
  type: z.number(),
  joinRequirements: z.object({
    requirements: z.number(),
    minRank: z.number(),
    maxRank: z.number(),
    minPP: z.number(),
    maxPP: z.number(),
    accountAgeUnix: z.number(),
  }),
  unixCreationTime: z.number(),
  inviteCode: z.string().nullable(),
  rankedMapCount: z.number(),
  memberCount: z.number(),
});

export const GuildsAPIResponseSchema = z.object({
  data: z.array(GuildAPIResponseSchema),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export type GuildsAPIResponse = z.infer<typeof GuildsAPIResponseSchema>;
export type GuildAPIResponse = z.infer<typeof GuildAPIResponseSchema>;
