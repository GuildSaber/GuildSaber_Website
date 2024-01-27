import { z } from "zod";
import { EJoinState } from "@/enums/api/models/joinState";
import { EPermission } from "@/enums/api/models//permission";
import { ESubscriptionTier } from "@/enums/api/models/subscriptionTier";

export const MemberSchema = z.object({
  guildID: z.number(),
  userID: z.number(),
  permissions: z.nativeEnum(EPermission),
  state: z.nativeEnum(EJoinState),
  priority: z.number(),
  unixTime: z.number(),
  subscriptionTier: z.nativeEnum(ESubscriptionTier),
});

export type Member = z.infer<typeof MemberSchema>;
