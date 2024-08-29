import Button from "@/components/Button";
import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import Loader from "@/components/Loader";
import { Guild } from "@/types/api/models/guild";
import {
  faCircleExclamation,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useSearchParamsState } from "react-use-search-params-state";
import { useGuildLeaderboard } from "../hooks/useGuildLeaderboard";
import {
  GUILD_LEADERBOARD_PAGE_SIZE,
  GUILD_LEADERBOARD_PAGE_SIZE_OPTIONS,
} from "../utils/constants";
import GuildLeaderboardRow from "./GuildLeaderboardRow";

export default function GuildLeaderboard({ guild }: { guild: Guild }) {
  if (!guild) {
    return;
  }

  const [filters, setFilters] = useSearchParamsState({
    page: {
      type: "number",
      default: 1,
    },
    pageSize: {
      type: "number",
      default: GUILD_LEADERBOARD_PAGE_SIZE,
    },
    point: {
      type: "number",
      default: null,
    },
    category: {
      type: "number",
      default: null,
    },
  });

  const changePoint = (point: number) => () => setFilters({ point, page: 1 });

  const {
    data: leaderboard,
    isError: isError,
    error,
    isFetching,
    isLoading: isLoading,
  } = useGuildLeaderboard({
    pointID: filters.point || guild.simplePoints![0].id,
    page: filters.page,
    pageSize: filters.pageSize,
    categoryID: filters.category || "",
    enabled: !!guild.simplePoints,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!leaderboard || isError) {
    return (
      <div className="w-full rounded bg-gray-800 p-4 lg:p-8">
        <p>Failed to get Leaderboard</p>
        {error && <p>{JSON.stringify(error)}</p>}
      </div>
    );
  }

  if (!guild.simplePoints?.length) {
    return (
      <div className="w-full text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 text-h1" />
        <h3 className="text-h3">This guild has no points</h3>
      </div>
    );
  }

  const pointID = filters.point || guild.simplePoints[0].id;

  return (
    <>
      <div className="mx-auto inline-flex w-fit flex-wrap items-center justify-center gap-3 overflow-hidden rounded bg-gray-800 p-2 md:mx-0 md:justify-start">
        {guild.categories?.map((category) => (
          <Button
            key={category.id}
            className={`md:text-h6 ${
              filters.category === category.id ? "btn-primary" : "btn-tritary"
            }`}
            onClick={() => setFilters({ category: category.id, page: 1 })}
          >
            {category.name}
          </Button>
        ))}

        <Button
          className={`md:text-h6 ${
            filters.category == null ? "btn-primary" : "btn-tritary"
          }`}
          onClick={() => setFilters({ category: "", page: 1 })}
        >
          None
        </Button>
      </div>

      <h3 className="my-4 flex items-center justify-center gap-3 text-center text-h6 font-bold md:justify-start md:text-left md:text-h4">
        <FontAwesomeIcon icon={faTrophy} className="h-5" />
        Leaderboard
      </h3>

      <List
        totalCount={leaderboard.totalCount}
        pageSize={filters.pageSize}
        hasPreviousPage={leaderboard.hasPreviousPage}
        hasNextPage={leaderboard.hasNextPage}
        currentPage={filters.page}
        setCurrentPage={(page) => setFilters({ page })}
        isLoading={isFetching}
      >
        <div className="flex flex-wrap justify-center gap-2 sm:justify-between">
          <div className="flex flex-wrap justify-center gap-2">
            {guild.simplePoints?.map((point) => (
              <Button
                key={point.id}
                className={clsx("badge break-words", {
                  "border-primary": pointID === point.id,
                })}
                onClick={changePoint(point.id)}
              >
                {point.name}
              </Button>
            ))}
          </div>

          <ListBox
            options={GUILD_LEADERBOARD_PAGE_SIZE_OPTIONS}
            value={filters.pageSize}
            onChange={(size) => {
              setFilters({ pageSize: size.value, page: 1 });
            }}
          />
        </div>

        <div className="rounded bg-gray-800 p-4 text-btn lg:p-8">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="py-2">
                <tr>
                  <th></th>
                  <th></th>
                  <th>
                    {guild.simplePoints &&
                      guild.simplePoints.find((p) => p.id === pointID)?.name}
                  </th>
                  <th>Headset</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-700">
                {!leaderboard.data.length && (
                  <tr className="w-full text-center">
                    <td colSpan={4}>
                      <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="mb-4 text-h1"
                      />
                      <h3 className="text-h3">No players found</h3>
                    </td>
                  </tr>
                )}

                {leaderboard?.data.map((player, key) => (
                  <GuildLeaderboardRow
                    player={player}
                    guild={guild}
                    rank={(filters.page - 1) * filters.pageSize + key + 1}
                    key={player.player.userID}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </List>
    </>
  );
}
