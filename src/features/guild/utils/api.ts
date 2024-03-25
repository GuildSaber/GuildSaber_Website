import { EIncludeFlags } from "@/enums/api/fetch/include";
import { EGuildType } from "@/enums/api/models/guildType";
import { EPermission } from "@/enums/api/models/permission";
import { Guild, GuildSchema } from "@/types/api/models/guild";
import { SimplePointSchema, SimplePoints } from "@/types/api/models/point";
import {
  PlayerLeaderboardApiStruct,
  PlayerLeaderboardApiStructSchema,
} from "@/types/api/responses/leaderboard/playerLeaderBoardApiStruct";
import { PagedList, PagedListSchema } from "@/types/api/responses/pagedList";
import { fetchAPI } from "@/utils/fetch";
import { z } from "zod";

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

type getGuildSimplePointsType = {
  guildID: string | number;
};

type getGuildLeaderboardType = {
  pointID: string | number;
  page: number;
  pageSize?: number;
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

export const getGuild = async ({ id, include, userID }: getGuildType) =>
  fetchAPI<Guild>({
    path: `/guild/by-id/${id}`,
    queryParams: {
      ...(userID && { userID }),
      include: include,
    },
    authenticated: false,
    schema: GuildSchema,
  });

export const joinGuild = (guildID: number) =>
  fetchAPI({
    method: "POST",
    path: `/members/join-guild/${guildID}`,
    authenticated: true,
  });

export const getGuildSimplePoints = async ({
  guildID,
}: getGuildSimplePointsType) =>
  fetchAPI<SimplePoints[]>({
    path: `/simple-points`,
    queryParams: {
      guildID: guildID,
    },
    schema: z.array(SimplePointSchema),
  });

export const getGuildLeaderboard = async ({
  pointID,
  page,
  pageSize,
}: getGuildLeaderboardType) =>
  fetchAPI<PagedList<PlayerLeaderboardApiStruct>>({
    path: `/leaderboard/player/${pointID}`,
    queryParams: {
      page,
      pageSize,
    },
    schema: PagedListSchema(PlayerLeaderboardApiStructSchema),
  });
