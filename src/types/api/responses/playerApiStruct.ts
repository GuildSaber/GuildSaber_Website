import { z } from "zod";
import { UserSchema } from "@/types/api/models/user";
import { PlayerSchema } from "@/types/api/models/player";
import { MemberSchema } from "@/types/api/models/member";
import { GuildSchema } from "@/types/api/models/guild";

export const PlayerAtMeStructSchema = z.object({
  user: UserSchema,
  player: PlayerSchema,
  memberList: z.array(MemberSchema),
  isGuildSaberManager: z.boolean(),
});

export type PlayerAtMeStruct = z.infer<typeof PlayerAtMeStructSchema>;

export const PlayerPointStatsStructSchema = z.object({
  playerId: z.number(),
  pointId: z.number(),
  rank: z.number(),
  validPassCount: z.number(),
  pointValue: z.number(),
});

export type PlayerPointStatsStruct = z.infer<
  typeof PlayerPointStatsStructSchema
>;

export const PlayerResponseStructSchema = z.object({
  player: PlayerSchema,
  guilds: z.array(GuildSchema).nullish(),
});

export type PlayerResponseStruct = z.infer<typeof PlayerResponseStructSchema>;
