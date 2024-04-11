import { EIncludeFlags } from "@/enums/api";

export const PLAYER_PAGE_SIZE = 10;

export const PLAYER_API_SCORES_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.Scores |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.SongDifficultyStats;

export const PLAYER_FILTER_SORT_BY_VALUES = [
  { value: "Points", label: "Points" },
  { value: "Time", label: "Time" },
  { value: "Accuracy", label: "Accuracy" },
  { value: "Score", label: "Score" },
  { value: "Rank", label: "Rank" },
  { value: "Difficulty", label: "Difficulty" },
];

export const PLAYER_FILTER_ORDER_VALUES = [
  { value: "Desc", label: "Desc" },
  { value: "Asc", label: "Asc" },
];
