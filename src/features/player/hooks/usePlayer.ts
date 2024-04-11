import { EIncludeFlags } from "@/enums/api";
import { getPlayer } from "@/features/player/utils/api";
import { useQuery } from "@tanstack/react-query";

type UsePlayerProps = {
  playerID: string;
  enabled?: boolean;
};

export const usePlayer = ({ playerID, enabled }: UsePlayerProps) =>
  useQuery({
    queryKey: ["player", playerID],
    queryFn: () =>
      getPlayer({
        playerID,
        include:
          EIncludeFlags.Users | EIncludeFlags.Points | EIncludeFlags.Categories,
      }),
    enabled: Boolean(enabled),
  });
