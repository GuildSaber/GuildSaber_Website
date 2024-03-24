import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import List from "@/components/List";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/hooks/useAuthContext";
import { RankedMapResponse } from "@/types/api/responses/rankedMapApiStruct";
import { formatAccuracy, formatHMD, formatModifiers } from "@/utils/format";
import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSearchParamsState } from "react-use-search-params-state";
import { useMapLeaderboard } from "../hooks/useMapLeaderboard";
import { MAP_PAGE_SIZE } from "../utils/constants";

type MapLeaderboardProps = {
  mapData: RankedMapResponse;
  pageSize?: number;
};

export default function MapLeaderboard({
  mapData,
  pageSize = MAP_PAGE_SIZE,
}: MapLeaderboardProps) {
  const { session } = useAuthContext();
  const [filters, setFilters] = useSearchParamsState({
    page: { type: "number", default: 1 },
    point: { type: "number", default: mapData.simplePoints[0].id },
  });

  const { page, point } = filters;
  const { rankedMap: map, simplePoints: points } = mapData;

  const setCurrentPage = (page: number) => setFilters({ page });

  const changePoint = (point: number) => () => setFilters({ point, page: 1 });

  const {
    data: leaderboard,
    isLoading,
    isError,
    error,
  } = useMapLeaderboard({
    mapID: map.id,
    pointID: point,
    page: page,
    enabled: map && filters,
  });

  if (isLoading) {
    <Loader />;
  }

  if (!leaderboard || isError) {
    return (
      <div className="rounded bg-gray-800 p-4 lg:p-8">
        <p>Failed to get Leaderboard</p>
        {error && <p>{JSON.stringify(error)}</p>}
      </div>
    );
  }

  return (
    <List
      totalCount={leaderboard.totalCount}
      pageSize={pageSize}
      hasPreviousPage={leaderboard.hasPreviousPage}
      hasNextPage={leaderboard.hasNextPage}
      currentPage={filters.page}
      setCurrentPage={setCurrentPage}
    >
      <div className="rounded bg-gray-800 p-4 lg:p-8">
        <div className="flex gap-2">
          {points?.map((point) => (
            <Button
              key={point.id}
              className={clsx("badge", {
                "border-primary": point.id === filters.point,
              })}
              onClick={changePoint(point.id)}
            >
              {point.name}
            </Button>
          ))}
        </div>

        <div className="grid w-full grid-cols-[2fr_10fr_repeat(2,_4fr)] gap-2 px-1 py-2 text-btn md:grid-cols-[2fr_10fr_6fr_repeat(5,_4fr)]">
          <p>Rank</p>
          <p></p>
          <p>{points && points.find((p) => p.id === filters.point)?.name}</p>
          <p className="hidden md:block">Modifiers</p>
          <p className="hidden md:block">Headset</p>
          <p className="hidden md:block">Pause</p>
          <p>Accuracy</p>
          <p className="hidden md:block">Score</p>
        </div>

        {(!leaderboard.data.length || !filters.point) && (
          <div className="w-full text-center">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="mb-4 text-h1"
            />
            <h3 className="text-h3">No scores found</h3>
          </div>
        )}

        <div className="grid w-full gap-1 font-medium">
          {leaderboard?.data.map(({ player, rankedScore }, key) => {
            const maxScore =
              map.rankedMapVersions[0]?.songDifficulty?.songDifficultyStats
                ?.maxScore || 0;

            return (
              <div
                key={key}
                className={clsx(
                  "grid w-full cursor-pointer grid-cols-[2.3fr_10fr_repeat(2,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn transition-colors hover:bg-gray-900 md:grid-cols-[2fr_10fr_6fr_repeat(5,_4fr)]",
                  {
                    "outline outline-1 outline-secondary":
                      player.userID === session?.player?.userID,
                  },
                )}
              >
                <p>{`#${(filters.page - 1) * pageSize + key + 1}`}</p>

                <Link to={`/player/${player.userID}`}>
                  <div className="inline-flex items-center gap-2 overflow-hidden">
                    <Avatar
                      src={player.user_AvatarUrl}
                      name={player.name}
                      className="h-7 rounded-full"
                    />
                    <p className="truncate text-[0.80rem]">{player.name}</p>
                  </div>
                </Link>

                <p className="text-secondary">{`${rankedScore.rawPoints.toFixed(
                  2,
                )}`}</p>
                <p className="hidden md:block">
                  {rankedScore.score?.modifiers ? (
                    formatModifiers(rankedScore.score.modifiers)
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}
                </p>

                <p
                  className="hidden overflow-hidden whitespace-nowrap md:block"
                  title={formatHMD(rankedScore.score?.hmd)}
                >
                  <span className="inline-flex text-ellipsis">
                    {formatHMD(rankedScore.score?.hmd)}
                  </span>
                </p>

                <p className="hidden md:block">
                  {(!!rankedScore.score?.hasTrackers
                    ? rankedScore.score.winTracker?.totalPauseDuration
                    : "??") + "s"}
                </p>

                <p>{formatAccuracy(rankedScore.score?.baseScore, maxScore)}</p>

                <p className="hidden md:block">
                  {new Intl.NumberFormat("en").format(
                    rankedScore.effectiveScore,
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </List>
  );
}
