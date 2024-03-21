import { EIncludeFlags } from "@/enums/api";

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
