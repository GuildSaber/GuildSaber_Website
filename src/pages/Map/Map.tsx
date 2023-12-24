import { useParams, useSearchParams } from "react-router-dom";
import MapHeader from "../../components/Map/MapHeader";
import MapRequirements from "../../components/Map/MapRequirements";
import List from "../../components/List/List";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MapAPIResponseSchema,
  MapLeaderboardAPIResponseSchema,
} from "../../types/api/map";
import Loader from "../../components/Common/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { formatAccuracy, formatHMD, formatModifiers } from "../../utils/format";
import { useAuthContext } from "../../hooks/useAuthContext";
import clsx from "clsx";
import { EIncludeFlags } from "../../enums/api";

const PAGE_SIZE = 2;

const API_MAP_DATA_INCLUDES =
  EIncludeFlags.Songs |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.SongDifficultyStats |
  EIncludeFlags.GameModes |
  EIncludeFlags.RankedMapVersions;

const API_LEADERBOARD_DATA_INCLUDES =
  EIncludeFlags.Players |
  EIncludeFlags.Users |
  EIncludeFlags.Scores |
  EIncludeFlags.WinTrackers;

export default function Map() {
  const { mapID } = useParams();
  const { session } = useAuthContext();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") as string) || 1,
  );

  const getMap = async () =>
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/ranked-map/by-id/${mapID}?include=${API_MAP_DATA_INCLUDES}`,
    )
      .then((res) => res.json())
      .then(MapAPIResponseSchema.parse);

  const getMapLeaderboard = async (page: number) =>
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/leaderboard/ranked-map/${mapID}?pointID=2&page=${page}&pageSize=${PAGE_SIZE}&include=${API_LEADERBOARD_DATA_INCLUDES}`,
    )
      .then((res) => res.json())
      .then(MapLeaderboardAPIResponseSchema.parse);

  const {
    data: map,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["maps", mapID],
    queryFn: () => getMap(),
    enabled: !!mapID,
  });

  const {
    data: leaderboard,
    isLoading: isLeaderboardLoading,
    isError: isLeaderboardError,
  } = useQuery({
    queryKey: ["leaderboard", mapID, currentPage],
    queryFn: () => getMapLeaderboard(currentPage),
    enabled: !!mapID,
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
        <div className="flex w-full rounded bg-gray-800 p-4 lg:p-8">
          {leaderboard && !isLeaderboardLoading && !isLeaderboardError && (
            <List
              totalCount={leaderboard.totalCount}
              pageSize={PAGE_SIZE}
              hasPreviousPage={leaderboard.hasPreviousPage}
              hasNextPage={leaderboard.hasNextPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              <div className="flex gap-2">
                <button className="badge" disabled>
                  CPP
                </button>
                <button className="badge">CAP</button>
              </div>

              <div className="grid w-full grid-cols-[2fr_10fr_repeat(2,_4fr)] gap-2 px-1 py-2 text-btn md:grid-cols-[2fr_10fr_6fr_repeat(5,_4fr)]">
                <p>Rank</p>
                <p></p>
                <p>CAP</p>
                <p className="hidden md:block">Modifiers</p>
                <p className="hidden md:block">Headset</p>
                <p className="hidden md:block">Pause</p>
                <p>Accuracy</p>
                <p className="hidden md:block">Score</p>
              </div>

              {!leaderboard.data.length && (
                <div className="w-full text-center">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="mb-4 text-h1"
                  />
                  <h3 className="text-h3">No scores found</h3>
                </div>
              )}

              <div className="grid w-full gap-1 font-medium">
                {leaderboard?.data.map((data, key) => (
                  <div
                    key={key}
                    className={clsx(
                      "grid w-full cursor-pointer grid-cols-[2.3fr_10fr_repeat(2,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn transition-colors hover:bg-gray-900 md:grid-cols-[2fr_10fr_6fr_repeat(5,_4fr)]",
                      {
                        "outline outline-1 outline-secondary":
                          data.player.userID === session?.player?.userID,
                      },
                    )}
                  >
                    <p>{`#${(currentPage - 1) * PAGE_SIZE + key + 1}`}</p>
                    <div className="inline-flex items-center gap-2 overflow-hidden">
                      <img
                        className="rounded-full"
                        src={data.player.user_AvatarUrl}
                        height={28}
                        width={28}
                      />
                      <p className="truncate text-[0.80rem]">
                        {data.player.name}
                      </p>
                      <p className="inline-block rounded bg-muted px-2 align-middle text-[0.80rem]">
                        25
                      </p>
                    </div>
                    <p className="text-secondary">{`${data.rankedScore.rawPoints.toFixed(
                      2,
                    )}`}</p>
                    <p className="hidden md:block">
                      {formatModifiers(data.rankedScore.score.modifiers)}
                    </p>
                    <p className="hidden overflow-hidden whitespace-nowrap md:block">
                      <span className="inline-flex text-ellipsis">
                        {formatHMD(data.rankedScore.score.hmd)}
                      </span>
                    </p>
                    <p className="hidden md:block">
                      {(!!data.rankedScore.score.hasTrackers
                        ? data.rankedScore.score.winTracker.totalPauseDuration
                        : "??") + "s"}
                    </p>
                    <p>
                      {formatAccuracy(
                        data.rankedScore.score.baseScore,
                        map.rankedMapVersions[0].songDifficulty
                          .songDifficultyStats.maxScore,
                      )}
                    </p>
                    <p className="hidden md:block">
                      {new Intl.NumberFormat("en").format(
                        data.rankedScore.effectiveScore,
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </List>
          )}
        </div>
      </>
    </div>
  );
}
