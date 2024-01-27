export enum EPermission {
  None = 0,
  GuildLeader = 1 << 0,
  RankingTeam = 1 << 1,
  ScoringTeam = 1 << 2,
  MemberTeam = 1 << 3,
  GuildSaberManager = 1 << 30,
}
