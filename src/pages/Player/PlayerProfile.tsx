import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronUp,
  faPlay,
  faRankingStar,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { PlayerScoresAPIResponse, PointsAPIResponse } from "../../types/api";
import List from "../../components/List/List";
import Button from "../../components/Common/Button/Button";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import BeatSaver from "../../components/Icons/BeatSaver";
import { formatDurationSince, formatLargeNumber } from "../../utils/format";
import clsx from "clsx";

export default function PlayerProfile() {
  const { session } = useAuthContext();
  const [scores, setScores] = useState<PlayerScoresAPIResponse | null>(null);
  const [points, setPoints] = useState<PointsAPIResponse | null>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);

  function fetchPlayerScores(page: number) {
    fetch(
      `https://api-dev.guildsaber.com/ranked-scores?userID=${session?.user?.id}&pointID=1&page=${page}&pageSize=10&include=SongDifficulties,SongDifficultyStats,Songs,Scores,ScoreStatistics,HitTrackers`,
    )
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
        console.log(data);
      });
  }

  function fetchPoints() {
    fetch(`https://api-dev.guildsaber.com/points?page=1&pageSize=10`)
      .then((res) => res.json())
      .then((data) => {
        setPoints(data);
        setActivePoint(data.data[0].id);
        //console.log(data);
      });
  }

  function switchPage(page: number) {
    fetchPlayerScores(page);
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

  useEffect(() => {
    if (session) {
      fetchPlayerScores(1);
      fetchPoints();
    }
  }, [session]);

  return (
    <>
      <div className="flow-content-2">
        <section className="card">
          <img
            src={session?.player?.user_AvatarUrl}
            className="h-24 w-full object-cover"
          />
          <div className="flex-center gap-4">
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
          <div className="flex-center mb-4 flex-wrap gap-2">
            <span className="badge badge-secondary">
              <span>
                <FontAwesomeIcon icon={faRankingStar} />
              </span>
              #15
            </span>
            <span className="badge badge-secondary">
              <span className="font-bold tracking-tighter">CPP</span>
              8666.42
            </span>
            <span className="badge badge-split">
              <span>Avg Acc</span>
              <span>76.45%</span>
            </span>
            <span className="badge badge-split">
              <span>HMD</span>
              <span>Quest 2</span>
            </span>
            <span className="badge badge-split">
              <span>Total Passes</span>
              <span>273</span>
            </span>
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
              setCurrentPage={switchPage}
            >
              {scores.data.map((score) => (
                <div
                  key={score.id}
                  className="grid grid-cols-[1fr_6rem] items-center gap-y-2 border-t-2 border-gray-700 py-4 md:grid-cols-[6rem_1fr_16rem_6rem] md:gap-2"
                >
                  <div className="hidden text-right md:block">
                    <p className="text-h6 font-bold">#{score.rank}</p>
                    <p className="text-btn text-muted">
                      {formatDurationSince(
                        score.songDifficulty.song.unixUploadedTime,
                      )}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={`https://eu.cdn.beatsaver.com/${score.songDifficulty.song.hash}.jpg`}
                        className="h-12 w-12 max-w-none rounded"
                      />
                      <span className="badge absolute left-1/2 top-full h-8 w-8 -translate-x-1/2 -translate-y-1/2 bg-gray-900">
                        <FontAwesomeIcon icon={faSkull} />
                      </span>
                    </div>
                    <div className="ml-2">
                      <p className="line-clamp-2 text-btn text-muted">
                        {score.songDifficulty.song.songAuthorName}[
                        {score.songDifficulty.song.mapperName}]
                      </p>
                      <h1 className="line-clamp-2 text-h6 font-bold">
                        {score.songDifficulty.song.songName}
                      </h1>
                      <p className="line-clamp-1 text-btn text-muted">
                        {formatDurationSince(score.score.unixTimeSet)}
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
                        <span className="font-bold tracking-tighter">CPP</span>
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
                      <span className="badge">DA | FS</span>
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
                      ></Button>
                      <Button
                        className="btn btn-tritary"
                        component={() => <BeatSaver />}
                      ></Button>
                      <Button
                        className="btn btn-tritary"
                        icon={faPlay}
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
    </>
  );
}
