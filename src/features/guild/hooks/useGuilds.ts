import { EIncludeFlags } from "@/enums/api";
import { getGuilds } from "@/features/guild/utils/api";
import { useQuery } from "@tanstack/react-query";
import { GUILDS_PAGE_SIZE } from "../utils/constants";

export const useGuilds = (filters: any, search: string) =>
  useQuery({
    queryKey: ["guilds", filters, search],
    queryFn: () =>
      getGuilds({
        page: filters.page,
        pageSize: GUILDS_PAGE_SIZE,
        include: EIncludeFlags.RankedMaps | EIncludeFlags.Members,
        search,
        filters,
      }),
  });
