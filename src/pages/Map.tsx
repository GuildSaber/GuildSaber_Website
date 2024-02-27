import ArcViewer from "@/components/Common/ArcViewer";
import Button from "@/components/Common/Button";
import List from "@/components/Common/List";
import Loader from "@/components/Common/Loader";
import MapHeader from "@/components/Map/MapHeader";
import MapRequirements from "@/components/Map/MapRequirements";
import {
  MAP_API_DATA_INCLUDES,
  MAP_API_LEADERBOARD_DATA_INCLUDES,
  MAP_PAGE_SIZE,
} from "@/constants";
import useArcViewer from "@/hooks/useArcViewer";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  MapLeaderboardAPIResponse,
  MapLeaderboardAPIResponseSchema,
} from "@/types/api/map";
import { fetchAPI } from "@/utils/fetch";
import { formatAccuracy, formatHMD, formatModifiers } from "@/utils/format";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import {
  RankedMapResponse,
  RankedMapResponseSchema,
} from "@/types/api/responses/rankedMapApiStruct";

export default function Map() {
  const { mapID } = useParams();
  const { session } = useAuthContext();
  const [searchParams] = useSearchParams();

  const arcViewer = useArcViewer();

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") as string) || 1,
  );

  const [pointID, setPointID] = useState(0);

  const getMap = async () =>
    fetchAPI<RankedMapResponse>({
      path: `/ranked-map/by-id/${mapID}`,
      queryParams: {
        include: MAP_API_DATA_INCLUDES,
      },
      authenticated: true,
      schema: RankedMapResponseSchema,
    });

  const getMapLeaderboard = async (page: number) =>
    fetchAPI<MapLeaderboardAPIResponse>({
      path: `/leaderboard/ranked-map/${mapID}`,
      queryParams: {
        page: page,
        pageSize: MAP_PAGE_SIZE,
        include: MAP_API_LEADERBOARD_DATA_INCLUDES,
        pointID: pointID,
      },
      schema: MapLeaderboardAPIResponseSchema,
    });

  const {
    data: map,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["maps", mapID],
    queryFn: () => getMap(),
    enabled: !!mapID,
  });

  const { data: leaderboard } = useQuery({
    queryKey: ["leaderboard", mapID, pointID, currentPage],
    queryFn: () => getMapLeaderboard(currentPage),
    enabled: !!map && !!pointID,
  });

  useEffect(() => {
    if (!!map && map.simplePoints.length) {
      setPointID(map.simplePoints[0].id);
    }
  }, [map]);

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
        <MapHeader mapData={map} arcViewer={arcViewer.open} />

        <MapRequirements />
        <div className="flex w-full justify-center">
          {leaderboard && (
            <List
              totalCount={leaderboard.totalCount}
              pageSize={MAP_PAGE_SIZE}
              hasPreviousPage={leaderboard.hasPreviousPage}
              hasNextPage={leaderboard.hasNextPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              <div className="rounded bg-gray-800 p-4 lg:p-8">
                <div className="flex gap-2">
                  {map.simplePoints?.map((point) => (
                    <Button
                      key={point.id}
                      className={clsx("badge", {
                        "border-primary": point.id === pointID,
                      })}
                      onClick={() => setPointID(point.id)}
                    >
                      {point.name}
                    </Button>
                  ))}
                </div>

                <div className="grid w-full grid-cols-[2fr_10fr_repeat(2,_4fr)] gap-2 px-1 py-2 text-btn md:grid-cols-[2fr_10fr_6fr_repeat(5,_4fr)]">
                  <p>Rank</p>
                  <p></p>
                  <p>
                    {map.simplePoints &&
                      map.simplePoints.find((p) => p.id === pointID)?.name}
                  </p>
                  <p className="hidden md:block">Modifiers</p>
                  <p className="hidden md:block">Headset</p>
                  <p className="hidden md:block">Pause</p>
                  <p>Accuracy</p>
                  <p className="hidden md:block">Score</p>
                </div>

                {(!leaderboard.data.length || !map.simplePoints) && (
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
                      <p>{`#${(currentPage - 1) * MAP_PAGE_SIZE + key + 1}`}</p>
                      <Link to={`/player/${data.player.userID}`}>
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
                        </div>
                      </Link>
                      <p className="text-secondary">{`${data.rankedScore.rawPoints.toFixed(
                        2,
                      )}`}</p>
                      <p className="hidden md:block">
                        {formatModifiers(
                          data.rankedScore.score.modifiers,
                        ).toString()}
                      </p>
                      <p className="hidden overflow-hidden whitespace-nowrap md:block">
                        <span className="inline-flex text-ellipsis">
                          {formatHMD(data.rankedScore.score.hmd)}
                        </span>
                      </p>
                      <p className="hidden md:block">
                        {(!!data.rankedScore.score.hasTrackers
                          ? data.rankedScore.score.winTracker
                              ?.totalPauseDuration
                          : "??") + "s"}
                      </p>
                      <p>
                        {formatAccuracy(
                          data.rankedScore.score.baseScore,
                          map.rankedMap.rankedMapVersions[0]?.songDifficulty
                            ?.songDifficultyStats?.maxScore || 0,
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
              </div>
            </List>
          )}
        </div>
      </>
      <ArcViewer settings={arcViewer} />
    </div>
  );
}
