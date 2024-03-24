import { useQuery } from "@tanstack/react-query";
import { getMapLeaderboard } from "../utils/api";
import {
  MAP_API_LEADERBOARD_DATA_INCLUDES,
  MAP_PAGE_SIZE,
} from "../utils/constants";

type UseMapLeaderboardProps = {
  mapID: string | number;
  pointID: number;
  page: number;
  pageSize?: number;
  enabled: boolean;
};

export const useMapLeaderboard = ({
  mapID,
  pointID,
  page,
  pageSize,
  enabled,
}: UseMapLeaderboardProps) =>
  useQuery({
    queryKey: ["leaderboard", mapID, pointID, page],
    queryFn: () =>
      getMapLeaderboard({
        id: mapID,
        pointID,
        page: page,
        pageSize: pageSize || MAP_PAGE_SIZE,
        include: MAP_API_LEADERBOARD_DATA_INCLUDES,
      }),
    enabled: Boolean(enabled),
  });
