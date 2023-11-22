export type GuildsAPIResponse = {
  data: GuildAPIResponse[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type GuildAPIResponse = {
  id: number;
  name: string;
  smallName: string;
  description: string;
  color: number;
  type: number;
  joinRequirements: {
    requirements: number;
    minRank: number;
    maxRank: number;
    minPP: number;
    maxPP: number;
    accountAgeUnix: number;
  };
  unixCreationTime: number;
  inviteCode: string | null;
  rankedMapCount: number;
  memberCount: number;
};
