import ArcViewer from "@/components/ArcViewer";
import List from "@/components/List";
import Loader from "@/components/Loader";
import MultiRangeSlider from "@/components/MultiRangeSlider/MultiRangeSlider";
import SearchBar from "@/components/SearchBar";
import useArcViewer from "@/hooks/useArcViewer";
import {
  faCheck,
  faCircleExclamation,
  faCubes,
  faDrum,
  faHourglassStart,
  faLayerGroup,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Key, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Button from "@/components/Button";
import ListBox from "@/components/ListBox/ListBox";
import { EPassState } from "@/enums/api/models/passState";
import GuildHeader from "@/features/guild/components/GuildHeader";
import { useGuild } from "@/features/guild/hooks/useGuild";
import {
  GUILD_FILTER_PASS_STATE,
  GUILD_FILTER_SORT_BY_VALUES,
} from "@/features/guild/utils/constants";
import MapPassState from "@/features/map/components/Listbox/MapPassState";
import MapHeader from "@/features/map/components/MapHeader";
import { useMapsGuild } from "@/features/map/hooks/useMapsGuild";
import { MAP_PAGE_SIZE } from "@/features/map/utils/constants";
import { useAuthContext } from "@/hooks/useAuthContext";
import { formatAccuracy } from "@/utils/format";
import { useSearchParamsState } from "react-use-search-params-state";

type Categories = {
  anyMatch: boolean;
  selected: { name: string; id: number }[];
};

export default function Guild() {
  const { guildID } = useParams();
  if (!guildID) {
    return <p>Error</p>;
  }

  const { session } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [intermediateSearch, setIntermediateSearch] = useState("");

  const [categories, setCategories] = useState<Categories>({
    anyMatch: true,
    selected: [],
  });

  const [filter, setFilter] = useSearchParamsState({
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

  const arcViewer = useArcViewer();

  const updateSearch = (term: string) => {
    setSearch(term);
    filter({ page: 1 });
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

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
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIntermediateSearch(search);
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const { data: guild, isLoading, isError } = useGuild(guildID);

  const {
    data: maps,
    isLoading: isMapsLoading,
    isError: isMapsError,
  } = useMapsGuild(guildID, filter, intermediateSearch, categories);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || guild == null) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="text-h1" />
        <h3 className="text-h3">Guild not found</h3>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <GuildHeader guildData={guild} />

      <div className="flex flex-col items-center md:mb-2 md:block">
        <h3 className="my-4 flex items-center gap-3 text-center text-h6 font-bold md:text-left md:text-h4">
          <FontAwesomeIcon icon={faCubes} className="h-5" />
          Categories
        </h3>

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

        <div className="flex flex-col gap-2 sm:flex-row">
          <ListBox
            options={GUILD_FILTER_SORT_BY_VALUES}
            value={filter["sort-by"]}
            onChange={(sortBy) => setFilter({ "sort-by": sortBy.value })}
          />

          <div className="flex justify-center gap-2 sm:contents">
            <MultiRangeSlider
              min={guild.filters.minDifficulty}
              max={guild.filters.maxDifficulty}
              icon={faStar}
              color="#FFA41C"
              onChange={({ min, max }) => {
                setFilter({
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
                setFilter({
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
                setFilter({
                  "bpm-from": min,
                  "bpm-to": max,
                });
              }}
            />

            {session && (
              <MapPassState
                value={filter["passState"]}
                onChange={(passState) =>
                  setFilter({ passState: passState.value })
                }
              />
            )}
          </div>
          <SearchBar
            className="ml-auto w-full sm:w-auto"
            onChange={(e) => updateSearch(e.target.value)}
          />
        </div>
        {maps && !isMapsLoading && !isMapsError && (
          <List
            totalCount={maps.totalCount}
            pageSize={MAP_PAGE_SIZE}
            hasPreviousPage={maps.hasPreviousPage}
            hasNextPage={maps.hasNextPage}
            currentPage={filter.page}
            setCurrentPage={(page) => setFilter({ page })}
            className="flex flex-col gap-4"
          >
            {maps?.data?.map((map, key: Key) => (
              <div key={key}>
                <MapHeader
                  mapData={map}
                  arcViewer={arcViewer.open}
                  className={clsx({ " rounded-b-none": map.rankedScore })}
                />

                {map.rankedScore && (
                  <div
                    className="flex items-center gap-2 rounded-b-md px-2 py-1"
                    style={{
                      backgroundColor: GUILD_FILTER_PASS_STATE.find(
                        (passState) =>
                          (passState.value & map.rankedScore!.state) !== 0 &&
                          passState.value !== EPassState.All,
                      )!.color,
                    }}
                  >
                    <p className="text-btn">
                      <span className="font-semibold">
                        #{map.rankedScore.rank}
                      </span>
                      {" | "}
                      {formatAccuracy(
                        map.rankedScore.score?.baseScore,
                        map.rankedMap.rankedMapVersions[0]?.songDifficulty
                          ?.songDifficultyStats?.maxScore || 0,
                      )}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </List>
        )}
      </div>
      <ArcViewer settings={arcViewer} />
    </div>
  );
}
