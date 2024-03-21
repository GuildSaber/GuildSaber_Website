import { EIncludeFlags } from "@/enums/api";

export const FOOTER_LINKS: {
  name: string;
  href: string;
}[] = [
  {
    name: "Team",
    href: "/team",
  },
  {
    name: "Github",
    href: "https://github.com/GuildSaber/GuildSaber_Website",
  },
  {
    name: "Api",
    href: "/api",
  },
  {
    name: "Privacy",
    href: "/terms-of-use",
  },
];

export const PLAYER_PAGE_SIZE = 10;
export const PLAYER_API_SCORES_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.Scores |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.SongDifficultyStats;
