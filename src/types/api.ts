import { z } from "zod";

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

export const GuildAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  smallName: z.string(),
  description: z.string(),
  color: z.number(),
  type: z.number(),
  joinRequirements: z.object({
    requirements: z.number(),
    minRank: z.number(),
    maxRank: z.number(),
    minPP: z.number(),
    maxPP: z.number(),
    accountAgeUnix: z.number(),
  }),
  unixCreationTime: z.number(),
  inviteCode: z.string().nullable(),
  rankedMapCount: z.number(),
  memberCount: z.number(),
});

export const GuildMapsAPIResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      guildID: z.number(),
      rankingState: z.number(),
      requirements: z.object({
        doesNeedConfirmation: z.boolean(),
        doesNeedFullCombo: z.boolean(),
        maxPauseDuration: z.number(),
        prohibitedModifiers: z.number(),
        mandatoryModifiers: z.number(),
        minAccuracy: z.number(),
      }),
      rating: z.object({
        customModifiersRating: z.number(),
        default: z.object({
          stars: z.object({ difficulty: z.number(), acc: z.number() }),
        }),
        modifiers: z.null(),
      }),
      unixCreationTime: z.number(),
      unixEditTime: z.number(),
      rankedMapVersions: z.array(
        z.object({
          version: z.number(),
          songDifficulty: z.object({
            id: z.number(),
            gameMode: z.object({ id: z.number(), name: z.string() }),
            difficulty: z.number(),
            song: z.object({
              id: z.number(),
              hash: z.string(),
              beatSaverKey: z.string(),
              name: z.string(),
              songName: z.string(),
              songSubName: z.string(),
              songAuthorName: z.string(),
              mapperName: z.string(),
              isAutoMapped: z.boolean(),
              bpm: z.number(),
              duration: z.number(),
              unixUploadedTime: z.number(),
              coverURL: z.string(),
            }),
            blid: z.string(),
            songDifficultyStats: z.object({
              id: z.number(),
              maxScore: z.number(),
              noteJumpSpeed: z.number(),
              noteCount: z.number(),
              bombCount: z.number(),
              obstacleCount: z.number(),
              notesPerSecond: z.number(),
              duration: z.number(),
            }),
          }),
        }),
      ),
    }),
  ),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export const GuildsAPIResponseSchema = z.object({
  data: z.array(GuildAPIResponseSchema),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export const MapAPIResponseSchema = z.object({
  id: z.number(),
  guildID: z.number(),
  rankingState: z.number(),
  requirements: z.object({
    doesNeedConfirmation: z.boolean(),
    doesNeedFullCombo: z.boolean(),
    maxPauseDuration: z.number(),
    prohibitedModifiers: z.number(),
    mandatoryModifiers: z.number(),
    minAccuracy: z.number(),
  }),
  rating: z.object({
    customModifiersRating: z.number(),
    default: z.object({
      stars: z.object({ difficulty: z.number(), acc: z.number() }),
    }),
    modifiers: z.null(),
  }),
  unixCreationTime: z.number(),
  unixEditTime: z.number(),
  rankedMapVersions: z.array(
    z.object({
      version: z.number(),
      songDifficulty: z.object({
        id: z.number(),
        gameMode: z.object({ id: z.number(), name: z.string() }),
        difficulty: z.number(),
        song: z.object({
          id: z.number(),
          hash: z.string(),
          beatSaverKey: z.string(),
          name: z.string(),
          songName: z.string(),
          songSubName: z.string(),
          songAuthorName: z.string(),
          mapperName: z.string(),
          isAutoMapped: z.boolean(),
          bpm: z.number(),
          duration: z.number(),
          unixUploadedTime: z.number(),
          coverURL: z.string(),
        }),
        blid: z.string(),
        songDifficultyStats: z.object({
          id: z.number(),
          maxScore: z.number(),
          noteJumpSpeed: z.number(),
          noteCount: z.number(),
          bombCount: z.number(),
          obstacleCount: z.number(),
          notesPerSecond: z.number(),
          duration: z.number(),
        }),
      }),
    }),
  ),
});

export const MapLeaderboardAPIResponseSchema = z.object({
  data: z.array(
    z.object({
      player: z.object({
        userID: z.number(),
        name: z.string(),
        platform: z.number(),
        hmd: z.number(),
        user_AvatarUrl: z.string(),
      }),
      rankedScore: z.object({
        id: z.number(),
        pointID: z.number(),
        playerID: z.number(),
        score: z.object({
          id: z.number(),
          playerID: z.number(),
          songDifficultyID: z.number(),
          baseScore: z.number(),
          modifiers: z.number(),
          unixTimeSet: z.number(),
          hmd: z.number(),
          controller: z.number(),
          hasScoreStatistic: z.boolean(),
          scoreStatistic: z.object({
            scoreID: z.number(),
            bL_ScoreID: z.number(),
            hitTracker: z.null(),
            winTracker: z.object({
              scoreStatisticID: z.number(),
              won: z.boolean(),
              endTime: z.number(),
              pauseCount: z.number(),
              totalPauseDuration: z.number(),
              jumpDistance: z.number(),
              averageHeight: z.number(),
              averageHeadPosition: z.object({
                x: z.number(),
                y: z.number(),
                z: z.number(),
              }),
              totalScore: z.number(),
              maxScore: z.number(),
            }),
            accuracyTracker: z.null(),
            graphTracker: z.null(),
          }),
        }),
        rankedMap: z.null(),
        point: z.null(),
        songDifficulty: z.null(),
        state: z.number(),
        effectiveScore: z.number(),
        rawPoints: z.number(),
        rank: z.number(),
        weight: z.number(),
        rowNumber: z.number(),
      }),
    }),
  ),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export const PlayerScoresAPIResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      pointID: z.number(),
      playerID: z.number(),
      score: z.object({
        id: z.number(),
        playerID: z.number(),
        songDifficultyID: z.number(),
        baseScore: z.number(),
        modifiers: z.number(),
        unixTimeSet: z.number(),
        controller: z.number(),
        hasScoreStatistic: z.boolean(),
        scoreStatistic: z.any(),
      }),
      rankedMap: z.object({
        id: z.number(),
        guildID: z.number(),
        rankingState: z.number(),
        requirements: z.object({
          doesNeedConfirmation: z.boolean(),
          doesNeedFullCombo: z.boolean(),
          maxPauseDuration: z.number(),
          prohibitedModifiers: z.number(),
          mandatoryModifiers: z.number(),
          minAccuracy: z.number(),
        }),
        rating: z.object({
          customModifiersRating: z.number(),
          default: z.object({
            stars: z.object({
              difficulty: z.number(),
              acc: z.number(),
            }),
          }),
          modifiers: z.any(),
        }),
        unixCreationTime: z.number(),
        unixEditTime: z.number(),
        rankedSongDifficulties: z.any(),
      }),
      point: z.any(),
      songDifficulty: z.object({
        id: z.number(),
        gameMode: z.any(),
        difficulty: z.number(),
        song: z.any(),
        blid: z.string(),
        songDifficultyStats: z.any(),
      }),
      state: z.number(),
      effectiveScore: z.number(),
      rawPoints: z.number(),
      rank: z.number(),
      weight: z.number(),
      rowNumber: z.number(),
    }),
  ),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export const PointsAPIResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      guildID: z.number(),
      name: z.string(),
      modifierValues: z.object({
        offPlatform: z.number(),
        noFail: z.number(),
        noBombs: z.number(),
        noArrows: z.number(),
        noObstacles: z.number(),
        slowerSong: z.number(),
        fasterSong: z.number(),
        superFastSong: z.number(),
        ghostNotes: z.number(),
        disappearing: z.number(),
        batteryEnergy: z.number(),
        instaFail: z.number(),
        smallNotes: z.number(),
        proMode: z.number(),
        strictAngles: z.number(),
        oldDots: z.number(),
      }),
      scale: z.number(),
      slopeMultiplier: z.number(),
      isSlopeEnabled: z.boolean(),
      isCurveEnabled: z.boolean(),
      defaultAverageAccForPointCalculation: z.number(),
      curve: z.string(),
    }),
  ),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export type GuildsAPIResponse = z.infer<typeof GuildsAPIResponseSchema>;
export type GuildAPIResponse = z.infer<typeof GuildAPIResponseSchema>;

export type MapAPIResponse = z.infer<typeof MapAPIResponseSchema>;
export type MapLeaderboardAPIResponse = z.infer<
  typeof MapLeaderboardAPIResponseSchema
>;
export type PlayerScoresAPIResponse = z.infer<
  typeof PlayerScoresAPIResponseSchema
>;
export type PointsAPIResponse = z.infer<typeof PointsAPIResponseSchema>;
