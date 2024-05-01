import ArcViewer from "@/components/ArcViewer";
import Button from "@/components/Button";
import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import MultiRangeSlider from "@/components/MultiRangeSlider/MultiRangeSlider";
import SearchBar from "@/components/SearchBar";
import MapPassState from "@/features/map/components/Listbox/MapPassState";
import MapHeader from "@/features/map/components/MapHeader";
import { MapPassStateBanner } from "@/features/map/components/MapPassStateBanner";
import { useMapsGuild } from "@/features/map/hooks/useMapsGuild";
import { MAP_PAGE_SIZE } from "@/features/map/utils/constants";
import useArcViewer from "@/hooks/useArcViewer";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Guild } from "@/types/api/models/guild";
import {
  faCheck,
  faDrum,
  faHourglassStart,
  faLayerGroup,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Key, useState } from "react";
import { useSearchParamsState } from "react-use-search-params-state";
import { useDebounceValue } from "usehooks-ts";
import { GUILD_FILTER_SORT_BY_VALUES } from "../utils/constants";

type GuildRankedMapsProps = {
  guild: Guild;
};

type Categories = {
  anyMatch: boolean;
  selected: { name: string; id: number }[];
};

export const GuildRankedMaps = ({ guild }: GuildRankedMapsProps) => {
  const { session } = useAuthContext();
  const [search, setSearch] = useDebounceValue("", 500);

  const [filters, setFilters] = useSearchParamsState({
    page: { type: "number", default: 1 },
    "sort-by": { type: "string", default: "Difficulty" },
    "order-by": { type: "string", default: "Asc" },
    "difficulty-from": { type: "number", default: 0 },
    "difficulty-to": { type: "number", default: 0 },
    "duration-from": { type: "number", default: 0 },
    "duration-to": { type: "number", default: 0 },
    "bpm-from": { type: "number", default: 0 },
    "bpm-to": { type: "number", default: 0 },
    passState: { type: "number", default: 0 },
  });

  const [categories, setCategories] = useState<Categories>({
    anyMatch: true,
    selected: [],
  });

  const arcViewer = useArcViewer();

  const updateCategories = (categorie: Categories["selected"][0]) => {
    if (categories.selected.find((cat) => cat.id === categorie.id)) {
      setCategories({
        ...categories,
        selected: categories.selected.filter((cat) => cat.id !== categorie.id),
      });
    } else {
      setCategories({
        ...categories,
        selected: [...categories.selected, categorie],
      });
    }

    setFilters({ page: 1 });
  };

  const updateFilter = (filters: { [key: string]: string | number }) => {
    setFilters({ ...filters, page: 1 });
  };

  const updateSearch = (term: string) => {
    setSearch(term);
    setFilters({ page: 1 });
  };

  const {
    data: maps,
    isLoading: isMapsLoading,
    isFetching: isMapsFetching,
    isError: isMapsError,
  } = useMapsGuild(guild.id, filters, search, categories);

  return (
    <>
      <div className="flex flex-col items-center md:mb-2 md:block">
        <div className="inline-flex w-auto flex-wrap items-center justify-center gap-3 overflow-hidden rounded bg-gray-800 p-2 md:justify-start">
          {guild.categories?.map((category) => (
            <Button
              key={category.id}
              className={`md:text-h6 ${
                categories.selected.find((cat) => cat.id === category.id)
                  ? "btn-primary"
                  : "btn-tritary"
              }`}
              onClick={() => updateCategories(category)}
            >
              {category.name}
            </Button>
          ))}

          <div className="flex items-center gap-2 px-1">
            <div
              className={clsx(
                "flex aspect-square h-6 cursor-pointer items-center justify-center rounded-sm bg-gray-900",
                {
                  "bg-primary": categories.anyMatch,
                },
              )}
              onClick={() =>
                setCategories({ ...categories, anyMatch: !categories.anyMatch })
              }
            >
              {categories.anyMatch && <FontAwesomeIcon icon={faCheck} />}
            </div>
            <p className="text-p">Any</p>
          </div>
        </div>
      </div>

      <div className="flow-content-2 md:flow-content-4">
        <h3 className="my-4 flex items-center justify-center gap-3 text-center text-h6 font-bold md:justify-start md:text-left md:text-h4">
          <FontAwesomeIcon icon={faLayerGroup} className="h-5" />
          Ranked Maps
        </h3>

        <div className="flex flex-wrap justify-center gap-2 sm:flex-row md:justify-start">
          <ListBox
            options={GUILD_FILTER_SORT_BY_VALUES}
            value={filters["sort-by"]}
            onChange={(sortBy) => updateFilter({ "sort-by": sortBy.value })}
          />

          <MultiRangeSlider
            className="flex-1"
            min={guild.filters.minDifficulty}
            max={guild.filters.maxDifficulty}
            icon={faStar}
            color="#FFA41C"
            onChange={({ min, max }) => {
              updateFilter({
                "difficulty-from": min,
                "difficulty-to": max,
              });
            }}
          />
          <MultiRangeSlider
            min={guild.filters.minDuration}
            max={guild.filters.maxDuration}
            icon={faHourglassStart}
            minutes
            onChange={({ min, max }) => {
              updateFilter({
                "duration-from": min,
                "duration-to": max,
              });
            }}
          />
          <MultiRangeSlider
            min={guild.filters.minBPM}
            max={guild.filters.maxBPM}
            icon={faDrum}
            onChange={({ min, max }) => {
              updateFilter({
                "bpm-from": min,
                "bpm-to": max,
              });
            }}
          />

          {session && (
            <MapPassState
              value={filters["passState"]}
              onChange={(passState) =>
                updateFilter({ passState: passState.value })
              }
            />
          )}
          <SearchBar
            className="ml-auto w-full lg:w-auto"
            onChange={(e) => updateSearch(e.target.value)}
          />
        </div>
        {maps && !isMapsLoading && !isMapsError && (
          <List
            totalCount={maps.totalCount}
            pageSize={MAP_PAGE_SIZE}
            hasPreviousPage={maps.hasPreviousPage}
            hasNextPage={maps.hasNextPage}
            currentPage={filters.page}
            setCurrentPage={(page) => setFilters({ page })}
            isLoading={isMapsFetching}
            className="flex flex-col gap-4"
          >
            {maps?.data?.map((map, key: Key) => {
              const maxScore =
                map.rankedMap.rankedMapVersions![0]?.songDifficulty
                  ?.songDifficultyStats?.maxScore || 0;

              return (
                <div key={key}>
                  <MapHeader
                    mapData={map}
                    arcViewer={arcViewer.open}
                    className={clsx({ "rounded-b-none": map.rankedScore })}
                  />

                  {map.rankedScore && (
                    <MapPassStateBanner
                      rankedScore={map.rankedScore}
                      maxScore={maxScore}
                    />
                  )}
                </div>
              );
            })}
          </List>
        )}
        <ArcViewer settings={arcViewer} />
      </div>
    </>
  );
};
