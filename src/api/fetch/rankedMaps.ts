import { EIncludeFlags } from "@/enums/api/fetch/include";
import {
  RankedMapLeaderboardApiStruct,
  RankedMapLeaderboardApiStructSchema,
} from "@/types/api/responses/leaderboard/rankedMapLeaderboardApiStruct";
import { PagedList, PagedListSchema } from "@/types/api/responses/pagedList";
import {
  RankedMapResponse,
  RankedMapResponseSchema,
} from "@/types/api/responses/rankedMapApiStruct";
import { fetchAPI } from "@/utils/fetch";

type getMapsType = {
  guildID: number;
  page: number;
  pageSize: number;
  include?: EIncludeFlags;
  search?: string;
  filters?: { [key: string]: string | number };
  categories: {
    anyMatch: boolean;
    selected: { name: string; id: number }[];
  };
  anyMatch?: boolean;
};

type getMapsLeaderboardType = {
  id: number | string;
  pointID: number;
  page: number;
  pageSize: number;
  include?: EIncludeFlags;
};

export const getMaps = async ({
  guildID,
  page,
  pageSize,
  include,
  search,
  filters,
  categories,
}: getMapsType) => {
  const cleanNullFilter = Object.fromEntries(
    Object.entries(filters as { [s: string]: string | number }).filter(
      ([_, v]) => v != 0,
    ),
  );

  const parseCategories = categories.selected.map((categorie) => {
    return `category-ids=${categorie.id}`;
  });

  return fetchAPI<PagedList<RankedMapResponse>>({
    path: `/ranked-maps/${guildID}`,
    queryParams: {
      page,
      pageSize,
      include: include,
      ...(search && { search: search }),
      ...(!!filters && cleanNullFilter),
      anyMatch: categories.anyMatch,
    },
    rawQueryParams: parseCategories.join("&"),
    authenticated: true,
    schema: PagedListSchema(RankedMapResponseSchema),
  });
};

export const getMap = async (id: number, include: EIncludeFlags) =>
  fetchAPI<RankedMapResponse>({
    path: `/ranked-map/by-id/${id}`,
    queryParams: {
      include: include,
    },
    authenticated: true,
    schema: RankedMapResponseSchema,
  });

export const getMapLeaderboard = async ({
  id,
  pointID,
  page,
  pageSize,
  include,
}: getMapsLeaderboardType) =>
  fetchAPI<PagedList<RankedMapLeaderboardApiStruct>>({
    path: `/leaderboard/ranked-map/${id}`,
    queryParams: {
      page: page,
      pageSize: pageSize,
      include: include,
      pointID: pointID,
    },
    schema: PagedListSchema(RankedMapLeaderboardApiStructSchema),
  });
