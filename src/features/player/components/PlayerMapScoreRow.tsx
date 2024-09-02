import BLReplayViewer from "@/components/BLReplayViewer";
import Button from "@/components/Button";
import BeatSaver from "@/components/Icons/BeatSaver";
import useBLReplayViewer from "@/hooks/useBLReplayViewer";
import { PlayerScoresApiStruct } from "@/types/api/responses/playerScoresApiStruct";
import {
  formatAccuracy,
  formatCommasNumber,
  formatDifficulty,
  formatDurationSince,
  formatModifiers,
} from "@/utils/format";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faChevronDown,
  faPlay,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router-dom";

type PlayerMapScoreRowProps = {
  score: PlayerScoresApiStruct["data"][0];
  animDelay?: number;
  animSense?: string;
};

const getDiffShort = (score: PlayerScoresApiStruct["data"][0]) => {
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
};

const getTotalMisses = (score: PlayerScoresApiStruct["data"][0]) => {
  return score.score.missedNotes + score.score.badCuts;
};

const PlayerMapScoreRow = ({
  score,
  animDelay,
  animSense,
}: PlayerMapScoreRowProps) => {
  const blReplay = useBLReplayViewer();

  const blReplayId = score.score.bL_ScoreID;

  const onPlayClick = () => {
    if (!blReplayId) {
      return;
    }

    blReplay.open(blReplayId);
  };

  return (
    <div
      style={{
        animationDelay: `calc(40ms * ${animDelay})`,
        animationName: animSense === "next" ? "slide-in" : "slide-out",
      }}
      className="anim-slide group grid items-center gap-y-2 rounded bg-gray-800 px-2 py-3 transition-colors md:grid-cols-[5rem_1fr_14rem_6rem] md:gap-2 md:hover:brightness-110"
    >
      <div className="flex justify-between md:flex-col md:justify-center md:text-center">
        <p className="md:text-h7 text-p font-bold">#{score.rank}</p>
        <p className="text-btn text-muted">
          {formatDurationSince(score.modifiedUnixTime)} ago
        </p>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <img
            src={`https://eu.cdn.beatsaver.com/${score.songDifficulty.song?.hash}.jpg`}
            className="aspect-square h-14 max-w-none rounded transition group-hover:-rotate-12 group-hover:scale-110"
          />
          <span
            style={{ fontSize: "12px" }}
            className={`badge absolute left-1/2 top-full h-6 w-7 -translate-x-1/2 -translate-y-1/2 border bg-gray-800 font-bold border-${
              formatDifficulty[score.songDifficulty.difficulty]
            } text-${formatDifficulty[score.songDifficulty.difficulty]}`}
          >
            {getDiffShort(score)}
          </span>
        </div>
        <div className="ml-2 transition-all group-hover:ml-4">
          <p className="line-clamp-2 text-btn text-muted">
            {score.songDifficulty.song?.songAuthorName} [
            {score.songDifficulty.song?.mapperName}]
          </p>
          <Link to={`/map/${score.rankedMap.id}`}>
            <h1 className="line-clamp-2 text-h6 font-bold">
              {score.songDifficulty.song?.songName}
            </h1>
          </Link>
          <p className="line-clamp-1 text-btn text-muted">
            {formatDurationSince(score.rankedMap.unixEditTime)} ago
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 md:justify-end">
        <div className="contents gap-2 md:flex">
          <span className="badge">
            {formatAccuracy(
              score.score.baseScore,
              score.songDifficulty.songDifficultyStats?.maxScore,
            )}
          </span>
          {score.weight > 0 && (
            <span className="badge badge-secondary">
              {formatCommasNumber(
                Math.round(100 * score.rawPoints * score.weight) / 100,
              )}
            </span>
          )}
          {score.score.modifiers > 0 && (
            <span className="badge border-sky-500 text-sky-500">
              {formatModifiers(score.score.modifiers).join(" | ")}
            </span>
          )}
        </div>
        <div className="contents gap-2 md:flex">
          <span className="badge">
            {formatCommasNumber(score.effectiveScore)}
          </span>
          <span
            className={clsx("badge", {
              "badge-error": getTotalMisses(score) > 0,
              "badge-success": getTotalMisses(score) === 0,
            })}
          >
            {getTotalMisses(score) || "FC"}
            <span>
              <FontAwesomeIcon
                icon={getTotalMisses(score) > 0 ? faXmark : faCheck}
              />
            </span>
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap justify-center gap-2 md:justify-end">
          <Button
            className="btn btn-tritary"
            icon={faTwitch}
            onClick={() =>
              navigator.clipboard.writeText(
                `!bsr ${score.songDifficulty.song?.beatSaverKey}`,
              )
            }
          ></Button>
          <Link
            to={`https://beatsaver.com/maps/${score.songDifficulty.song?.beatSaverKey}`}
            target="_blank"
            className="btn btn-tritary"
          >
            <BeatSaver />
          </Link>
          <Button
            className={clsx("btn btn-tritary", {
              "pointer-events-none opacity-50": !blReplayId,
            })}
            icon={faPlay}
            onClick={onPlayClick}
          />
          <Button
            className="btn btn-tritary hidden"
            icon={faChevronDown}
          ></Button>
        </div>
      </div>
      <BLReplayViewer settings={blReplay} />
    </div>
  );
};

export default PlayerMapScoreRow;
