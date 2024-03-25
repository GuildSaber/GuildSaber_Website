import { EIncludeFlags } from "@/enums/api";
import { EPassState } from "@/enums/api/models/passState";
import { EJoinState } from "@/enums/guild";
import {
  faCheckCircle,
  faLock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export const GUILD_MENU_MAX_GUILD_NAME_LENGTH = 16;
export const GUILD_MENU_MAX_VISIBLE_GUILD_COUNT = 3;
export const GUILD_MENU_MAX_COLLAPSED_GUILD_COUNT = 5;

export const GUILDS_PAGE_SIZE = 4;
export const GUILD_LEADERBOARD_PAGE_SIZE = 50;

export const GUILD_LEADERBOARD_PAGE_SIZE_OPTIONS = [
  { label: "50 pages", value: 50 },
  { label: "30 pages", value: 30 },
  { label: "20 pages", value: 20 },
  { label: "10 pages", value: 10 },
];

export const GUILDS_FILTER_GUILD_TYPES = [
  { value: "1", label: "Unverified", icon: null },
  { value: "2", label: "Verified", icon: faCheckCircle },
  { value: "4", label: "Featured", icon: faStar },
  { value: "8", label: "Private", icon: faLock },
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
  { value: "Time", label: "Time" },
  { value: "EditTime", label: "Edit Time" },
  { value: "Accuracy", label: "Accuracy" },
];

export const GUILD_FILTER_PASS_STATE = [
  { value: EPassState.All, label: "All", color: "#fff" },
  { value: EPassState.AllAllowed, label: "Allowed", color: "#53b365" },
  {
    value: EPassState.MissingRequirements,
    label: "Invalid",
    color: "#c35410",
  },
  {
    value: EPassState.AllDenied,
    label: "Denied",
    color: "#B0436E",
  },
  { value: EPassState.UnPassed, label: "UnPassed", color: "#000" },
];

export const GUILD_API_DATA_INCLUDES =
  EIncludeFlags.Categories |
  EIncludeFlags.Members |
  EIncludeFlags.RankedMaps |
  EIncludeFlags.Scores;

export const GUILD_API_MAPS_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficultyStats |
  EIncludeFlags.RankedScores |
  EIncludeFlags.Scores;

export const GUILD_CARD_STATES: { [key: string]: string } = {
  [EJoinState.None]: "None",
  [EJoinState.Requested]: "Requested",
  [EJoinState.Joined]: "Joined",
  [EJoinState.Refused]: "Refused",
  [EJoinState.Banned]: "Banned",
};
