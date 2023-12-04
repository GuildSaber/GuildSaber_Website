import { useParams, useSearchParams } from "react-router-dom";
import GuildHeader from "../../components/Guild/GuildHeader";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Loader from "../../components/Common/Loader/Loader";
import {
  GuildAPIResponseSchema,
  GuildMapsAPIResponseSchema,
} from "../../types/api/guild";
import MapHeader from "../../components/Map/MapHeader";
import { useState } from "react";
import List from "../../components/List/List";
import { EIncludeFlags } from "../../enums/api";

const PAGE_SIZE = 2;
const API_MAPS_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficultyStats;

export default function Guild() {
  const { guildID } = useParams();
  if (!guildID) {
    return <p>Error</p>;
  }
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") as string) || 1,
  );

  const getGuild = async (guildID: string) =>
    fetch(`${import.meta.env.VITE_API_BASE_URL}/guild/by-id/${guildID}`)
      .then((res) => res.json())
      .then(GuildAPIResponseSchema.parse);

  const getMaps = async (guildID: string, currentPage: number) =>
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/ranked-maps/${guildID}?sort-by=Time&page=${currentPage}&pageSize=${PAGE_SIZE}&include=${API_MAPS_DATA_INCLUDES}`,
    )
      .then((res) => res.json())
      .then(GuildMapsAPIResponseSchema.parse);

  const {
    data: guild,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guilds", guildID],
    queryFn: () => getGuild(guildID),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
    retry: 2,
  });

  const {
    data: maps,
    isLoading: isMapsLoading,
    isError: isMapsError,
  } = useQuery({
    queryKey: ["guilds", guildID, "maps", currentPage],
    queryFn: () => getMaps(guildID, currentPage),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
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
          New Ranked Maps
        </h3>
        {maps && !isMapsLoading && !isMapsError && (
          <List
            totalCount={maps.totalCount}
            pageSize={PAGE_SIZE}
            hasPreviousPage={maps.hasPreviousPage}
            hasNextPage={maps.hasNextPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            {maps?.data.map((map) => <MapHeader mapData={map} />)}
          </List>
        )}
      </div>
    </div>
  );
}
