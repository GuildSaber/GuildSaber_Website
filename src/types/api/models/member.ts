import { EJoinState } from "@/enums/api/models/joinState";
import { ESubscriptionTier } from "@/enums/api/models/subscriptionTier";
import { z } from "zod";

export const MemberSchema = z.object({
  guildID: z.number(),
  userID: z.number(),
  username: z.string(),
  permissions: z.number(),
  state: z.nativeEnum(EJoinState),
  priority: z.number(),
  unixTime: z.number(),
  subscriptionTier: z.nativeEnum(ESubscriptionTier),
});

export type Member = z.infer<typeof MemberSchema>;
