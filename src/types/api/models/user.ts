import { z } from "zod";
import { ESubscriptionTier } from "@/enums/api/models/subscriptionTier";
import { GuildBoostSchema } from "./guildBoost";

export const UserSchema = z.object({
  ID: z.number(),
  DiscordUserID: z.number().nullable(),
  BeatLeaderID: z.number().nullable(),
  SubscriptionTier: z.nativeEnum(ESubscriptionTier),
  GuildBoosts: z.array(GuildBoostSchema).nullable(),
});

export type User = z.infer<typeof UserSchema>;
