import { z } from "zod";
import { GuildSchema } from "./guild";

export const PlaylistSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.optional(z.string()),
  color: z.number(),
  guildID: z.number(),
  guild: z.optional(GuildSchema),
});

export type Playlist = z.infer<typeof PlaylistSchema>;
