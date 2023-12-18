import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import clsx from "clsx";
import BeatSaver from "../../components/Icons/BeatSaver";
import List from "../../components/List/List";
import Button from "../../components/Common/Button/Button";
import ArcViewer from "../../components/Common/ArcViewer/ArcViewer";
import { useAuthContext } from "../../hooks/useAuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronUp,
  faPlay,
  faRankingStar,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import {
  formatDifficulty,
  formatDurationSince,
  formatHMD,
  formatLargeNumber,
  formatModifiers,
} from "../../utils/format";
import {
  PlayerAPIResponseSchema,
  PlayerScoresAPIResponse,
  PlayerScoresAPIResponseSchema,
  PlayerStatsAPIResponseSchema,
  PointsAPIResponseSchema,
} from "../../types/api/player";
import { EIncludeFlags } from "../../enums/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Common/Loader/Loader";

const PAGE_SIZE = 10;
const API_PLAYER_SCORES_DATA_INCLUDES =
  EIncludeFlags.RankedMapVersions |
  EIncludeFlags.Scores |
  EIncludeFlags.Songs |
  EIncludeFlags.GameModes |
  EIncludeFlags.SongDifficulties |
  EIncludeFlags.SongDifficultyStats;

export default function PlayerProfile() {
  const { playerID } = useParams();
  if (!playerID) {
    return <p>Error</p>;
  }

  const { session } = useAuthContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activePoint, setActivePoint] = useState(1);
  const [arcViewer, setArcViewer] = useState({
    isOpen: false,
    bsrCode: "",
    difficulty: 0,
    mode: "",
  });

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") as string) || 1,
  );

  const [activeGuild, setActiveGuild] = useState(
    parseInt(searchParams.get("guild") as string) || 1,
  );

  const getPlayerScores = async (page: number, pointID?: number) =>
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/ranked-scores?userID=${playerID}&pointID=${
        pointID ?? activePoint
      }&page=${page}&pageSize=${PAGE_SIZE}&include=${API_PLAYER_SCORES_DATA_INCLUDES}
      `,
    )
      .then((res) => res.json())
      .then(PlayerScoresAPIResponseSchema.parse);

  const getPlayer = async (playerID: string) =>
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/player/by-id/${playerID}?include=${
        EIncludeFlags.Users
      }`,
    )
      .then((res) => res.json())
      .then(PlayerAPIResponseSchema.parse);

  const getPlayerStats = async (playerID: string, pointID: number) =>
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/player/${playerID}/stats/${
        pointID ?? 1
      }`,
    )
      .then((res) => res.json())
      .then(PlayerStatsAPIResponseSchema.parse);

  const getPointsByGuildID = (guildID: number) => {
    return fetch(
      `${import.meta.env.VITE_API_BASE_URL}/points?guildID=${guildID}`,
    )
      .then((res) => res.json())
      .then(PointsAPIResponseSchema.parse);
  };

  const {
    data: scores,
    isLoading: isScoresLoading,
    isError: isScoresError,
  } = useQuery({
    queryKey: ["player", playerID, "scores", activePoint, currentPage],
    queryFn: () => getPlayerScores(currentPage, activePoint),
  });

  const { data: player, isError } = useQuery({
    queryKey: ["player", playerID],
    queryFn: () => getPlayer(playerID),
  });

  const { data: playerStats } = useQuery({
    queryKey: ["player", playerID, "stats", activePoint],
    queryFn: () => getPlayerStats(playerID, activePoint),
  });

  const { data: guildPoints } = useQuery({
    queryKey: ["player", playerID, "guild", activeGuild, "points", 1],
    queryFn: () => getPointsByGuildID(activeGuild),
  });

  function getTotalMisses(score: PlayerScoresAPIResponse["data"][0]) {
    return score.score.missedNotes + score.score.badCuts;
  }

  function onPlayClick(score: PlayerScoresAPIResponse["data"][0]) {
    setArcViewer({
      isOpen: true,
      bsrCode: score.songDifficulty.song.beatSaverKey,
      difficulty: score.songDifficulty.difficulty,
      mode: score.songDifficulty.gameMode.name,
    });
  }

  const selectGuild = (guildID: number) => {
    setActiveGuild(guildID);
    searchParams.set("guild", guildID.toString());
    navigate({ search: searchParams.toString() }), { replace: true };
  };

  useEffect(() => {
    if (!guildPoints?.data[0]) {
      return;
    }
    setActivePoint(guildPoints?.data[0].id || 0);
  }, [guildPoints]);

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

  if (isError) {
    return <div>Error</div>;
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
        <section className="card px-2 py-4">
          <div className="flex-center gap-2">
            {player?.guilds.map((guild, key) => (
              <img
                key={key}
                src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.jpg`}
                onClick={() => selectGuild(guild.id)}
                className={clsx("h-10 cursor-pointer rounded-full", {
                  "outline outline-2 outline-primary": guild.id === activeGuild,
                })}
              />
            ))}
            <p></p>
          </div>

          <div className="flex-center gap-2">
            {guildPoints &&
              guildPoints?.data.map((point) => (
                <Button
                  key={point.id}
                  className={clsx("btn bg-tritary bg-gray-900", {
                    "btn-primary": activePoint === point.id,
                  })}
                  text={point.name}
                  onClick={() => {
                    setActivePoint(point.id);
                    setCurrentPage(1);
                  }}
                ></Button>
              ))}
          </div>

          {isScoresLoading && <Loader />}

          {scores && !isScoresError && (
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
                      {formatDurationSince(score.score.unixTimeSet)}
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
                        <span className="font-bold tracking-tighter">
                          {
                            guildPoints?.data.find(
                              (point) => point.id === activePoint,
                            )?.name
                          }
                        </span>
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
                        <Button
                          className="btn btn-tritary"
                          component={() => <BeatSaver />}
                        ></Button>
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
      {arcViewer.isOpen && (
        <ArcViewer
          bsrCode={arcViewer.bsrCode}
          difficulty={arcViewer.difficulty}
          mode={arcViewer.mode}
          onClose={() => setArcViewer({ ...arcViewer, isOpen: false })}
        />
      )}
    </>
  );
}
