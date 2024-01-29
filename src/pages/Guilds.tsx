import { useSearchParams } from "react-router-dom";
import GuildCard from "@/components/Guild/GuildCard";
import { useEffect, useState } from "react";
import List from "@/components/Common/List";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Common/Loader";
import Collapse from "@/components/Common/Collapse/Collapse";
import SearchBar from "@/components/Common/SearchBar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-hot-toast";
import { EJoinState } from "@/enums/guild";
import { EIncludeFlags } from "@/enums/api";
import {
  GUILDS_FILTER_GUILD_TYPES,
  GUILDS_FILTER_SORT_BY_VALUES,
  GUILDS_PAGE_SIZE,
} from "@/constants";
import { getGuilds } from "@/api/fetch/guilds";

type FilterType = {
  guildTypes: string[];
  "sort-by": string;
  "order-by": "Asc" | "Desc";
};

export default function Guilds() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [intermediateSearch, setIntermediateSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>({
    guildTypes: ["0", "1", "2", "4"],
    "sort-by": "Popularity",
    "order-by": "Desc",
  });

  const { session, dispatch } = useAuthContext();

  const queryClient = useQueryClient();

  const updateSearch = (term: string) => {
    setSearch(term);
    setCurrentPage(1);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
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
        queryKey: ["guilds", currentPage, filter],
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
    queryKey: ["guilds", currentPage, filter, intermediateSearch],
    queryFn: () =>
      getGuilds({
        page: currentPage,
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
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Collapse
                defaultvalue={GUILDS_FILTER_SORT_BY_VALUES[0].value}
                className="w-full sm:w-auto"
                options={GUILDS_FILTER_SORT_BY_VALUES}
                selectedOptions={[filter["sort-by"]]}
                multiple={false}
                setSelectedOptions={(value) =>
                  setFilter({ ...filter, "sort-by": value[0] })
                }
              />
              <Collapse
                label="Guild Type"
                className="w-full sm:w-auto"
                multiple={true}
                defaultvalue={GUILDS_FILTER_GUILD_TYPES[0].value}
                options={GUILDS_FILTER_GUILD_TYPES}
                selectedOptions={filter.guildTypes}
                setSelectedOptions={(value) =>
                  setFilter({ ...filter, guildTypes: value })
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
