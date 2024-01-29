import { z } from "zod";

export const GuildBoostSchema = z.object({
  userId: z.number(),
  guildId: z.number(),
  tier: z.enum(["Default", "Bronze", "Silver", "Gold", "Platinum"]),
  unixExpireTime: z.bigint(),
});

export type GuildBoost = z.infer<typeof GuildBoostSchema>;
