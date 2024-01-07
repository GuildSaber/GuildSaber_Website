import { z } from "zod";

export const MapAPIResponseSchema = z.object({
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
  rankedScore: z
    .object({
      id: z.number(),
      pointID: z.number(),
      playerID: z.number(),
      score: z
        .object({
          id: z.number(),
          playerID: z.number(),
          songDifficultyID: z.number(),
          baseScore: z.number(),
          modifiers: z.number(),
          unixTimeSet: z.number(),
          bL_ScoreID: z.number(),
          maxCombo: z.number(),
          fullCombo: z.boolean(),
          missedNotes: z.number(),
          badCuts: z.number(),
          hmd: z.number(),
          controller: z.number(),
          hasTrackers: z.boolean(),
          hitTracker: z.null(),
          winTracker: z
            .object({
              scoreID: z.number(),
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
            })
            .nullable(),
          accuracyTracker: z.null(),
          graphTracker: z.null(),
        })
        .nullable(),
      prevScore: z.null(),
      rankedMap: z.null(),
      point: z.null(),
      songDifficulty: z.null(),
      state: z.number(),
      effectiveScore: z.number(),
      rawPoints: z.number(),
      createdUnixTime: z.number(),
      modifiedUnixTime: z.number(),
      rank: z.number(),
      weight: z.number(),
      rowNumber: z.number(),
    })
    .nullable(),
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
          hasTrackers: z.boolean(),
          bL_ScoreID: z.number().nullable(),
          hitTracker: z.null(),
          winTracker: z
            .object({
              scoreID: z.number(),
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
            })
            .nullable(),
          accuracyTracker: z.null(),
          graphTracker: z.null(),
        }),
        createdUnixTime: z.number(),
        modifiedUnixTime: z.number(),
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

export type MapAPIResponse = z.infer<typeof MapAPIResponseSchema>;
export type MapLeaderboardAPIResponse = z.infer<
  typeof MapLeaderboardAPIResponseSchema
>;
