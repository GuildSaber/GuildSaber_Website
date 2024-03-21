import ArcViewer from "@/components/ArcViewer";
import Button from "@/components/Button";
import BeatSaver from "@/components/Icons/BeatSaver";
import List from "@/components/List";
import { useAuthContext } from "@/hooks/useAuthContext";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import ListBox from "@/components/ListBox/ListBox";
import Loader from "@/components/Loader";
import {
  PLAYER_API_SCORES_DATA_INCLUDES,
  PLAYER_PAGE_SIZE,
} from "@/utils/constants";
import { EIncludeFlags } from "@/enums/api";
import useArcViewer from "@/hooks/useArcViewer";
import {
  PlayerAPIResponse,
  PlayerAPIResponseSchema,
  PlayerScoresAPIResponse,
  PlayerScoresAPIResponseSchema,
  PlayerStatsAPIResponse,
  PlayerStatsAPIResponseSchema,
} from "@/types/api/player";
import { fetchAPI } from "@/utils/fetch";
import {
  formatDifficulty,
  formatDurationSince,
  formatHMD,
  formatLargeNumber,
  formatModifiers,
} from "@/utils/format";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faChevronUp,
  faCircleExclamation,
  faPlay,
  faRankingStar,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

function getDiffShort(score: PlayerScoresAPIResponse["data"][0]) {
  if (score.songDifficulty.gameMode.name === "Standard") {
    return {
      1: "E",
      3: "N",
      5: "H",
      7: "Ex",
      9: "Ex+",
    }[score.songDifficulty.difficulty];
  } else {
    return <FontAwesomeIcon icon={faSkull} />;
  }
}

function getTotalMisses(score: PlayerScoresAPIResponse["data"][0]) {
  return score.score.missedNotes + score.score.badCuts;
}

export default function PlayerProfile() {
  const { playerID } = useParams();

  const { session } = useAuthContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") as string) || 1,
  );
  const [guildID, setGuildID] = useState(
    parseInt(searchParams.get("guild") as string) || null,
  );
  const [pointID, setPointID] = useState(
    parseInt(searchParams.get("point") as string) || null,
  );

  const arcViewer = useArcViewer();

  /* At first Fetch the player */
  const { data: player, isError: isPlayerError } = useQuery({
    queryKey: ["playerProfile", playerID],
    queryFn: async () => {
      let result = await fetchAPI<PlayerAPIResponse>({
        path: `/player/by-id/${playerID}`,
        queryParams: {
          include: EIncludeFlags.Users | EIncludeFlags.Points,
        },
        schema: PlayerAPIResponseSchema,
      });

      if (result && result.guilds && result.guilds.length > 0) {
        const defaultGuild = result.guilds[0];
        const defaultPoint = defaultGuild.simplePoints[0];

        if (!guildID) setGuildID(defaultGuild.id);
        if (!pointID) setPointID(defaultPoint?.id || null);

        const guild = result.guilds.find((guild) => guild.id === guildID);

        if (guild) {
          const point = guild.simplePoints.find(
            (point) => point.id === pointID,
          );

          if (!point) {
            setPointID(guild.simplePoints[0]?.id || null);
          }
        } else {
          setGuildID(defaultGuild.id);

          const point = result.guilds.find((point) => point.id === pointID);

          if (!point) {
            setPointID(defaultPoint?.id || null);
          }
        }
      } else {
        // Reset guildID and pointID when the player has no guilds
        setGuildID(null);
        setPointID(null);
      }

      return result;
    },
    enabled: !!playerID,
  });

  /* Then fetch the player stats on the points and guild (unless they don't exist) */
  const { data: playerStats } = useQuery({
    queryKey: ["player", playerID, "stats", pointID],
    queryFn: () =>
      fetchAPI<PlayerStatsAPIResponse>({
        path: `/player/${playerID}/stats/${pointID}`,
        schema: PlayerStatsAPIResponseSchema,
      }),
    enabled: !!player && !!pointID && player.guilds.length !== 0,
  });

  /* Then fetch the player scores on the point (unless it doesn't exist) */
  const {
    data: scores,
    isLoading: isScoresLoading,
    isError: isScoresError,
  } = useQuery({
    queryKey: ["player", playerID, "scores", pointID, currentPage],
    queryFn: () =>
      fetchAPI<PlayerScoresAPIResponse>({
        path: "/ranked-scores",
        queryParams: {
          page: currentPage,
          pageSize: PLAYER_PAGE_SIZE,
          userID: playerID,
          pointID: pointID,
          include: PLAYER_API_SCORES_DATA_INCLUDES,
        },
        schema: PlayerScoresAPIResponseSchema,
      }),
    enabled: !!player && !!pointID,
  });

  function onPlayClick(score: PlayerScoresAPIResponse["data"][0]) {
    arcViewer.open({
      bsrCode: score.songDifficulty.song.beatSaverKey,
      difficulty: score.songDifficulty.difficulty,
      mode: score.songDifficulty.gameMode.name,
    });
  }

  const selectGuild = (guildID: number) => {
    setGuildID(guildID);
    setPointID(
      player?.guilds.find((guild) => guildID === guild.id)?.simplePoints[0]
        .id || null,
    );
    setCurrentPage(1);
    searchParams.delete("page");
  };

  const selectPoint = (pointID: number) => {
    setPointID(pointID);
    setCurrentPage(1);
    searchParams.delete("page");
  };

  useEffect(() => {
    if (guildID === null) {
      searchParams.delete("guild");
    } else {
      searchParams.set("guild", guildID?.toString());
    }

    if (pointID === null) {
      searchParams.delete("point");
    } else {
      searchParams.set("point", pointID?.toString());
    }

    navigate({ search: searchParams.toString() }, { replace: true });
  }, [guildID, pointID]);

  if (isPlayerError) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 text-h1" />
        <h3 className="text-h3">Player not found</h3>
      </div>
    );
  }

  return (
    <>
      <div className="flow-content-2">
        <section className="card md:flex md:gap-4 md:p-4">
          <img
            src={player?.player?.user_AvatarUrl}
            className="h-24 w-full object-cover md:h-32 md:w-32 md:rounded"
          />
          <div className="flex flex-col gap-2">
            <div className="flex-center gap-4 md:!justify-start">
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png"
                }
                className="h-6 rounded"
              />
              <h1 className="text-h5 font-bold">{player?.player?.name}</h1>
            </div>
            <div className="mb-4 flex flex-col flex-wrap items-center gap-2 md:items-start md:!justify-start">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="badge badge-secondary">
                  <span>
                    <FontAwesomeIcon icon={faRankingStar} />
                  </span>
                  #{playerStats?.rank ?? 0}
                </span>
                <span className="badge badge-secondary">
                  <span className="font-bold tracking-tighter">CPP</span>
                  {playerStats?.pointValue ?? 0}
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
                  <span>{playerStats?.validPassCount ?? 0}</span>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="card overflow-visible px-2 py-4">
          <div className="flex justify-between gap-2">
            {((!!player && !!guildID) ||
              (!!player?.guilds && player.guilds.length !== 0)) && (
              <ListBox
                options={player?.guilds
                  .filter((guild) => guild.simplePoints.length !== 0)
                  .reduce(
                    (
                      acc: { value: number; label: string; image: string }[],
                      guild,
                    ) =>
                      (acc = [
                        ...acc,
                        {
                          value: guild.id,
                          label: guild.name,
                          image: `https://cdn.guildsaber.com/Guild/${guild.id}/Logo.jpg`,
                        },
                      ]),
                    [],
                  )}
                value={guildID ?? player?.guilds[0]?.id}
                onChange={(option) => selectGuild(option.value)}
              />
            )}

            <div className="flex gap-2">
              {player?.guilds &&
                player?.guilds
                  .find((guild) => guildID === guild.id)
                  ?.simplePoints.map((point) => (
                    <Button
                      key={point.id}
                      className={clsx("btn bg-tritary bg-gray-900", {
                        "btn-primary": pointID === point.id,
                      })}
                      text={point.name}
                      onClick={() => {
                        selectPoint(point.id);
                        setCurrentPage(1);
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
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              {scores?.data.map((score) => (
                <div
                  key={score.id}
                  className="grid grid-cols-[1fr_6rem] items-center gap-y-2 border-t-2 border-gray-700 py-4 transition-colors md:grid-cols-[6rem_1fr_14rem_6rem] md:gap-2 md:rounded md:border-0 md:px-2 md:hover:bg-gray-900"
                >
                  <div className="hidden text-right md:block">
                    <p className="text-h6 font-bold">#{score.rank}</p>
                    <p className="text-btn text-muted">
                      {formatDurationSince(score.modifiedUnixTime)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={`https://eu.cdn.beatsaver.com/${score.songDifficulty.song.hash}.jpg`}
                        className="aspect-square h-14 max-w-none rounded"
                      />
                      <span
                        className={`badge text-base/2 absolute left-1/2 top-full h-8 w-8 -translate-x-1/2 -translate-y-1/2 border-2 bg-gray-800 font-bold border-${
                          formatDifficulty[score.songDifficulty.difficulty]
                        } text-${
                          formatDifficulty[score.songDifficulty.difficulty]
                        }`}
                      >
                        {getDiffShort(score)}
                      </span>
                    </div>
                    <div className="ml-2">
                      <p className="line-clamp-2 text-btn text-muted">
                        {score.songDifficulty.song.songAuthorName} [
                        {score.songDifficulty.song.mapperName}]
                      </p>
                      <Link to={`/map/${score.rankedMap.id}`}>
                        <h1 className="line-clamp-2 text-h6 font-bold">
                          {score.songDifficulty.song.songName}
                        </h1>
                      </Link>
                      <p className="line-clamp-1 text-btn text-muted">
                        {formatDurationSince(
                          score.songDifficulty.song.unixUploadedTime,
                        )}{" "}
                        ago
                      </p>
                    </div>
                  </div>
                  <div className="text-right md:hidden">
                    <Button className="btn btn-tritary" text="View"></Button>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span className="badge badge-secondary md:hidden">
                        #{score.rank}
                      </span>
                      <span className="badge badge-secondary">
                        {Math.round(100 * score.rawPoints * score.weight) / 100}{" "}
                      </span>
                      <span
                        className={clsx("badge", {
                          "badge-error": getTotalMisses(score) > 0,
                          "badge-success": getTotalMisses(score) === 0,
                        })}
                      >
                        {getTotalMisses(score) || "FC"}{" "}
                        <span>
                          <FontAwesomeIcon
                            icon={getTotalMisses(score) > 0 ? faXmark : faCheck}
                          />
                        </span>
                      </span>
                      {score.score.modifiers > 0 && (
                        <span className="badge">
                          {formatModifiers(score.score.modifiers).join(" | ")}
                        </span>
                      )}
                      <span className="badge">
                        {(
                          Math.round(
                            (10000 * score.score.baseScore) /
                              score.songDifficulty.songDifficultyStats.maxScore,
                          ) / 100
                        ).toFixed(2)}
                        %
                      </span>
                      <span className="badge">
                        {formatLargeNumber(score.effectiveScore)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        className="btn btn-tritary"
                        icon={faTwitch}
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `!bsr ${score.songDifficulty.song.beatSaverKey}`,
                          )
                        }
                      ></Button>
                      <Link
                        to={`https://beatsaver.com/maps/${score.songDifficulty.song.beatSaverKey}`}
                        target="_blank"
                      >
                        <Button className="btn-tritary">
                          <BeatSaver />
                        </Button>
                      </Link>
                      <Button
                        className="btn btn-tritary"
                        icon={faPlay}
                        onClick={() => onPlayClick(score)}
                      ></Button>
                      <Button
                        className="btn btn-tritary hidden"
                        icon={faChevronUp}
                      ></Button>
                    </div>
                  </div>
                </div>
              ))}
            </List>
          )}
        </section>
      </div>
      <ArcViewer settings={arcViewer} />
    </>
  );
}
