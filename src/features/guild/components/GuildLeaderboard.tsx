import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Guild } from "@/types/api/models/guild";
import { formatHMD } from "@/utils/format";
import {
  faCircleExclamation,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSearchParamsState } from "react-use-search-params-state";
import { useGuildLeaderboard } from "../hooks/useGuildLeaderboard";
import {
  GUILD_LEADERBOARD_PAGE_SIZE,
  GUILD_LEADERBOARD_PAGE_SIZE_OPTIONS,
} from "../utils/constants";

export default function GuildLeaderboard({ guild }: { guild: Guild }) {
  if (!guild) {
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
      <div className="rounded bg-gray-800 p-4 lg:p-8">
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

      <h3 className="my-4 flex items-center gap-3 text-center text-h6 font-bold md:text-left md:text-h4">
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
        <div className="rounded bg-gray-800 p-2 text-btn lg:p-8">
          <div className="grid w-full grid-cols-[2fr_10fr_6fr_4fr] gap-2 px-1 py-2 text-btn md:grid-cols-[2fr_10fr_6fr_4fr]">
            <p>Rank</p>
            <p></p>
            <p>
              {guild.simplePoints &&
                guild.simplePoints.find(
                  (p) => p.id === filters.point || guild.simplePoints![0],
                )?.name}
            </p>
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
    </>
  );
}
