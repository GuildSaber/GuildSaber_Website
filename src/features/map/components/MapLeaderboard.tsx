import Button from "@/components/Button";
import List from "@/components/List";
import Loader from "@/components/Loader";
import { RankedMapResponse } from "@/types/api/responses/rankedMapApiStruct";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";
import { useSearchParamsState } from "react-use-search-params-state";
import { useMapLeaderboard } from "../hooks/useMapLeaderboard";
import { MAP_PAGE_SIZE } from "../utils/constants";
import MapLeaderboardRow from "./MapLeaderboardRow";

type MapLeaderboardProps = {
  mapData: RankedMapResponse;
  pageSize?: number;
};

export default function MapLeaderboard({
  mapData,
  pageSize = MAP_PAGE_SIZE,
}: MapLeaderboardProps) {
  const [filters, setFilters] = useSearchParamsState({
    page: { type: "number", default: 1 },
    point: { type: "number", default: mapData.simplePoints[0].id },
  });
  const [pageSense, setPageSense] = useState("next");

  const { page, point } = filters;
  const { rankedMap: map, simplePoints: points } = mapData;

  const changePoint = (point: number) => () => setFilters({ point, page: 1 });

  const {
    data: leaderboard,
    isLoading,
    isFetching,
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
      setCurrentPage={(page, sense) => {
        setFilters({ page });
        setPageSense(sense);
      }}
      isLoading={isFetching}
    >
      <div className="overflow-hidden rounded bg-gray-800 p-4 lg:p-8">
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

        <div className="overflow-x-auto px-3">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-btn">
                <th></th>
                <th></th>
                <th></th>
                <th>
                  {points && points.find((p) => p.id === filters.point)?.name}
                </th>
                <th>Modifiers</th>
                <th>Headset</th>
                <th>Pause</th>
                <th>Accuracy</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-700 text-center font-medium">
              {leaderboard?.data.map(({ player, rankedScore }, key) => (
                <MapLeaderboardRow
                  map={map}
                  player={player}
                  rankedScore={rankedScore}
                  pageSense={pageSense}
                  animKey={key}
                  key={player.userID}
                />
              ))}
            </tbody>
          </table>
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
      </div>
    </List>
  );
}
