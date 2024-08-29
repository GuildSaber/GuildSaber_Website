import { useAuthContext } from "@/hooks/useAuthContext";
import { useParams } from "react-router-dom";

import Button from "@/components/Button";
import Flag from "@/components/Flag";
import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import Loader from "@/components/Loader";
import PlayerGuildsListBox from "@/features/player/components/PlayerGuildsListBox";
import PlayerMapScoreRow from "@/features/player/components/PlayerMapScoreRow";
import { usePlayer } from "@/features/player/hooks/usePlayer";
import { usePlayerScores } from "@/features/player/hooks/usePlayerScores";
import { usePlayerGuildStats } from "@/features/player/hooks/usePlayerStats";
import {
  PLAYER_FILTER_ORDER_VALUES,
  PLAYER_FILTER_SORT_BY_VALUES,
} from "@/features/player/utils/constants";
import { Category } from "@/types/api/models/category";
import { decimalToRGB } from "@/utils/color";
import { formatCommasNumber, formatHMD } from "@/utils/format";
import {
  faCircleExclamation,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";
import { useSearchParamsState } from "react-use-search-params-state";

const Player = () => {
  const { playerID } = useParams();

  if (!playerID) {
    return null;
  }

  const { session } = useAuthContext();
  const [params, setParams] = useSearchParamsState({
    page: { type: "number", default: 1 },
    guild: { type: "number", default: null },
    point: { type: "number", default: null },
  });
  const [filters, setFilters] = useSearchParamsState({
    "sort-by": { type: "string", default: "Points" },
    "order-by": { type: "string", default: "Desc" },
    categoryID: {
      type: "number",
      default: "",
    },
  });
  const [pageSense, setPageSense] = useState("next");

  const updateFilter = (filters: { [key: string]: string | number }) => {
    setFilters({ ...filters, page: 1 });
  };

  const selectGuild = (guildID: number) => {
    setParams({
      guild: guildID,
      point:
        player?.guilds?.find((guild) => guildID === guild.id)?.simplePoints![0]
          .id || null,
      page: 1,
      categoryID: "",
    });
  };

  const selectPoint = (pointID: number) => {
    setParams({ point: pointID, page: 1 });
  };

  const {
    data: player,
    isError: isPlayerError,
    error: playerError,
  } = usePlayer({
    playerID,
    enabled: !!playerID,
  });

  const guildID = params.guild || player?.guilds[0]?.id;
  const pointID =
    params.point ||
    player?.guilds.find((guild) => guildID === guild.id)?.simplePoints![0].id;

  const { data: playerStats } = usePlayerGuildStats({
    playerID,
    guildID,
    enabled: !!player && !!player.guilds[0],
  });

  const pointStats = playerStats?.playerPointStats.find(
    (point) => pointID === point.pointID,
  );

  const catogryPointStats = playerStats?.playerCategoryPointStats.find(
    (catogryPoint) =>
      pointID === catogryPoint.pointID &&
      filters.categoryID === catogryPoint.categoryID,
  );

  const {
    data: scores,
    isLoading: isScoresLoading,
    isFetching: isScoresFetching,
    isError: isScoresError,
  } = usePlayerScores({
    playerID,
    pointID: pointID,
    page: params.page,
    filters,
    enabled: !!playerID && !!playerStats,
  });

  if (isPlayerError) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 text-h1" />
        <h3 className="text-h3">{playerError.message}</h3>
      </div>
    );
  }

  const categories = player?.guilds
    .find((guild) => guildID === guild.id)
    ?.categories?.reduce(
      (acc: any, { name, id }: Category) => [
        ...acc,
        { value: id, label: name },
      ],
      [{ value: "", label: "None" }],
    );

  const playerCategoryLevelStats = playerStats?.playerCategoryLevelStats.find(
    (level) => level.categoryID === filters.categoryID,
  );

  const levelColor = decimalToRGB(
    filters.categoryID
      ? playerCategoryLevelStats?.level?.colorOverride
      : playerStats?.playerLevelStat.level?.color,
  );

  const hasCategoryID = filters.categoryID;
  const categoryLevel = playerCategoryLevelStats?.level;
  const playerLevel = playerStats?.playerLevelStat.level;

  let levelDisplay;
  let levelNumber;

  if (hasCategoryID && categoryLevel) {
    if (categoryLevel.canUseNumberOverride) {
      levelDisplay = `Lvl ${categoryLevel.numberOverride}`;
      levelNumber = categoryLevel.numberOverride;
    } else {
      levelDisplay = categoryLevel.nameOverride;
    }
  } else if (playerLevel) {
    if (playerLevel.canUseNumber) {
      levelDisplay = `Lvl ${playerLevel.number}`;
      levelNumber = playerLevel.number;
    } else {
      levelDisplay = playerLevel.name;
    }
  }

  return (
    <div className="flow-content-2">
      <section className="card relative overflow-visible md:flex md:gap-4 md:p-4">
        <img
          src={player?.player?.user_AvatarUrl as string}
          className="h-24 w-full object-cover md:h-32 md:w-32 md:rounded"
        />
        <div className="flex flex-col gap-2">
          <div className="flex-center flex flex-wrap gap-4 md:!justify-start">
            <Flag className="h-6 rounded-sm" code={player?.player.country} />
            <h1 className="text-h5 font-bold">{player?.player?.name}</h1>
            {levelDisplay && (
              <p
                style={{
                  backgroundColor: `rgba(${levelColor.toString()}, 0.70)`,
                  borderColor: `rgb(${levelColor.toString()}`,
                }}
                className="rounded-sm border-2 px-1 font-bold"
              >
                {levelDisplay}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col flex-wrap items-center gap-2 md:items-start md:!justify-start">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="badge badge-secondary">
                <span>
                  <FontAwesomeIcon icon={faRankingStar} />
                </span>
                #
                {formatCommasNumber(
                  catogryPointStats
                    ? catogryPointStats.rank
                    : pointStats?.rank ?? 0,
                )}
              </span>
              <span className="badge badge-secondary">
                <span className="font-bold tracking-tighter">
                  {catogryPointStats
                    ? catogryPointStats.pointName
                    : pointStats?.pointName ?? ""}
                </span>
                {formatCommasNumber(
                  catogryPointStats
                    ? catogryPointStats.pointValue
                    : pointStats?.pointValue ?? 0,
                )}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="badge badge-split">
                <span>Avg Acc</span>
                <span>0%</span>
              </span>
              <span className="badge badge-split">
                <span>HMD</span>
                <span>{formatHMD(session?.player?.hmd ?? 0)}</span>
              </span>
              <span className="badge badge-split">
                <span>Total Passes</span>
                <span>
                  {formatCommasNumber(
                    catogryPointStats
                      ? catogryPointStats.validPassCount
                      : pointStats?.validPassCount ?? 0,
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
        {levelNumber && (
          <div
            className="absolute -top-2 right-0 hidden h-40 w-32 rotate-[20deg] items-center justify-center rounded md:flex"
            style={{
              backgroundColor: `rgba(${levelColor.toString()}, 1)`,
              backgroundImage: `linear-gradient(200deg, rgba(0,0,0,0.6) 20%, transparent 100%)`,
            }}
          >
            <h3 className="z-20 rotate-[-20deg] text-6xl font-semibold text-white">
              {levelNumber}
            </h3>
            <img
              className="pointer-events-none absolute p-4 opacity-20 grayscale"
              src="/gsLogo.svg"
            />
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 overflow-x-clip overflow-y-visible py-4">
        <div className="flex flex-wrap items-stretch justify-center gap-2 md:justify-between">
          <div className="flex flex-wrap justify-center gap-2">
            {!!player && player.guilds[0] && (
              <PlayerGuildsListBox
                guilds={player?.guilds}
                guildID={guildID}
                onChange={selectGuild}
              />
            )}

            {categories && (
              <ListBox
                options={categories}
                value={filters.categoryID}
                onChange={(category) =>
                  setFilters({ categoryID: category.value, page: 1 })
                }
              />
            )}

            <ListBox
              options={PLAYER_FILTER_SORT_BY_VALUES}
              value={filters["sort-by"]}
              onChange={(sortBy) => updateFilter({ "sort-by": sortBy.value })}
            />

            <ListBox
              options={PLAYER_FILTER_ORDER_VALUES}
              value={filters["order-by"]}
              onChange={(orderBy) =>
                updateFilter({ "order-by": orderBy.value })
              }
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {player?.guilds &&
              player.guilds
                .find((guild) => guildID === guild.id)
                ?.simplePoints!.map((point) => (
                  <Button
                    key={point.id}
                    className={clsx("badge", {
                      "border-primary": pointID === point.id,
                    })}
                    text={point.name}
                    onClick={() => {
                      selectPoint(point.id);
                    }}
                  ></Button>
                ))}
          </div>
        </div>

        {isScoresLoading && <Loader />}

        {isScoresError && (
          <div className="text-center">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="mb-4 text-h1"
            />
            <h3 className="text-h3">No Scores found</h3>
          </div>
        )}

        {scores && (
          <List
            totalCount={scores.totalCount}
            pageSize={scores.pageSize}
            hasPreviousPage={scores.hasPreviousPage}
            hasNextPage={scores.hasNextPage}
            currentPage={params.page}
            setCurrentPage={(page, sense) => {
              setParams({ page });
              setPageSense(sense);
            }}
            isLoading={isScoresFetching}
          >
            {scores?.data.map((score, delay) => (
              <PlayerMapScoreRow
                key={score.id}
                animDelay={delay}
                animSense={pageSense}
                score={score}
              />
            ))}
          </List>
        )}
      </section>
    </div>
  );
};

export default Player;
