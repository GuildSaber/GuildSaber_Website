import { z } from "zod";
import { EHMD } from "@/enums/api/models//hmd";
import { EPlatform } from "@/enums/api/models//platform";

export const PlayerSchema = z.object({
  userID: z.number(),
  name: z.string().max(32),
  platform: z.nativeEnum(EPlatform),
  hmd: z.nativeEnum(EHMD),
  country: z.string(),
  user_AvatarUrl: z.string().nullable(),
});

export type Player = z.infer<typeof PlayerSchema>;
