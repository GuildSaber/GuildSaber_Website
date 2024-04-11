import { useQuery } from "@tanstack/react-query";
import { getPlayerGuildStats } from "../utils/api";

type UsePlayerStatsProps = {
  playerID: string;
  guildID: number;
  enabled?: boolean;
};

export const usePlayerGuildStats = ({
  playerID,
  guildID,
  enabled,
}: UsePlayerStatsProps) =>
  useQuery({
    queryKey: ["player", playerID, "stats", guildID],
    queryFn: () =>
      getPlayerGuildStats({
        playerID,
        guildID,
      }),
    enabled: Boolean(enabled),
  });
