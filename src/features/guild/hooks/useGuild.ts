import { getGuild } from "@/features/guild/utils/api";
import { useQuery } from "@tanstack/react-query";
import { GUILD_API_DATA_INCLUDES } from "../utils/constants";

export const useGuild = (guildID: string) =>
  useQuery({
    queryKey: ["guilds", guildID],
    queryFn: () =>
      getGuild({ id: parseInt(guildID), include: GUILD_API_DATA_INCLUDES }),
    retry: 2,
  });
