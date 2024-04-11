import { EIncludeFlags } from "@/enums/api";
import {
  PlayerGuildStatsStruct,
  PlayerGuildStatsStructSchema,
  PlayerPointStatsStruct,
  PlayerPointStatsStructSchema,
  PlayerResponseStruct,
  PlayerResponseStructSchema,
} from "@/types/api/responses/playerApiStruct";
import {
  PlayerScoresApiStruct,
  PlayerScoresApiStructSchema,
} from "@/types/api/responses/playerScoresApiStruct";
import { fetchAPI } from "@/utils/fetch";
import { PLAYER_PAGE_SIZE } from "./constants";

type GetPlayerType = {
  playerID: string;
  include?: EIncludeFlags;
};

export const getPlayer = async ({ playerID, include }: GetPlayerType) =>
  fetchAPI<PlayerResponseStruct>({
    path: `/player/by-id/${playerID}`,
    queryParams: {
      include,
    },
    schema: PlayerResponseStructSchema,
  });

type GetPlayerPointStatsType = {
  playerID: string;
  pointID: number;
};

export const getPlayerPointStats = async ({
  playerID,
  pointID,
}: GetPlayerPointStatsType) =>
  fetchAPI<PlayerPointStatsStruct>({
    path: `/player/by-id/${playerID}/point-stats/${pointID}`,
    schema: PlayerPointStatsStructSchema,
  });

type GetPlayerGuildStatsType = {
  playerID: string;
  guildID: number;
};

export const getPlayerGuildStats = async ({
  playerID,
  guildID,
}: GetPlayerGuildStatsType) =>
  fetchAPI<PlayerGuildStatsStruct>({
    path: `/player/by-id/${playerID}/guild-stats/${guildID}`,
    schema: PlayerGuildStatsStructSchema,
  });

type GetPlayerScoresType = {
  playerID: string;
  pointID: string;
  page: number;
  pageSize?: number;
  filters?: {
    guildTypes: string[];
    [key: string]: string | string[];
  };
  include?: EIncludeFlags;
};

export const getPlayerScores = async ({
  playerID,
  pointID,
  page,
  pageSize,
  filters,
  include,
}: GetPlayerScoresType) =>
  fetchAPI<PlayerScoresApiStruct>({
    path: "/ranked-scores",
    queryParams: {
      page,
      pageSize: pageSize || PLAYER_PAGE_SIZE,
      userID: playerID,
      pointID,
      ...(!!filters && filters),
      include,
    },
    schema: PlayerScoresApiStructSchema,
  });
