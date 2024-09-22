import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import ListBoxMultiple from "@/components/ListBox/ListBoxMultiple";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import GuildCard from "@/features/guild/components/GuildCard";
import { useGuilds } from "@/features/guild/hooks/useGuilds";
import useJoinGuild from "@/features/guild/hooks/useJoinGuild";
import {
  GUILDS_FILTER_GUILD_TYPES,
  GUILDS_FILTER_SORT_BY_VALUES,
  GUILDS_PAGE_SIZE,
} from "@/features/guild/utils/constants";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-hot-toast";
import { useSearchParamsState } from "react-use-search-params-state";
import { useDebounceValue } from "usehooks-ts";

const Guilds = () => {
  const [filters, setFilters] = useSearchParamsState({
    page: { type: "number", default: 1 },
    "sort-by": { type: "string", default: "Popularity" },
    "order-by": { type: "string", default: "Desc" },
    guildTypes: { type: "string", default: "0,1,2,4" },
  });

  const [search, setSearch] = useDebounceValue("", 500);
  const { session } = useAuthContext();

  const updateSearch = (term: string) => {
    setSearch(term);
    setFilters({ page: 1 });
  };

  const { mutate: joinGuild } = useJoinGuild(["guilds", filters]);
  const tryJoin = async (guildID: number) => {
    if (!session?.token) {
      toast.error("You need to be logged in to join");
      return;
    }

    joinGuild(guildID, filters);
  };

  const {
    data: guilds,
    isLoading,
    isFetching,
    isError,
  } = useGuilds(filters, search);

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
            currentPage={filters.page}
            setCurrentPage={(page) => setFilters({ page })}
            isLoading={isFetching}
          >
            <div className="flex flex-wrap gap-2">
              <ListBox
                options={GUILDS_FILTER_SORT_BY_VALUES}
                value={filters["sort-by"]}
                onChange={(option) => setFilters({ "sort-by": option.value })}
              />

              <ListBoxMultiple
                label="Guild Type"
                options={GUILDS_FILTER_GUILD_TYPES}
                values={filters.guildTypes.split(",")}
                onChange={(option) =>
                  setFilters({
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
                guild={guild}
                onJoin={() => tryJoin(guild.id)}
              />
            ))}
          </List>
        </div>
      )}
    </>
  );
};

export default Guilds;
