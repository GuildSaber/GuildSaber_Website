import { EIncludeFlags } from "@/enums/api";
import { EJoinState } from "@/enums/guild";
import { getGuildMember } from "@/features/guild/utils/api";
import { useQuery } from "@tanstack/react-query";

type UseGuildMemberType = {
  guildID: number;
  page: number;
  pageSize: number;
  enabled?: boolean;
  search?: string;
  state?: EJoinState;
};

export const useGuildMember = ({
  guildID,
  page,
  pageSize,
  enabled = true,
  search,
  state,
}: UseGuildMemberType) =>
  useQuery({
    queryKey: ["guilds", guildID, "member", page, search, state],
    queryFn: () =>
      getGuildMember({
        guildID,
        page,
        pageSize,
        include: EIncludeFlags.Users,
        search,
        state,
      }),
    enabled: Boolean(enabled),
  });
