import { z } from "zod";

export const CategoryLevelSchema = z.object({
  levelID: z.number(),
  categoryID: z.number(),
  guildID: z.number(),
  canUseNumberOverride: z.boolean(),
  numberOverride: z.number(),
  nameOverride: z.string(),
  colorOverride: z.number(),
  thresholdOverride: z.number(),
  discordRoleIdOverride: z.string().nullish(),
});

export type CategoryLevel = z.infer<typeof CategoryLevelSchema>;
