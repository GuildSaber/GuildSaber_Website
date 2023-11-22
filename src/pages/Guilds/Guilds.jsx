import Card from "../../components/Guilds/GuildsCard";
import { useState } from "react";
import List from "../../components/List/List";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Loader from "../../components/Common/Loader/Loader";
import Collapse from "../../components/Common/Collapse/Collapse";
import SearchBar from "../../components/Common/Search/SearchBar";

const PAGE_SIZE = 2;

const FILTER_GUILD_TYPES = [
  { value: 1, label: "Unverified" },
  { value: 2, label: "Verified" },
  { value: 4, label: "Featured" },
  { value: 8, label: "Private" },
];

const FILTER_SORT_BY_VALUES = [
  { value: "Popularity", label: "Popularity" },
  { value: "Name", label: "Name" },
  { value: "CreationDate", label: "Creation Date" },
  { value: "MapCount", label: "Map Count" },
  { value: "MemberCount", label: "Member Count" },
];

export default function Guilds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    guildTypes: [0, 1, 2, 4],
    "sort-By": "Popularity",
    order: "Desc",
  });

  const getGuilds = (page = 1, filter) => {
    const parsefilter = {
      ...filter,
      guildTypes: filter.guildTypes.reduce((acc, v) => acc + v, 0),
    };
    const URLParams = new URLSearchParams(parsefilter).toString();
    return fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/guilds?page=${page}&pageSize=${PAGE_SIZE}&${URLParams}`,
    ).then((res) => res.json());
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
    <div className="container flex flex-col h-full gap-2">
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
            defaultvalue={FILTER_SORT_BY_VALUES[0].label}
            options={FILTER_SORT_BY_VALUES}
            selectedOptions={filter["sort-By"]}
            setSelectedOptions={(value) =>
              setFilter({ ...filter, "sort-By": value })
            }
          />
          <Collapse
            label="Guild Type"
            multiple
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
  );
}
