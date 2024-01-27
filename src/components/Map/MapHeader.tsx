import Button from "@/components/Common/Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faHourglassStart,
  faPlay,
  faSkull,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import Sparkles from "@/components/Icons/Sparkles";
import BeatSaver from "@/components/Icons/BeatSaver";
import Bpm from "@/components/Icons/Bpm";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { formatDifficulty, formatMinSec } from "@/utils/format";
import { MapData } from "@/types/api/models/rankedMap";

type arcViewer = {
  bsrCode: string;
  difficulty: number;
  mode: string;
};

export default function MapHeader({
  mapData,
  arcViewer,
}: {
  mapData: MapData;
  arcViewer: (arg0: arcViewer) => void;
}) {
  const {
    song,
    songDifficultyStats: difficulty,
    difficulty: levelDifficulty,
    gameMode,
  } = mapData.rankedMap.rankedMapVersions[0]?.songDifficulty;

  const rating = mapData.rankedMap.rating.default.stars;
  const songDuration = formatMinSec(song.duration);
  const description = "A map of the best place to play";

  return (
    <>
      <div className="group relative flex w-full flex-col gap-2 overflow-hidden rounded bg-gray-800 md:flex-row md:p-8 md:pr-[14rem]">
        <div
          className={clsx(
            "block h-24 w-full overflow-hidden border-b-8 border-primary md:absolute md:right-0 md:top-0 md:h-[340px] md:w-[340px] md:-translate-y-[75px] md:translate-x-[150px] md:rotate-[20deg] md:transform md:overflow-hidden md:border-8 md:border-transparent md:outline md:outline-8",
            "outline-" + formatDifficulty[levelDifficulty],
            "lg:translate-x-[150px]",
          )}
        >
          <img
            className="h-24 w-full object-cover transition-[filter,transform] md:h-[340px] md:w-[340px] md:translate-x-[-80px] md:transform"
            src={song.coverURL}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 p-8 text-center md:flex-row md:items-start md:p-0 md:text-start">
          <div>
            <Link to={`/map/${mapData.rankedMap.id}`}>
              <h3 className="line-clamp-1 text-h4 font-bold hover:underline">
                {song.songName}
              </h3>
            </Link>
            <p className="mb-2 text-p font-normal text-secondary">
              by {song.songAuthorName} [{song.mapperName}]
            </p>

            <p className="line-clamp-2">{description}</p>
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
                <Button className="btn-tritary" component={BeatSaver} />
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
