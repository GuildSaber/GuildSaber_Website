import { EIncludeFlags } from "@/enums/api/fetch/include";
import { EGuildType } from "@/enums/api/models/guildType";
import { EPermission } from "@/enums/api/models/permission";
import { Guild, GuildSchema } from "@/types/api/models/guild";
import { MapData, MapDataSchema } from "@/types/api/models/rankedMap";
import { PagedList, PagedListSchema } from "@/types/api/responses/pagedList";
import { fetchAPI } from "@/utils/fetch";

type getAllGuildParams = {
  page: number;
  pageSize: number;
  include?: EIncludeFlags;
  filters?: {
    guildTypes: string[];
    [key: string]: string | string[];
  };
  guildType?: EGuildType;
  search?: string;
  userID?: number;
  permissionFlag?: EPermission;
};

type getGuild = {
  id: number;
  userID?: number;
  include?: EIncludeFlags;
};

export const getAllGuilds = async ({
  page,
  pageSize,
  include,
  filters,
  search,
  userID,
  permissionFlag,
}: getAllGuildParams) => {
  let parsefilter;

  if (filters) {
    parsefilter = {
      ...filters,
      guildTypes: filters.guildTypes.reduce((acc, v) => acc + +v, 0).toString(),
    };
  }

  return fetchAPI<PagedList<Guild>>({
    path: `/guilds`,
    queryParams: {
      page,
      pageSize,
      ...(permissionFlag && { permissionFlag: permissionFlag }),
      ...(userID && { userID: userID }),
      include,
      ...(!!filters && parsefilter),
      ...(!!search && { search }),
    },
    authenticated: false,
    schema: PagedListSchema(GuildSchema),
  });
};

export const getGuild = async ({ id, include, userID }: getGuild) => {
  //remove all object key with 0 value in filters

  return fetchAPI<Guild>({
    path: `/guild/by-id/${id}`,
    queryParams: {
      ...(userID && { userID }),
      //...(!!filters && filters.reduce((acc, v) => acc + +v, 0).toString()),
      include: include,
    },
    authenticated: false,
    schema: GuildSchema,
  });
};

type getGuildMaps = {
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

export const getGuildMaps = async ({
  guildID,
  page,
  pageSize,
  include,
  search,
  filters,
  categories,
}: getGuildMaps) => {
  const cleanNullFilter = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v != 0),
  );

  const parseCategories = categories.selected.map((categorie) => {
    return `category-ids=${categorie.id}`;
  });

  return fetchAPI<PagedList<MapData>>({
    path: `/ranked-maps/${guildID}`,
    queryParams: {
      page,
      pageSize,
      include: include,
      ...(search && { search: search }),
      ...(!!filters && cleanNullFilter),
      categories: parseCategories.join("&"),
      anyMatch: categories.anyMatch,
    },
    authenticated: true,
    schema: PagedListSchema(MapDataSchema),
  });
};
