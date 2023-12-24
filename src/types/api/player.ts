import { z } from "zod";

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
        missedNotes: z.number(),
        badCuts: z.number(),
        hasTrackers: z.boolean(),
      }),
      prevScore: z.object({
        id: z.number(),
        playerID: z.number(),
        songDifficultyID: z.number(),
        baseScore: z.number(),
        modifiers: z.number(),
        unixTimeSet: z.number(),
        controller: z.number(),
        missedNotes: z.number(),
        badCuts: z.number(),
        hasTrackers: z.boolean(),
      }).nullable(),
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
      createdUnixTime: z.number(),
      modifiedUnixTime: z.number(),
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
      difficultyScale: z.number(),
      accuracyScale: z.number(),
      slopeMultiplier: z.number(),
      isSlopeEnabled: z.boolean(),
      isCurveEnabled: z.boolean(),
      defaultAverageAccForPointCalculation: z.number(),
      diffCurve: z.string(),
      accCurve: z.string(),
    }),
  ),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export const PlayerAPIResponseSchema = z.object({
  player: z.object({
    userID: z.number(),
    name: z.string(),
    platform: z.number(),
    hmd: z.number(),
    user_AvatarUrl: z.string(),
  }),
  guilds: z.array(
    z.object({
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
      inviteCode: z.null(),
      rankedMapCount: z.null(),
      memberCount: z.null(),
    }),
  ),
});

export const PlayerStatsAPIResponseSchema = z.object({
  playerID: z.number(),
  pointID: z.number(),
  rank: z.number(),
  validPassCount: z.number(),
  pointValue: z.number(),
});

export type PlayerScoresAPIResponse = z.infer<
  typeof PlayerScoresAPIResponseSchema
>;
export type PointsAPIResponse = z.infer<typeof PointsAPIResponseSchema>;
export type PlayerStatsAPIResponse = z.infer<
  typeof PlayerStatsAPIResponseSchema
>;
