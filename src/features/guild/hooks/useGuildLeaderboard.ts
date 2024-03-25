import { getGuildLeaderboard } from "@/features/guild/utils/api";
import { useQuery } from "@tanstack/react-query";
import { GUILD_LEADERBOARD_PAGE_SIZE } from "../utils/constants";

export const useGuildLeaderboard = (
  pointID: number,
  page: number,
  pageSize: number,
  enabled: boolean,
) =>
  useQuery({
    queryKey: ["guilds", "leaderboard", pointID, page, pageSize],
    queryFn: () =>
      getGuildLeaderboard({
        pointID,
        page,
        pageSize: pageSize || GUILD_LEADERBOARD_PAGE_SIZE,
      }),
    retry: 2,
    enabled: Boolean(enabled),
  });
