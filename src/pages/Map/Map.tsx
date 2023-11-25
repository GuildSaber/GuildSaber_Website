import { useParams } from "react-router-dom";
import MapHeader from "../../components/Map/MapHeader";
import MapRequirements from "../../components/Map/MapRequirements";
import List from "../../components/List/List";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapAPIResponseSchema } from "../../types/api";
import Loader from "../../components/Common/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const PAGE_SIZE = 10;
const API_DATA_INCLUDES = [
  "RankedSongDifficulties",
  "SongDifficulties",
  "Songs",
  "GameModes",
  "SongDifficultyStats",
];

export default function Map() {
  const { mapID } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const getMap = async () =>
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/ranked-map/by-id/${mapID}?include=${API_DATA_INCLUDES.toString()}`,
    )
      .then((res) => res.json())
      .then(MapAPIResponseSchema.parse);

  const {
    data: map,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["maps", mapID],
    queryFn: () => getMap(),
    staleTime: 60_000,
    enabled: !!mapID,
    retry: 0,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || map == null) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 text-h1" />
        <h3 className="text-h3">Map not found</h3>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <>
        <MapHeader mapData={map} />

        <MapRequirements />
        <div className="flex w-full rounded bg-gray-800 p-8">
          <List
            totalCount={20}
            pageSize={PAGE_SIZE}
            hasPreviousPage={false}
            hasNextPage={true}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            <div className="flex gap-2">
              <button className="badge">CPP</button>
              <button className="badge">CPA</button>
            </div>

            <div className="grid w-full gap-1 font-medium">
              <div className="grid w-full grid-cols-[3fr_10fr_repeat(2,_4fr)] gap-2 px-1 py-2 text-btn md:grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)]">
                <p>Rank</p>
                <p></p>
                <p>Pass Points</p>
                <p className="hidden md:block">Modifiers</p>
                <p className="hidden md:block">Headset</p>
                <p className="hidden md:block">Pause</p>
                <p>Accuracy</p>
                <p className="hidden md:block">Score</p>
              </div>

              <div className="mb-1 grid w-full cursor-pointer grid-cols-[3fr_10fr_repeat(2,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn outline outline-1 outline-secondary transition-colors hover:bg-gray-900 md:grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)]">
                <div className="flex gap-2">
                  <p>#4235</p>
                </div>

                <div className="inline-flex items-center gap-2 overflow-hidden">
                  <img
                    className="rounded-full"
                    src="https://avatars.akamai.steamstatic.com/641bb318819718248bb4570d4300949935052ccc_full.jpg"
                    height={28}
                    width={28}
                  />
                  <p className="truncate text-[0.80rem]">Player1</p>
                  <p className="inline-block rounded bg-muted px-2 align-middle text-[0.80rem]">
                    25
                  </p>
                </div>

                <p className="text-secondary">12500 CPP</p>
                <p className="hidden md:block">FS</p>
                <p className="hidden md:block">Rift S</p>
                <p className="hidden md:block">5s</p>
                <p>79.86%</p>
                <p className="hidden md:block">12 312 312</p>
              </div>

              <div className="grid w-full cursor-pointer grid-cols-[3fr_10fr_repeat(2,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn transition-colors hover:bg-gray-900 md:grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)]">
                <p>#1</p>
                <div className="inline-flex items-center gap-2 overflow-hidden">
                  <img
                    className="rounded-full"
                    src="https://avatars.akamai.steamstatic.com/641bb318819718248bb4570d4300949935052ccc_full.jpg"
                    height={28}
                    width={28}
                  />
                  <p className="truncate text-[0.80rem]">Player1</p>
                  <p className="inline-block rounded bg-muted px-2 align-middle text-[0.80rem]">
                    25
                  </p>
                </div>
                <p className="text-secondary">12500 CPP</p>
                <p className="hidden md:block">FS</p>
                <p className="hidden md:block">Rift S</p>
                <p className="hidden md:block">5s</p>
                <p>79.86%</p>
                <p className="hidden md:block">12 312 312</p>
              </div>
            </div>
          </List>
        </div>
      </>
    </div>
  );
}
