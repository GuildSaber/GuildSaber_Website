import { GuildSchema } from "@/types/api/models/guild";
import { MemberSchema } from "@/types/api/models/member";
import { PlayerSchema } from "@/types/api/models/player";
import { UserSchema } from "@/types/api/models/user";
import { z } from "zod";
import { PlayerCategoryLevelStatSchema } from "../models/playerCategoryLevelStat";
import { PlayerLevelStatSchema } from "../models/playerLevelStat";

export const PlayerAtMeStructSchema = z.object({
  user: UserSchema,
  player: PlayerSchema,
  memberList: z.array(MemberSchema),
  isGuildSaberManager: z.boolean(),
});

export type PlayerAtMeStruct = z.infer<typeof PlayerAtMeStructSchema>;

export const PlayerPointStatsStructSchema = z.object({
  pointID: z.number(),
  pointName: z.string(),
  rank: z.number(),
  validPassCount: z.number(),
  pointValue: z.number(),
});

export type PlayerPointStatsStruct = z.infer<
  typeof PlayerPointStatsStructSchema
>;

export const PlayerCategoryPointStatsStructSchema = z.object({
  categoryID: z.number(),
  categoryName: z.string(),
  pointID: z.number(),
  pointName: z.string(),
  rank: z.number(),
  validPassCount: z.number(),
  pointValue: z.number(),
});

export type PlayerCategoryPointStatsStruct = z.infer<
  typeof PlayerCategoryPointStatsStructSchema
>;

export const PlayerResponseStructSchema = z.object({
  player: PlayerSchema,
  guilds: z.array(GuildSchema),
});

export type PlayerResponseStruct = z.infer<typeof PlayerResponseStructSchema>;

export const PlayerGuildStatsStructSchema = z.object({
  playerPointStats: z.array(PlayerPointStatsStructSchema),
  playerCategoryPointStats: z.array(PlayerCategoryPointStatsStructSchema),
  playerLevelStat: PlayerLevelStatSchema,
  playerCategoryLevelStats: z.array(PlayerCategoryLevelStatSchema),
});

export type PlayerGuildStatsStruct = z.infer<
  typeof PlayerGuildStatsStructSchema
>;
