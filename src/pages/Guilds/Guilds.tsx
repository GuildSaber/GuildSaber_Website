import Card from "../../components/Guilds/GuildsCard";
import { useState } from "react";
import List from "../../components/List/List";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Loader from "../../components/Common/Loader/Loader";
import Collapse from "../../components/Common/Collapse/Collapse";
import SearchBar from "../../components/Common/Search/SearchBar";
import { GuildsAPIResponse, GuildsAPIResponseSchema } from "../../types/api";

const PAGE_SIZE = 2;

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
  "sort-By": string;
  order: "Asc" | "Desc";
};

export default function Guilds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<FilterType>({
    guildTypes: ["0", "1", "2", "4"],
    "sort-By": "Popularity",
    order: "Desc",
  });

  const getGuilds = async (page = 1, filter: FilterType) => {
    const parsefilter = {
      ...filter,
      guildTypes: filter.guildTypes.reduce((acc, v) => acc + +v, 0).toString(),
    };
    const URLParams = new URLSearchParams(parsefilter).toString();
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/guilds?page=${page}&pageSize=${PAGE_SIZE}&${URLParams}`,
    );
    const payLoad = await res.json();
    const validationResponse = GuildsAPIResponseSchema.safeParse(payLoad);
    if (!validationResponse.success) {
      console.error(validationResponse.error);
      return payLoad as GuildsAPIResponse;
    } else {
      return validationResponse.data as GuildsAPIResponse;
    }
  };

  const {
    data: guilds,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guilds", currentPage, filter],
    queryFn: () => getGuilds(currentPage, filter),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
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
        <div className="container flex h-full flex-col gap-2">
          <List
            totalCount={guilds.totalCount}
            pageSize={PAGE_SIZE}
            hasPreviousPage={guilds.hasPreviousPage}
            hasNextPage={guilds.hasNextPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            <div className="flex gap-2">
              <Collapse
                defaultvalue={FILTER_SORT_BY_VALUES[0].value}
                options={FILTER_SORT_BY_VALUES}
                selectedOptions={[filter["sort-By"]]}
                multiple={false}
                setSelectedOptions={(value) =>
                  setFilter({ ...filter, "sort-By": value[0] })
                }
              />
              <Collapse
                label="Guild Type"
                multiple={true}
                defaultvalue={FILTER_GUILD_TYPES[0].value}
                options={FILTER_GUILD_TYPES}
                selectedOptions={filter.guildTypes}
                setSelectedOptions={(value) =>
                  setFilter({ ...filter, guildTypes: value })
                }
              />
              <SearchBar className="ml-auto" />
            </div>

            {guilds?.data.map((guild, key) => (
              <Card key={key} guildData={guild} />
            ))}
          </List>
        </div>
      )}
    </>
  );
}
