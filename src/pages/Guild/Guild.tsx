import { Navigate, useParams, useSearchParams } from "react-router-dom";
import GuildHeader from "../../components/Guild/GuildHeader";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Common/Loader/Loader";
import Collapse from "../../components/Common/Collapse/Collapse";
import {
  GuildAPIResponseSchema,
  GuildMapsAPIResponseSchema,
} from "../../types/api/guild";
import MapHeader from "../../components/Map/MapHeader";
import SearchBar from "../../components/Common/Search/SearchBar";
import { Key, useEffect, useState } from "react";
import List from "../../components/List/List";
import { EIncludeFlags } from "../../enums/api";
import { useAuthContext } from "../../hooks/useAuthContext";
import ArcViewer from "../../components/Common/ArcViewer/ArcViewer";

const FILTER_SORT_BY_VALUES = [
  { value: "Difficulty", label: "Difficulty" },
  { value: "Time", label: "RankTime" },
  { value: "EditTime", label: "EditTime" },
  { value: "Accuracy", label: "MinAccuracy" },
];

type FilterType = {
  "sort-by": string;
  "order-by": "Asc" | "Desc";
};

const PAGE_SIZE = 3;
const API_MAPS_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficultyStats |
  EIncludeFlags.RankedScores;

export default function Guild() {
  const { guildID } = useParams();
  if (!guildID) {
    return <p>Error</p>;
  }

  const { session } = useAuthContext();

  if (session?.selectedGuild !== guildID) {
    return <Navigate to={`/guild/${session?.selectedGuild}`} />;
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [intermediateSearch, setIntermediateSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") as string) || 1,
  );
  const [filter, setFilter] = useState<FilterType>({
    "sort-by": "Difficulty",
    "order-by": "Asc",
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIntermediateSearch(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const getGuild = async (guildID: string) =>
    fetch(`${import.meta.env.VITE_API_BASE_URL}/guild/by-id/${guildID}`)
      .then((res) => res.json())
      .then(GuildAPIResponseSchema.parse);

  const getMaps = async (
    guildID: string,
    currentPage: number,
    filter: FilterType,
    search: string,
  ) => {
    /* Still doing this for when adding more params */
    const parsefilter = {
      ...filter,
    };
    const URLParams = new URLSearchParams(parsefilter).toString();

    return fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/ranked-maps/${guildID}?page=${currentPage}&pageSize=${PAGE_SIZE}&include=${API_MAPS_DATA_INCLUDES}&${URLParams}${
        search && "&search=" + search
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      },
    )
      .then((res) => res.json())
      .then(GuildMapsAPIResponseSchema.parse);
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
    ],
    queryFn: () => getMaps(guildID, currentPage, filter, intermediateSearch),
    enabled: !!guildID,
    retry: 2,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || guild == null) {
    return <p>Error</p>;
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <GuildHeader guildData={guild} />

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
          >
            {maps?.data.map(
              (
                value: {
                  rankedMap: {
                    id: number;
                    guildID: number;
                    rankingState: number;
                    requirements: {
                      doesNeedConfirmation: boolean;
                      doesNeedFullCombo: boolean;
                      maxPauseDuration: number;
                      prohibitedModifiers: number;
                      mandatoryModifiers: number;
                      minAccuracy: number;
                    };
                    rating: {
                      customModifiersRating: number;
                      default: { stars: { difficulty: number; acc: number } };
                      modifiers: null;
                    };
                    unixCreationTime: number;
                    unixEditTime: number;
                    rankedMapVersions: {
                      version: number;
                      songDifficulty: {
                        id: number;
                        difficulty: number;
                        gameMode: { id: number; name: string };
                        song: {
                          id: number;
                          name: string;
                          hash: string;
                          beatSaverKey: string;
                          songName: string;
                          songSubName: string;
                          songAuthorName: string;
                          mapperName: string;
                          isAutoMapped: boolean;
                          bpm: number;
                          duration: number;
                          unixUploadedTime: number;
                          coverURL: string;
                        };
                        blid: string;
                        songDifficultyStats: {
                          id: number;
                          duration: number;
                          maxScore: number;
                          noteJumpSpeed: number;
                          noteCount: number;
                          bombCount: number;
                          obstacleCount: number;
                          notesPerSecond: number;
                        };
                      };
                    }[];
                  };
                },
                key: Key | null | undefined,
              ) => (
                <MapHeader
                  key={key}
                  mapData={value.rankedMap}
                  setArcViewer={setArcViewer}
                />
              ),
            )}
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
