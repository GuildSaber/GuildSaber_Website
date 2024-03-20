import { z } from "zod";
import { GuildSchema } from "./guild";

export const PlaylistSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.nullable(z.string()),
  color: z.number(),
  guildID: z.number(),
  guild: z.nullable(GuildSchema),
});

export type Playlist = z.infer<typeof PlaylistSchema>;
