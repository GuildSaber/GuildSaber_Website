import { z } from "zod";
import { GuildsAPIResponseSchema, GuildAPIResponse } from "./guild";

export interface AuthState {
  session: {
    user?: User;
    player?: Player;
    token?: string;
    selectedGuild?: string | null;
    memberList?: MemberList[];
    isGuildSaberManager?: boolean;
  } | null;
}

export interface User {
  id: number;
  discordUserID: number;
  beatLeaderID: number;
  subscriptionTier: number;
  guildBoosts: any[];
}

export interface Player {
  userID: number;
  name: string;
  platform: number;
  hmd: number;
  user_AvatarUrl: string;
}

export interface MemberList {
  guildID: number;
  userID: number;
  state: number;
  guild: GuildAPIResponse;
  permissions: number;
  priority: number;
  joinDateUnix: number;
}

export interface JoinRequirements {
  requirements: number;
  minRank: number;
  maxRank: number;
  minPP: number;
  maxPP: number;
  accountAgeUnix: number;
}

export const AuthAPIResponseSchema = z
  .object({
    token: z.string().optional(),
    selectedGuild: z.string().nullish(),
    isGuildSaberManager: z.boolean().optional(),
    user: z
      .object({
        id: z.number(),
        discordUserID: z.number().nullable(),
        beatLeaderID: z.number(),
        subscriptionTier: z.number(),
        guildBoosts: z.array(z.number()),
      })
      .optional(),
    player: z
      .object({
        userID: z.number(),
        name: z.string(),
        platform: z.number(),
        hmd: z.number(),
        user_AvatarUrl: z.string(),
      })
      .optional(),
    memberList: z
      .array(
        z.object({
          guildID: z.number(),
          userID: z.number(),
          guild: GuildsAPIResponseSchema,
          permissions: z.number(),
          priority: z.number(),
          state: z.number(),
          unixTime: z.number(),
        }),
      )
      .optional(),
  })
  .nullable();
