import { getGuilds } from "@/api/fetch/guilds";
import List from "@/components/Common/List";
import ListBox from "@/components/Common/ListBox/ListBox";
import ListBoxMultiple from "@/components/Common/ListBox/ListBoxMultiple";
import Loader from "@/components/Common/Loader";
import SearchBar from "@/components/Common/SearchBar";
import GuildCard from "@/components/Guild/GuildCard";
import {
  GUILDS_FILTER_GUILD_TYPES,
  GUILDS_FILTER_SORT_BY_VALUES,
  GUILDS_PAGE_SIZE,
} from "@/constants";
import { EIncludeFlags } from "@/enums/api";
import { EJoinState } from "@/enums/guild";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParamsState } from "react-use-search-params-state";

export default function Guilds() {
  const [filter, setFilter] = useSearchParamsState({
    page: { type: "number", default: 1 },
    "sort-by": { type: "string", default: "Popularity" },
    "order-by": { type: "string", default: "Desc" },
    guildTypes: { type: "string", default: "0,1,2,4" },
  });

  const [search, setSearch] = useState("");
  const [intermediateSearch, setIntermediateSearch] = useState("");

  const { session, dispatch } = useAuthContext();

  const queryClient = useQueryClient();

  const updateSearch = (term: string) => {
    setSearch(term);
    setFilter({ page: 1 });
  };

  const joinGuild = (guildID: number) =>
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/members/join-guild/${guildID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      },
    ).then((res) => res.json());

  const mutation = useMutation({
    mutationFn: (guildID: number) => joinGuild(guildID),
    onSuccess: (data) => {
      switch (data.state) {
        case EJoinState.Joined:
          toast.success("Successfully joined");
          break;

        case EJoinState.Requested:
          toast.success("Successfully requested");
          break;
      }

      dispatch({ type: "GUILD_ADD", payload: data });
      queryClient.invalidateQueries({
        queryKey: ["guilds", filter],
      });
    },
    onError: () => {
      toast.error("Failed to join guild");
    },
  });

  const tryJoin = async (guildID: number) => {
    if (!session?.token) {
      toast.error("You need to be logged in to join");
      return;
    }

    mutation.mutate(guildID);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIntermediateSearch(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const {
    data: guilds,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guilds", filter, intermediateSearch],
    queryFn: () =>
      getGuilds({
        page: filter.page,
        pageSize: GUILDS_PAGE_SIZE,
        include: EIncludeFlags.RankedMaps | EIncludeFlags.Members,
        search: intermediateSearch,
        filters: filter,
      }),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      {guilds && (
        <div className="flex h-full gap-2">
          <List
            totalCount={guilds.totalCount}
            pageSize={GUILDS_PAGE_SIZE}
            hasPreviousPage={guilds.hasPreviousPage}
            hasNextPage={guilds.hasNextPage}
            currentPage={filter.page}
            setCurrentPage={(page) => setFilter({ page })}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <ListBox
                options={GUILDS_FILTER_SORT_BY_VALUES}
                value={filter["sort-by"]}
                onChange={(option) => setFilter({ "sort-by": option.value })}
              />

              <ListBoxMultiple
                label="Guild Type"
                options={GUILDS_FILTER_GUILD_TYPES}
                values={filter.guildTypes.split(",")}
                onChange={(option) =>
                  setFilter({
                    guildTypes: option
                      .reduce(
                        (
                          acc: string[],
                          opt: { value: string; label: string },
                        ) => [...acc, opt.value],
                        [],
                      )
                      .join(","),
                  })
                }
              />

              <SearchBar
                className="ml-auto w-full sm:w-auto"
                onChange={(e) => updateSearch(e.target.value)}
              />
            </div>

            {guilds?.data.map((guild, key) => (
              <GuildCard
                key={key}
                guildData={guild}
                guildState={
                  session?.memberList?.find((g) => guild.id === g.guildID)
                    ?.state
                }
                onJoin={() => tryJoin(guild.id)}
              />
            ))}
          </List>
        </div>
      )}
    </>
  );
}
