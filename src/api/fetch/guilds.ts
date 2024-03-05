import { EIncludeFlags } from "@/enums/api/fetch/include";
import { EGuildType } from "@/enums/api/models/guildType";
import { EPermission } from "@/enums/api/models/permission";
import { Guild, GuildSchema } from "@/types/api/models/guild";
import { PagedList, PagedListSchema } from "@/types/api/responses/pagedList";
import { fetchAPI } from "@/utils/fetch";

type getAllGuildParamsType = {
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

type getGuildType = {
  id: number;
  userID?: number;
  include?: EIncludeFlags;
};

export const getGuilds = async ({
  page,
  pageSize,
  include,
  filters,
  search,
  userID,
  permissionFlag,
}: getAllGuildParamsType) => {
  return fetchAPI<PagedList<Guild>>({
    path: `/guilds`,
    queryParams: {
      page,
      pageSize,
      ...(permissionFlag && { permissionFlag: permissionFlag }),
      ...(userID && { userID: userID }),
      include,
      ...(!!filters && filters),
      ...(!!search && { search }),
    },
    authenticated: false,
    schema: PagedListSchema(GuildSchema),
  });
};

export const getGuild = async ({ id, include, userID }: getGuildType) => {
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
