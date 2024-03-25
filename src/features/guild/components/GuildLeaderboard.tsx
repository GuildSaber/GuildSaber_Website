import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/hooks/useAuthContext";
import { SimplePoints } from "@/types/api/models/point";
import { formatHMD } from "@/utils/format";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSearchParamsState } from "react-use-search-params-state";
import { useGuildLeaderboard } from "../hooks/useGuildLeaderboard";
import {
  GUILD_LEADERBOARD_PAGE_SIZE,
  GUILD_LEADERBOARD_PAGE_SIZE_OPTIONS,
} from "../utils/constants";

export default function GuildLeaderboard({
  points,
}: {
  points: SimplePoints[];
}) {
  if (!points) {
    return;
  }

  const { session } = useAuthContext();
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
      default: points[0].id,
    },
  });

  const changePoint = (point: number) => () => setFilters({ point, page: 1 });

  const {
    data: leaderboard,
    isError: isError,
    error,
    isLoading: isLoading,
  } = useGuildLeaderboard(
    filters.point,
    filters.page,
    filters.pageSize,
    !!points,
  );

  if (isLoading) {
    return <Loader />;
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
      pageSize={filters.pageSize}
      hasPreviousPage={leaderboard.hasPreviousPage}
      hasNextPage={leaderboard.hasNextPage}
      currentPage={filters.page}
      setCurrentPage={(page) => setFilters({ page })}
    >
      <div className="flex justify-between">
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

        <ListBox
          options={GUILD_LEADERBOARD_PAGE_SIZE_OPTIONS}
          value={filters.pageSize}
          onChange={(size) => {
            setFilters({ pageSize: size.value, page: 1 });
          }}
        />
      </div>
      <div className="rounded bg-gray-800 p-2 text-btn lg:p-8">
        <div className="grid w-full grid-cols-[2fr_10fr_6fr_4fr] gap-2 px-1 py-2 text-btn md:grid-cols-[2fr_10fr_6fr_4fr]">
          <p>Rank</p>
          <p></p>
          <p>{points && points.find((p) => p.id === filters.point)?.name}</p>
          <p>Headset</p>
        </div>

        {!leaderboard.data.length && (
          <div className="w-full text-center">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="mb-4 text-h1"
            />
            <h3 className="text-h3">No players found</h3>
          </div>
        )}

        <div className="grid w-full gap-2 font-medium">
          {leaderboard?.data.map(({ player, points }, key) => {
            return (
              <div
                key={key}
                className={clsx(
                  "text-btn-1 grid w-full cursor-pointer grid-cols-[2fr_10fr_6fr_4fr] items-center gap-3 rounded px-2 py-1 transition-colors hover:bg-gray-900 md:grid-cols-[2fr_10fr_6fr_4fr]",
                  {
                    "outline outline-1 outline-secondary":
                      player.userID === session?.player?.userID,
                  },
                )}
              >
                <p>{`#${(filters.page - 1) * filters.pageSize + key + 1}`}</p>

                <Link
                  className="overflow-hidde flex items-center"
                  to={`/player/${player.userID}`}
                >
                  <div className="inline-flex items-center justify-normal gap-2">
                    <Avatar
                      src={player.user_AvatarUrl}
                      name={player.name}
                      className="h-7 min-w-7 rounded-full"
                    />
                    <span className="line-clamp-2 inline-flex break-all text-[0.80rem]">
                      {player.name}
                    </span>
                  </div>
                </Link>

                <p className="text-secondary">{`${points.toFixed(2)}`}</p>

                <p className="overflow-hidden" title={formatHMD(player?.hmd)}>
                  <span className="inline-flex text-ellipsis">
                    {formatHMD(player?.hmd)}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </List>
  );
}
