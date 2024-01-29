import { EIncludeFlags } from "@/enums/api/fetch/include";
import {
  RankedMapResponseSchema,
  RankedMapResponse,
} from "@/types/api/responses/rankedMapApiStruct";
import { PagedList, PagedListSchema } from "@/types/api/responses/pagedList";
import { fetchAPI } from "@/utils/fetch";
import { RankedMap, RankedMapSchema } from "@/types/api/models/rankedTypes";

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
  fetchAPI<RankedMap>({
    path: `/ranked-map/by-id/${id}`,
    queryParams: {
      include: include,
    },
    authenticated: true,
    schema: RankedMapSchema,
  });
