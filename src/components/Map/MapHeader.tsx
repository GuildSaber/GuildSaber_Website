import { Link } from "react-router-dom";
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

export default function MapHeader() {
  const screenSize = useScreenSize();

  const id = 1;
  const description = "A map of the best place to play";

  return (
    <>
      {screenSize.width >= 768 && (
        <div className="group relative mb-8 flex w-full overflow-hidden rounded bg-gray-800 p-8 pr-[14rem]">
          <div className="absolute right-0 top-0 h-[340px] w-[340px] -translate-y-[75px] translate-x-[150px] rotate-[20deg] transform overflow-hidden border-8 border-transparent outline outline-8 outline-expert-plus lg:translate-x-[150px]">
            <img
              className="h-[340px] w-[340px] translate-x-[-80px] transform object-cover transition-[filter,transform]"
              src={`https://eu.cdn.beatsaver.com/191cafd1d0d6ab46545a8bfcb904c5b6dab4b1f1.jpg`}
            />
          </div>
          <div className="flex w-full justify-between gap-4">
            <div>
              <h3 className="line-clamp-1 text-h4 font-bold">
                Powa Of Da Wildanes{" "}
              </h3>
              <p className="mb-2 text-p font-normal text-secondary">
                by Camellia [Rogdude]
              </p>

              <p className="line-clamp-2">{description}</p>
            </div>

            <div className="flex flex-col items-end justify-center gap-2 text-right">
              <div className="flex gap-2">
                <p className="badge">
                  1:05
                  <FontAwesomeIcon icon={faHourglassStart} />
                </p>
                <p className="badge">
                  Lawless
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

              <div className="mr-4 flex gap-2">
                <p className="badge">
                  194
                  <Bpm />
                </p>
                <p className="badge">
                  12.11
                  <img src="/assets/nps.png" height="16px" width="16px" />
                </p>
                <p className="badge">
                  767
                  <img src="/assets/note.png" height="16px" width="16px" />
                </p>
                <p className="badge">
                  20
                  <img src="/assets/njs.png" height="16px" width="16px" />
                </p>
              </div>

              <div className="mr-8 flex gap-2">
                <Button className="btn-tritary" icon={faTwitch} />
                <Button className="btn-tritary" icon={faPlay} />
                <Button className="btn-tritary" component={BeatSaver} />
                <Button className="btn-primary" icon={faCloudArrowDown} />
              </div>
            </div>
          </div>
        </div>
      )}
      {screenSize.width < 768 && (
        <div className="relative mb-8 block w-full overflow-hidden rounded bg-gray-800 text-center">
          <div className="h-24 w-full overflow-hidden border-b-8 border-primary">
            <img
              className="h-24 w-full object-cover"
              src={`https://eu.cdn.beatsaver.com/191cafd1d0d6ab46545a8bfcb904c5b6dab4b1f1.jpg`}
            />
          </div>
          <div className="flex w-full flex-col justify-between gap-4 p-8">
            <div>
              <h3 className="line-clamp-1 text-h4 font-bold">
                Powa Of Da Wildanes{" "}
              </h3>
              <p className="mb-2 text-p font-normal text-secondary">
                by Camellia [Rogdude]
              </p>

              <p className="line-clamp-2">{description}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 text-right">
              <div>
                <span className="badge badge-secondary">
                  27
                  <FontAwesomeIcon icon={faStar} size="sm" />
                </span>
                <span className="badge badge-secondary ml-2">
                  20.93
                  <Sparkles />
                </span>
              </div>
              <div className="flex gap-2">
                <Button className="btn-tritary" icon={faTwitch} />
                <Button className="btn-tritary" icon={faPlay} />
                <Button className="btn-tritary" component={BeatSaver} />
              </div>
              <div className="flex gap-2">
                <Link to={`/guild/${id}`}>
                  <Button className="btn-primary" text={"View"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
