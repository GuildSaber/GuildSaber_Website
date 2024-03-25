import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import Loader from "@/components/Loader";
import { useGuildLeaderboard } from "@/features/guild/hooks/useGuildLeaderboard";
import { getGuildSimplePoints } from "@/features/guild/utils/api";
import {
  GUILD_LEADERBOARD_PAGE_SIZE,
  GUILD_LEADERBOARD_PAGE_SIZE_OPTIONS,
} from "@/features/guild/utils/constants";
import { useAuthContext } from "@/hooks/useAuthContext";
import { formatHMD } from "@/utils/format";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import { useSearchParamsState } from "react-use-search-params-state";

export default function Leaderboard() {
  const { guildID } = useParams();

  if (!guildID) {
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
      default: null,
    },
  });

  const changePoint = (point: number) => () => setFilters({ point, page: 1 });

  const {
    data: points,
    isError: isPointsError,
    isLoading: isPointsLoading,
  } = useQuery({
    queryKey: ["guilds", "points", guildID],
    queryFn: async () => {
      const points = await getGuildSimplePoints({ guildID });

      if (!filters.point && points) {
        setFilters({ point: points[0].id });
      }

      return points;
    },
    retry: 2,
  });

  const {
    data: leaderboard,
    isError: isLeaderboardError,
    isLoading: isLeaderboardLoading,
  } = useGuildLeaderboard(
    filters.point || 1,
    filters.page,
    filters.pageSize,
    !!points,
  );

  if (isPointsLoading || isLeaderboardLoading) {
    return <Loader />;
  }

  if (!leaderboard || isPointsError || isLeaderboardError) {
    return (
      <div className="rounded bg-gray-800 p-4 lg:p-8">
        <p>Failed to get Leaderboard</p>
        {/*error && <p>{JSON.stringify(error)}</p>*/}
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

        {(!leaderboard.data.length || !filters.point) && (
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
