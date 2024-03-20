import { EGuildType } from "@/enums/api/models/guildType";
import { z } from "zod";

export const GuildSchema = z.object({
  id: z.number(),
  name: z.string(),
  smallName: z.string(),
  description: z.string(),
  color: z.number(),
  type: z.nativeEnum(EGuildType),
  joinRequirements: z.object({
    requirements: z.number(),
    minRank: z.number(),
    maxRank: z.number(),
    minPP: z.number(),
    maxPP: z.number(),
    accountAgeUnix: z.number(),
  }),
  categories: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        guildID: z.number(),
        rankedMaps: z.null(),
        categoryLevels: z.null(),
      }),
    )
    .nullish(),
  filters: z.object({
    minDifficulty: z.number(),
    maxDifficulty: z.number(),
    difficultyStep: z.number(),
    minBPM: z.number(),
    maxBPM: z.number(),
    bpmStep: z.number(),
    minDuration: z.number(),
    maxDuration: z.number(),
    durationStep: z.number(),
  }),
  unixCreationTime: z.number(),
  inviteCode: z.string().nullish(),
  rankedMapCount: z.number().nullish(),
  memberCount: z.number().nullish(),
});

export type Guild = z.infer<typeof GuildSchema>;
