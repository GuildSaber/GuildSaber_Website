import { getGuildSimplePoints } from "@/features/guild/utils/api";
import { useQuery } from "@tanstack/react-query";

type UseGuildPointsType = {
  guildID: number;
  enabled?: boolean;
};

export const useGuildPoints = ({ guildID, enabled }: UseGuildPointsType) =>
  useQuery({
    queryKey: ["guilds", "points", guildID],
    queryFn: () => getGuildSimplePoints({ guildID }),
    enabled: Boolean(enabled),
  });
