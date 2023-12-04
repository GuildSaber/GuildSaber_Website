import useScreenSize from "../../hooks/useScreenSize";
import Button from "../Common/Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faHourglassStart,
  faPlay,
  faSkull,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import Sparkles from "../Icons/Sparkles";
import BeatSaver from "../Icons/BeatSaver";
import Bpm from "../Icons/Bpm";
import { MapAPIResponse } from "../../types/api";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { formatDifficulty, formatMinSec } from "../../utils/format";
import { useState } from "react";
import ArcViewer from "../../components/Common/ArcViewer/ArcViewer";

export default function MapHeader({ mapData }: { mapData: MapAPIResponse }) {
  const screenSize = useScreenSize();

  const {
    song,
    songDifficultyStats: difficulty,
    difficulty: levelDifficulty,
    gameMode,
  } = mapData.rankedMapVersions[0].songDifficulty;
  const [arcViewer, setArcViewer] = useState({
    isOpen: false,
    bsrCode: song.beatSaverKey,
    difficulty: levelDifficulty,
    mode: gameMode.name,
  });

  const rating = mapData.rating.default.stars;

  const songDuration = formatMinSec(song.duration);

  const description = "A map of the best place to play";

  return (
    <>
      {screenSize.width >= 768 && (
        <div className="group relative mb-8 flex w-full overflow-hidden rounded bg-gray-800 p-8 pr-[14rem]">
          <div
            className={clsx(
              "absolute right-0 top-0 h-[340px] w-[340px] -translate-y-[75px] translate-x-[150px] rotate-[20deg] transform overflow-hidden border-8 border-transparent outline outline-8",
              "outline-" + formatDifficulty[levelDifficulty],
              "lg:translate-x-[150px]",
            )}
          >
            <img
              className="h-[340px] w-[340px] translate-x-[-80px] transform object-cover transition-[filter,transform]"
              src={song.coverURL}
            />
          </div>
          <div className="flex w-full justify-between gap-4">
            <div>
              <Link to={`/map/${mapData.id}`}>
                <h3 className="line-clamp-1 text-h4 font-bold hover:underline">
                  {song.songName}
                </h3>
              </Link>
              <p className="mb-2 text-p font-normal text-secondary">
                by {song.songAuthorName} [{song.mapperName}]
              </p>

              <p className="line-clamp-2">{description}</p>
            </div>

            <div className="flex flex-col items-end justify-center gap-2 text-right">
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

              <div className="mr-4 flex gap-2">
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

              <div className="mr-8 flex gap-2">
                <Button
                  className="btn-tritary"
                  onClick={() =>
                    navigator.clipboard.writeText(`!bsr ${song.beatSaverKey}`)
                  }
                  icon={faTwitch}
                />
                <Button
                  className="btn-tritary"
                  onClick={() => setArcViewer({ ...arcViewer, isOpen: true })}
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
      )}
      {screenSize.width < 768 && (
        <div className="relative mb-8 block w-full overflow-hidden rounded bg-gray-800 text-center">
          <div className="h-24 w-full overflow-hidden border-b-8 border-primary">
            <img className="h-24 w-full object-cover" src={song.coverURL} />
          </div>
          <div className="flex w-full flex-col justify-between gap-4 p-8">
            <div>
              <Link to={`/map/${mapData.id}`}>
                <h3 className="line-clamp-1 text-h4 font-bold hover:underline">
                  {song.name}
                </h3>
              </Link>
              <p className="mb-2 text-p font-normal text-secondary">
                by {song.songAuthorName} [{song.mapperName}]
              </p>

              <p className="line-clamp-2">{description}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 text-right">
              <div className="flex flex-col justify-center gap-4">
                <div className="flex flex-wrap justify-center gap-2">
                  <p className="badge">
                    {songDuration}
                    <FontAwesomeIcon icon={faHourglassStart} />
                  </p>
                  <p className="badge">
                    {gameMode.name}
                    <FontAwesomeIcon icon={faSkull} />
                  </p>
                  <p className="badge badge-secondary">
                    20.93
                    <Sparkles />
                  </p>
                  <p className="badge badge-secondary">
                    27
                    <FontAwesomeIcon icon={faStar} size="sm" />
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <p className="badge">
                    {song.bpm}
                    <Bpm />
                  </p>
                  <p className="badge">
                    {difficulty.notesPerSecond}
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
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  className="btn-tritary"
                  onClick={() =>
                    navigator.clipboard.writeText(`!bsr ${song.beatSaverKey}`)
                  }
                  icon={faTwitch}
                />
                <Button
                  className="btn-tritary"
                  onClick={() => setArcViewer({ ...arcViewer, isOpen: true })}
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
      )}

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
