import { getGuildLeaderboard } from "@/features/guild/utils/api";
import { useQuery } from "@tanstack/react-query";
import { GUILD_LEADERBOARD_PAGE_SIZE } from "../utils/constants";

type UseGuidLeaderboardType = {
  pointID: number;
  page: number;
  pageSize: number;
  categoryID: number;
  enabled: boolean;
};

export const useGuildLeaderboard = ({
  pointID,
  page,
  pageSize,
  categoryID,
  enabled,
}: UseGuidLeaderboardType) =>
  useQuery({
    queryKey: ["guilds", "leaderboard", categoryID, pointID, , page, pageSize],
    queryFn: () =>
      getGuildLeaderboard({
        pointID: pointID,
        categoryID,
        page,
        pageSize: pageSize || GUILD_LEADERBOARD_PAGE_SIZE,
      }),
    retry: 2,
    enabled: Boolean(enabled),
  });
