import { getGuildSimplePoints } from "@/features/guild/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useGuildPoints = (guildID: string) =>
  useQuery({
    queryKey: ["guilds", "points", guildID],
    queryFn: () => getGuildSimplePoints({ guildID }),
    retry: 2,
  });
