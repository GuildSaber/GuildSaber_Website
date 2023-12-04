import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  formatDurationSince,
  formatHMD,
  formatLargeNumber,
  formatModifiers,
} from "../../utils/format";
import {
  PlayerScoresAPIResponse,
  PointsAPIResponse,
} from "../../types/api/player";

export default function PlayerProfile() {
  const { session } = useAuthContext();
  const [scores, setScores] = useState<PlayerScoresAPIResponse | null>(null);
  const [points, setPoints] = useState<PointsAPIResponse | null>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [showArcViewer, setShowArcViewer] = useState(false);
  const [playerStats, setPlayerStats] = useState<any>(null);
  const [arcViewerBeatSaverKey, setArcViewerBeatSaverKey] = useState("");
  const [arcViewerDifficulty, setArcViewerDifficulty] = useState<number>(9);
  const [arcViewerMode, setArcViewerMode] = useState("Standard");

  function fetchPlayerScores(page: number, pointID?: number) {
    console.log("FETCHING SCORES");
    fetch(
      `https://api-dev.guildsaber.com/ranked-scores?userID=${session?.user
        ?.id}&pointID=${
        pointID ?? activePoint ?? 1
      }&page=${page}&pageSize=10&include=SongDifficulties,SongDifficultyStats,Songs,Scores,ScoreStatistics,HitTrackers,GameModes`,
    )
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
        console.log(data);
      });
  }

  function fetchPlayerStats() {
    fetch(
      `https://api-dev.guildsaber.com/player/${session?.user?.id}/stats/${
        activePoint ?? 1
      }`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlayerStats(data);
      });
  }

  function fetchPoints() {
    console.log("FETCHING POINTS");
    fetch(`https://api-dev.guildsaber.com/points?page=1&pageSize=10`)
      .then((res) => res.json())
      .then((data) => {
        setPoints(data);
        setActivePoint(data.data[0].id);
        //console.log(data);
      });
  }

  function getTotalMisses(score: PlayerScoresAPIResponse["data"][0]) {
    return (
      score.score.scoreStatistic.hitTracker.leftBadCuts +
      score.score.scoreStatistic.hitTracker.rightBadCuts +
      score.score.scoreStatistic.hitTracker.leftBombs +
      score.score.scoreStatistic.hitTracker.rightBombs +
      score.score.scoreStatistic.hitTracker.leftMiss +
      score.score.scoreStatistic.hitTracker.rightMiss
    );
  }

  function onPlayClick(score: PlayerScoresAPIResponse["data"][0]) {
    setArcViewerBeatSaverKey(score.songDifficulty.song.beatSaverKey);
    setArcViewerDifficulty(score.songDifficulty.difficulty);
    setArcViewerMode(score.songDifficulty.gameMode.name);
    setShowArcViewer(true);
  }

  function getDiffShort(score: PlayerScoresAPIResponse["data"][0]) {
    if (score.songDifficulty.gameMode.name === "Standard") {
      return {
        1: "E",
        3: "N",
        5: "H",
        7: "E",
        9: "E+",
      }[score.songDifficulty.difficulty];
    } else {
      return <FontAwesomeIcon icon={faSkull} />;
    }
  }

  useEffect(() => {
    if (session) {
      fetchPoints();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchPlayerScores(1);
      fetchPlayerStats();
    }
  }, [activePoint]);

  return (
    <>
      <div className="flow-content-2">
        <section className="card md:flex md:gap-4 md:p-4">
          <img
            src={session?.player?.user_AvatarUrl}
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
              <h1 className="text-h5 font-bold">{session?.player?.name}</h1>
              <span className="badge hidden h-6 !border-0 bg-[#9300e4]">
                {25}
              </span>
            </div>
            <div className="flex-center mb-4 flex-wrap gap-2 md:!justify-start">
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
        </section>
        <section className="card px-2 py-4">
          <div className="flex-center gap-2">
            {points &&
              points.data.map((point) => (
                <Button
                  key={point.id}
                  className={clsx("btn bg-tritary bg-gray-900", {
                    "btn-primary": activePoint === point.id,
                  })}
                  text={point.name}
                  onClick={() => setActivePoint(point.id)}
                ></Button>
              ))}
          </div>
          {scores && (
            <List
              totalCount={scores.totalCount}
              pageSize={scores.pageSize}
              hasPreviousPage={scores.hasPreviousPage}
              hasNextPage={scores.hasNextPage}
              currentPage={scores.page}
              setCurrentPage={(page) =>
                fetchPlayerScores(page, points?.data[0].id)
              }
            >
              {scores.data.map((score) => (
                <div
                  key={score.id}
                  className="grid grid-cols-[1fr_6rem] items-center gap-y-2 border-t-2 border-gray-700 py-4 md:grid-cols-[6rem_1fr_14rem_6rem] md:gap-2 md:rounded md:border-0 md:px-2 md:hover:bg-gray-700"
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
                        className="h-12 w-12 max-w-none rounded"
                      />
                      <span className="badge absolute left-1/2 top-full h-8 w-8 -translate-x-1/2 -translate-y-1/2 bg-gray-900">
                        {getDiffShort(score)}
                      </span>
                    </div>
                    <div className="ml-2">
                      <p className="line-clamp-2 text-btn text-muted">
                        {score.songDifficulty.song.songAuthorName} [
                        {score.songDifficulty.song.mapperName}]
                      </p>
                      <h1 className="line-clamp-2 text-h6 font-bold">
                        {score.songDifficulty.song.songName}
                      </h1>
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
                            points?.data.find(
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
      {showArcViewer && (
        <ArcViewer
          bsrCode={arcViewerBeatSaverKey}
          difficulty={arcViewerDifficulty}
          mode={arcViewerMode}
          onClose={() => setShowArcViewer(false)}
        ></ArcViewer>
      )}
    </>
  );
}
