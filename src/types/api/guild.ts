import { z } from "zod";

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
    z.union([
      z.object({
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
            minAccuracy: z.number()
          }),
          rating: z.object({
            customModifiersRating: z.number(),
            default: z.object({
              stars: z.object({ difficulty: z.number(), acc: z.number() })
            }),
            modifiers: z.null()
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
                  coverURL: z.string()
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
                  duration: z.number()
                })
              })
            })
          )
        }),
        rankedScore: z.object({
          id: z.number(),
          pointID: z.number(),
          playerID: z.number(),
          score: z.null(),
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
          rowNumber: z.number()
        })
      }),
      z.object({
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
            minAccuracy: z.number()
          }),
          rating: z.object({
            customModifiersRating: z.number(),
            default: z.object({
              stars: z.object({ difficulty: z.number(), acc: z.number() })
            }),
            modifiers: z.null()
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
                  coverURL: z.string()
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
                  duration: z.number()
                })
              })
            })
          )
        }),
        rankedScore: z.null()
      })
    ])
  ),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean()
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

export type GuildsAPIResponse = z.infer<typeof GuildsAPIResponseSchema>;
export type GuildAPIResponse = z.infer<typeof GuildAPIResponseSchema>;
