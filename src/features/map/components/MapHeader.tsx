import Button from "@/components/Button";

import BeatSaver from "@/components/Icons/BeatSaver";
import Bpm from "@/components/Icons/Bpm";
import Sparkles from "@/components/Icons/Sparkles";
import { ArcViewerSettingsProps } from "@/hooks/useArcViewer";
import { RankedMapResponse } from "@/types/api/responses/rankedMapApiStruct";
import { formatDifficulty, formatMinSec } from "@/utils/format";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import {
  faCloudArrowDown,
  faHourglassStart,
  faPlay,
  faSkull,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router-dom";

type MapHeaderProps = {
  mapData: RankedMapResponse;
  arcViewer: (arg0: ArcViewerSettingsProps) => void;
  className?: string;
};

export default function MapHeader({
  mapData,
  arcViewer,
  className,
}: MapHeaderProps) {
  const {
    song,
    songDifficultyStats: difficulty,
    difficulty: levelDifficulty,
    gameMode,
  } = mapData.rankedMap.rankedMapVersions[0]?.songDifficulty || {};

  if (!song || !difficulty || !levelDifficulty || !gameMode) {
    return <></>;
  }

  const rating = mapData.rankedMap.rating.default.stars;
  const songDuration = formatMinSec(song.duration);

  return (
    <>
      <div
        className={clsx(
          "group relative flex w-full flex-col gap-2 overflow-hidden rounded bg-gray-800 md:flex-row md:p-8 md:pr-[14rem]",
          className,
        )}
      >
        <div
          className={clsx(
            "relative block h-64 w-full overflow-hidden border-b-8 border-primary md:absolute md:right-0 md:top-0 md:h-[340px] md:w-[340px] md:-translate-y-[75px] md:translate-x-[150px] md:rotate-[20deg] md:transform md:overflow-hidden md:border-8 md:border-transparent md:outline md:outline-8",
            "outline-" + formatDifficulty[levelDifficulty],
            "lg:translate-x-[150px]",
          )}
        >
          <img
            className="h-full w-full object-cover transition-[filter,transform] md:h-[340px] md:w-[340px] md:translate-x-[-80px] md:transform"
            src={song.coverURL}
          />
          <div className="absolute bottom-0 flex w-full flex-col items-center bg-gray-700/50 p-2 text-center md:hidden">
            <Link to={`/map/${mapData.rankedMap.id}`}>
              <h3 className="line-clamp-1 text-h4 font-bold hover:underline">
                {song.songName}
              </h3>
            </Link>
            <p className="mb-2 text-p font-normal text-secondary">
              by {song.songAuthorName} [{song.mapperName}]
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 p-8 text-center md:flex-row md:items-start md:p-0 md:text-start">
          <div className="hidden md:block">
            <Link to={`/map/${mapData.rankedMap.id}`}>
              <h3 className="line-clamp-1 text-h4 font-bold hover:underline">
                {song.songName}
              </h3>
            </Link>
            <p className="mb-2 text-p font-normal text-secondary">
              by {song.songAuthorName} [{song.mapperName}]
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 text-right md:items-end">
            <div className="flex gap-2">
              <p className="badge">
                {songDuration}
                <FontAwesomeIcon icon={faHourglassStart} />
              </p>
              <p className="badge">
                {gameMode.name}
                <FontAwesomeIcon icon={faSkull} />
              </p>
              <p className="badge badge-secondary">
                {rating.acc}
                <Sparkles />
              </p>
              <p className="badge badge-secondary">
                {rating.difficulty}
                <FontAwesomeIcon icon={faStar} size="sm" />
              </p>
            </div>

            <div className="flex gap-2 md:mr-4">
              <p className="badge">
                {song.bpm}
                <Bpm />
              </p>
              <p className="badge">
                {difficulty.notesPerSecond.toFixed(2)}
                <img src="/assets/nps.png" height="16px" width="16px" />
              </p>
              <p className="badge">
                {difficulty.noteCount}
                <img src="/assets/note.png" height="16px" width="16px" />
              </p>
              <p className="badge">
                {difficulty.noteJumpSpeed}
                <img src="/assets/njs.png" height="16px" width="16px" />
              </p>
            </div>

            <div className="flex gap-2 md:mr-8">
              <Button
                className="btn-tritary"
                onClick={() =>
                  navigator.clipboard.writeText(`!bsr ${song.beatSaverKey}`)
                }
                icon={faTwitch}
              />
              <Button
                className="btn-tritary"
                onClick={() => {
                  if (!song.beatSaverKey) return;

                  arcViewer({
                    bsrCode: song.beatSaverKey,
                    difficulty: levelDifficulty,
                    mode: gameMode.name,
                  });
                }}
                icon={faPlay}
              />
              <Link
                to={`https://beatsaver.com/maps/${song.beatSaverKey}`}
                target="_blank"
              >
                <Button className="btn-tritary">
                  <BeatSaver />
                </Button>
              </Link>
              <Link to={`beatsaver://${song.beatSaverKey}`}>
                <Button className="btn-primary" icon={faCloudArrowDown} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
