import { useAuthContext } from "@/hooks/useAuthContext";
import { useParams } from "react-router-dom";

import Button from "@/components/Button";
import { Flag } from "@/components/Flag";
import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import Loader from "@/components/Loader";
import { PlayerGuildsListBox } from "@/features/player/components/PlayerGuildsListBox";
import { PlayerMapScoreRow } from "@/features/player/components/PlayerMapScoreRow";
import { usePlayer } from "@/features/player/hooks/usePlayer";
import { usePlayerScores } from "@/features/player/hooks/usePlayerScores";
import { usePlayerGuildStats } from "@/features/player/hooks/usePlayerStats";
import {
  PLAYER_FILTER_ORDER_VALUES,
  PLAYER_FILTER_SORT_BY_VALUES,
} from "@/features/player/utils/constants";
import { Category } from "@/types/api/models/category";
import { decimalToRGB } from "@/utils/color";
import { formatHMD } from "@/utils/format";
import {
  faCircleExclamation,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";
import { useSearchParamsState } from "react-use-search-params-state";

export default function PlayerProfile() {
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
    });
  };

  const selectPoint = (pointID: number) => {
    setParams({ point: pointID, page: 1 });
  };

  const { data: player, isError: isPlayerError } = usePlayer({
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
        <h3 className="text-h3">Player not found</h3>
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

  return (
    <>
      <div className="flow-content-2">
        <section className="card md:flex md:gap-4 md:p-4">
          <img
            src={player?.player?.user_AvatarUrl as string}
            className="h-24 w-full object-cover md:h-32 md:w-32 md:rounded"
          />
          <div className="flex flex-col gap-2">
            <div className="flex-center flex flex-wrap gap-4 md:!justify-start">
              <Flag className="h-6 rounded-sm" code={player?.player.country} />
              <h1 className="text-h5 font-bold">{player?.player?.name}</h1>
              <p
                style={{
                  backgroundColor: `rgba(${levelColor.toString()}, 0.70)`,
                  borderColor: `rgb(${levelColor.toString()}`,
                }}
                className="rounded-sm border-2 px-1 font-bold"
              >
                {filters.categoryID
                  ? playerCategoryLevelStats?.level?.canUseNumberOverride
                    ? `Lvl ${playerCategoryLevelStats?.level?.numberOverride}`
                    : playerCategoryLevelStats?.level?.nameOverride
                  : playerStats?.playerLevelStat.level?.canUseNumber
                    ? `Lvl ${playerStats?.playerLevelStat.level.number}`
                    : playerStats?.playerLevelStat.level?.name}
              </p>
            </div>
            <div className="mb-4 flex flex-col flex-wrap items-center gap-2 md:items-start md:!justify-start">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="badge badge-secondary">
                  <span>
                    <FontAwesomeIcon icon={faRankingStar} />
                  </span>
                  #
                  {catogryPointStats
                    ? catogryPointStats.rank
                    : pointStats?.rank ?? 0}
                </span>
                <span className="badge badge-secondary">
                  <span className="font-bold tracking-tighter">CPP</span>
                  {catogryPointStats
                    ? catogryPointStats.pointValue
                    : pointStats?.pointValue ?? 0}
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
                    {catogryPointStats
                      ? catogryPointStats.validPassCount
                      : pointStats?.validPassCount ?? 0}
                  </span>
                </span>
              </div>
            </div>
          </div>
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
    </>
  );
}
