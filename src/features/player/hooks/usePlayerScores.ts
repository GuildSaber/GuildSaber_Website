import { getPlayerScores } from "@/features/player/utils/api";
import { PLAYER_API_SCORES_DATA_INCLUDES } from "@/features/player/utils/constants";
import { useQuery } from "@tanstack/react-query";

type UsePlayerScoresProps = {
  playerID: string;
  pointID: string;
  filters: any;
  page: number;
  enabled?: boolean;
};

export const usePlayerScores = ({
  playerID,
  pointID,
  filters,
  page,
  enabled,
}: UsePlayerScoresProps) =>
  useQuery({
    queryKey: ["player", playerID, "scores", pointID, filters, page],
    queryFn: () =>
      getPlayerScores({
        playerID,
        pointID,
        page,
        filters,
        include: PLAYER_API_SCORES_DATA_INCLUDES,
      }),
    enabled: Boolean(enabled),
  });
