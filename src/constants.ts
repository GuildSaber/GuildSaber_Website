import { EIncludeFlags } from "./enums/api";
import { EJoinState } from "./enums/guild";

export const FOOTER_LINKS: {
  name: string;
  href: string;
}[] = [
  {
    name: "Team",
    href: "/team",
  },
  {
    name: "Github",
    href: "https://github.com/GuildSaber/GuildSaber_Website",
  },
  {
    name: "Api",
    href: "/api",
  },
  {
    name: "Privacy",
    href: "/terms-of-use",
  },
];

export const GUILD_MENU_MAX_GUILD_NAME_LENGTH = 16;
export const GUILD_MENU_MAX_VISIBLE_GUILD_COUNT = 3;
export const GUILD_MENU_MAX_COLLAPSED_GUILD_COUNT = 5;

export const GUILDS_PAGE_SIZE = 4;
export const GUILDS_FILTER_GUILD_TYPES = [
  { value: "1", label: "Unverified" },
  { value: "2", label: "Verified" },
  { value: "4", label: "Featured" },
  { value: "8", label: "Private" },
];

export const GUILDS_FILTER_SORT_BY_VALUES = [
  { value: "Popularity", label: "Popularity" },
  { value: "Name", label: "Name" },
  { value: "CreationDate", label: "Creation Date" },
  { value: "MapCount", label: "Map Count" },
  { value: "MemberCount", label: "Member Count" },
];

export const GUILD_PAGE_SIZE = 8;
export const GUILD_FILTER_SORT_BY_VALUES = [
  { value: "Difficulty", label: "Difficulty" },
  { value: "Time", label: "RankTime" },
  { value: "EditTime", label: "EditTime" },
  { value: "Accuracy", label: "MinAccuracy" },
];

export const GUILD_API_DATA_INCLUDES =
  EIncludeFlags.Categories | EIncludeFlags.Members | EIncludeFlags.RankedMaps;

export const GUILD_API_MAPS_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficultyStats |
  EIncludeFlags.RankedScores;

export const GUILD_CARD_STATES: { [key: string]: string } = {
  [EJoinState.None]: "None",
  [EJoinState.Requested]: "Requested",
  [EJoinState.Joined]: "Joined",
  [EJoinState.Refused]: "Refused",
  [EJoinState.Banned]: "Banned",
};

export const MAP_PAGE_SIZE = 10;
export const MAP_API_DATA_INCLUDES =
  EIncludeFlags.Songs |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.SongDifficultyStats |
  EIncludeFlags.GameModes |
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.RankedScores |
  EIncludeFlags.Scores |
  EIncludeFlags.HitTrackers |
  EIncludeFlags.Points;

export const MAP_API_LEADERBOARD_DATA_INCLUDES =
  EIncludeFlags.Players |
  EIncludeFlags.Users |
  EIncludeFlags.Scores |
  EIncludeFlags.WinTrackers;

export const PLAYER_PAGE_SIZE = 10;
export const PLAYER_API_SCORES_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.Scores |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.SongDifficultyStats;
