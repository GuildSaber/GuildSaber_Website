export enum EIncludeFlags {
  None = 0,
  Categories = 1 << 0,
  CategoryLevels = 1 << 1,
  GameModes = 1 << 2,
  Guilds = 1 << 3,
  Levels = 1 << 4,
  Members = 1 << 5,
  GuildBoosts = 1 << 6,
  Players = 1 << 7,
  PlayerCategoryPointStats = 1 << 8,
  PlayerPointStats = 1 << 9,
  Playlists = 1 << 10,
  Points = 1 << 11,
  RankedMaps = 1 << 12,
  RankedScores = 1 << 13,
  RankedMapVersions = 1 << 14,
  Scores = 1 << 15,
  ScoreStatistics = 1 << 16,
  HitTrackers = 1 << 17,
  WinTrackers = 1 << 18,
  AccuracyTrackers = 1 << 19,
  ScoreGraphTrackers = 1 << 20,
  Songs = 1 << 21,
  SongDifficulties = 1 << 22,
  SongDifficultyStats = 1 << 23,
  Tags = 1 << 24,
  Users = 1 << 25,
  UserSessions = 1 << 26,
}
