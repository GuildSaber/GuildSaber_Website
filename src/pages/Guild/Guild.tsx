import { useParams, useSearchParams } from "react-router-dom";
import GuildHeader from "@/components/Guild/GuildHeader";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Common/Loader/Loader";
import Collapse from "@/components/Common/Collapse/Collapse";
import {
  GuildAPIResponse,
  GuildAPIResponseSchema,
  GuildMapAPIResponse,
  GuildMapsAPIResponseSchema,
} from "@/types/api/guild";
import MapHeader from "@/components/Map/MapHeader";
import SearchBar from "@/components/Common/Search/SearchBar";
import { Key, useEffect, useState } from "react";
import List from "@/components/Common/List/List";
import { EIncludeFlags } from "@/enums/api";
import ArcViewer from "@/components/Common/ArcViewer/ArcViewer";
import MultiRangeSlider from "@/components/Common/MultiRangeSlider/MultiRangeSlider";
import {
  faCheck,
  faCircleExclamation,
  faDrum,
  faHourglassStart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { fetchAPI } from "@/utils/fetch";

const FILTER_SORT_BY_VALUES = [
  { value: "Difficulty", label: "Difficulty" },
  { value: "Time", label: "RankTime" },
  { value: "EditTime", label: "EditTime" },
  { value: "Accuracy", label: "MinAccuracy" },
];
const PAGE_SIZE = 8;

const API_GUILD_DATA_INCLUDES =
  EIncludeFlags.Categories | EIncludeFlags.Members | EIncludeFlags.RankedMaps;

const API_MAPS_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficultyStats |
  EIncludeFlags.RankedScores;

type FilterType = {
  "sort-by": string;
  "order-by": "Asc" | "Desc";
  "difficulty-from": number;
  "difficulty-to": number;
  "duration-from": number;
  "duration-to": number;
  "bpm-from": number;
  "bpm-to": number;
};

type Categories = {
  anyMatch: boolean;
  selected: { name: string; id: number }[];
};

export default function Guild() {
  const { guildID } = useParams();
  if (!guildID) {
    return <p>Error</p>;
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [intermediateSearch, setIntermediateSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") as string) || 1,
  );

  const [categories, setCategories] = useState<Categories>({
    anyMatch: false,
    selected: [],
  });

  const [filter, setFilter] = useState<FilterType>({
    "sort-by": "Difficulty",
    "order-by": "Asc",
    "difficulty-from": 0,
    "difficulty-to": 0,
    "duration-from": 0,
    "duration-to": 0,
    "bpm-from": 0,
    "bpm-to": 0,
  });

  const [arcViewer, setArcViewer] = useState({
    isOpen: false,
    bsrCode: "",
    difficulty: 0,
    mode: "",
  });

  const updateSearch = (term: string) => {
    setSearch(term);
    setCurrentPage(1);
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

  const getGuild = async (guildID: string) =>
    fetchAPI<GuildAPIResponse>({
      path: `/guild/by-id/${guildID}`,
      queryParams: {
        include: API_GUILD_DATA_INCLUDES,
      },
      schema: GuildAPIResponseSchema,
    });

  const getMaps = async (
    guildID: string,
    currentPage: number,
    filter: FilterType,
    search: string,
  ) => {
    /* Still doing this for when adding more params */
    const parsefilter = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v != 0),
    );

    let parseCategories = categories.selected.map((categories) => {
      return `category-ids=${categories.id}`;
    });

    return fetchAPI<GuildMapAPIResponse>({
      path: `/ranked-maps/${guildID}`,
      queryParams: {
        page: currentPage,
        pageSize: PAGE_SIZE,
        include: API_MAPS_DATA_INCLUDES,
        ...(search && { search: search }),
        ...parsefilter,
        anyMatch: categories.anyMatch,
      },
      rawQueryParams: parseCategories.join("&"),
      authenticated: true,
      schema: GuildMapsAPIResponseSchema,
    });
  };

  const {
    data: guild,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guilds", guildID],
    queryFn: () => getGuild(guildID),
    retry: 2,
  });

  const {
    data: maps,
    isLoading: isMapsLoading,
    isError: isMapsError,
  } = useQuery({
    queryKey: [
      "guilds",
      guildID,
      "maps",
      currentPage,
      filter,
      intermediateSearch,
      categories,
    ],
    queryFn: () => getMaps(guildID, currentPage, filter, intermediateSearch),
    enabled: !!guildID,
    retry: 2,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || guild == null) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 text-h1" />
        <h3 className="text-h3">Guild not found</h3>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <GuildHeader guildData={guild} />

      <div className="flow-content-2 md:flow-content-4">
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <h3 className="text-center text-h4 font-bold md:text-left">
            Categories
          </h3>
        </div>

        <div className="mb-8 flex w-full flex-wrap items-center justify-center gap-3 overflow-hidden rounded bg-gray-800 p-8 md:justify-start">
          {guild.categories?.map((category) => (
            <button
              key={category.id}
              className={`btn md:text-h6 ${
                categories.selected.find((cat) => cat.id === category.id)
                  ? "btn-primary"
                  : "btn-tritary"
              }`}
              onClick={() => updateCategories(category)}
            >
              {category.name}
            </button>
          ))}

          <div className="flex items-center gap-2">
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
        <h3 className="text-center text-h4 font-bold md:text-left">
          Ranked Maps
        </h3>

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
          <div className="flex justify-center gap-2 sm:contents">
            <MultiRangeSlider
              min={guild.filters.minDifficulty}
              max={guild.filters.maxDifficulty}
              icon={faStar}
              color="#FFA41C"
              onChange={({ min, max }) => {
                setFilter({
                  ...filter,
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
                  ...filter,
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
                  ...filter,
                  "bpm-from": min,
                  "bpm-to": max,
                });
              }}
            />
          </div>
          <SearchBar
            className="ml-auto w-full sm:w-auto"
            onChange={(e) => updateSearch(e.target.value)}
          />
        </div>
        {maps && !isMapsLoading && !isMapsError && (
          <List
            totalCount={maps.totalCount}
            pageSize={PAGE_SIZE}
            hasPreviousPage={maps.hasPreviousPage}
            hasNextPage={maps.hasNextPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            className="flex flex-col gap-4"
          >
            {maps?.data.map((value, key: Key) => (
              <MapHeader
                key={key}
                mapData={value}
                setArcViewer={setArcViewer}
              />
            ))}
          </List>
        )}
      </div>
      {arcViewer.isOpen && (
        <ArcViewer
          bsrCode={arcViewer.bsrCode}
          difficulty={arcViewer.difficulty}
          mode={arcViewer.mode}
          onClose={() => setArcViewer({ ...arcViewer, isOpen: false })}
        />
      )}
    </div>
  );
}
