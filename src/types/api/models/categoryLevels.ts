import { z } from "zod";

export const CategoryLevelsSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  guildId: z.number(),
  value: z.number(),
  discordId: z.bigint(),
});

export type CategoryLevels = z.infer<typeof CategoryLevelsSchema>;
