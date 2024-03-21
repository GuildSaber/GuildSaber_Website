import { GUILD_API_MAPS_DATA_INCLUDES } from "@/features/guild/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getMaps } from "../utils/api";
import { MAP_PAGE_SIZE } from "../utils/constants";

type Categories = {
  anyMatch: boolean;
  selected: { name: string; id: number }[];
};

export const useMapsGuild = (
  guildID: string,
  filters: any,
  search: string,
  categories: Categories,
) =>
  useQuery({
    queryKey: [
      "guilds",
      guildID,
      "maps",
      filters.page,
      filters,
      search,
      categories,
    ],
    queryFn: () =>
      getMaps({
        guildID: parseInt(guildID),
        page: filters.page,
        pageSize: MAP_PAGE_SIZE,
        include: GUILD_API_MAPS_DATA_INCLUDES,
        categories,
        filters,
        search,
      }),
    enabled: !!guildID,
    retry: 2,
  });
