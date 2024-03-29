import { useSearchParams } from "react-router-dom";
import Card from "@/components/Guilds/GuildsCard";
import { useEffect, useState } from "react";
import List from "@/components/Common/List/List";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Common/Loader/Loader";
import Collapse from "@/components/Common/Collapse/Collapse";
import SearchBar from "@/components/Common/Search/SearchBar";
import {
  GuildsAPIResponse,
  GuildsAPIResponseSchema,
} from "../../types/api/guild";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-hot-toast";
import { EJoinState } from "@/enums/guild";
import { fetchAPI } from "@/utils/fetch";
import { EIncludeFlags } from "@/enums/api";

const PAGE_SIZE = 4;

const FILTER_GUILD_TYPES = [
  { value: "1", label: "Unverified" },
  { value: "2", label: "Verified" },
  { value: "4", label: "Featured" },
  { value: "8", label: "Private" },
];

const FILTER_SORT_BY_VALUES = [
  { value: "Popularity", label: "Popularity" },
  { value: "Name", label: "Name" },
  { value: "CreationDate", label: "Creation Date" },
  { value: "MapCount", label: "Map Count" },
  { value: "MemberCount", label: "Member Count" },
];

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

  const getGuilds = async (page = 1, filter: FilterType, search: string) => {
    const parsefilter = {
      ...filter,
      guildTypes: filter.guildTypes.reduce((acc, v) => acc + +v, 0).toString(),
    };

    const res = await fetchAPI<GuildsAPIResponse>({
      path: "/guilds",
      queryParams: {
        page: page,
        pageSize: PAGE_SIZE,
        ...parsefilter,
        ...(search && { search: search }),
        include: EIncludeFlags.RankedMaps | EIncludeFlags.Members,
      },
      schema: GuildsAPIResponseSchema,
    });

    return res;
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
    queryFn: () => getGuilds(currentPage, filter, intermediateSearch),
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
            pageSize={PAGE_SIZE}
            hasPreviousPage={guilds.hasPreviousPage}
            hasNextPage={guilds.hasNextPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Collapse
                defaultvalue={FILTER_SORT_BY_VALUES[0].value}
                className="w-full sm:w-auto"
                options={FILTER_SORT_BY_VALUES}
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
                defaultvalue={FILTER_GUILD_TYPES[0].value}
                options={FILTER_GUILD_TYPES}
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
              <Card
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
