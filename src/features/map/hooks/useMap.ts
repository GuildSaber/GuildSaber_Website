import { useQuery } from "@tanstack/react-query";
import { getMap } from "../utils/api";
import { MAP_API_DATA_INCLUDES } from "../utils/constants";

export const useMap = (mapID: string) =>
  useQuery({
    queryKey: ["maps", mapID],
    queryFn: () => getMap(parseInt(mapID, 10), MAP_API_DATA_INCLUDES),
    enabled: !!mapID,
  });
