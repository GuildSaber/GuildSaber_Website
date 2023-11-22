import { Link } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import Button from "../Common/Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import Sparkles from "../Icons/Sparkles";
import BeatSaver from "../Icons/BeatSaver";

export default function GuildMapCard({ description, id }) {
  const screenSize = useScreenSize();
  return (
    <>
      {screenSize.width >= 768 && (
        <Link
          to={`/guild/${id}`}
          href={`#`}
          className="group relative flex p-8 bg-gray-800 rounded overflow-hidden w-full cursor-pointer pr-[14rem]"
        >
          <div className="absolute top-0 right-0 w-[340px] h-[340px] transform rotate-[20deg] translate-x-[150px] lg:translate-x-[150px] -translate-y-[75px] border-8 border-transparent outline outline-8 outline-primary overflow-hidden">
            <img
              className="w-[340px] h-[340px] group-hover:scale-105 object-cover transform translate-x-[-80px] filter grayscale group-hover:grayscale-0 transition-[filter,transform]"
              src={`https://eu.cdn.beatsaver.com/191cafd1d0d6ab46545a8bfcb904c5b6dab4b1f1.jpg`}
            />
          </div>
          <div className="flex gap-4 justify-between w-full">
            <div>
              <h3 className="text-h5 font-bold line-clamp-1">
                Powa Of Da Wildanes{" "}
              </h3>
              <p className="text-secondary text-p font-normal mb-2">
                by Camellia [Rogdude]
              </p>

              <p className="line-clamp-2">{description}</p>
            </div>

            <div className="flex flex-col items-end justify-center gap-2 text-right">
              <p className="badge badge-secondary">
                27
                <FontAwesomeIcon icon={faStar} size="sm" />
              </p>
              <p className="badge badge-secondary mr-4">
                20.93
                <Sparkles />
              </p>
              <div className="flex gap-2 mr-8">
                <Button className="btn-tritary" icon={faTwitch} />
                <Button className="btn-tritary" icon={faPlay} />
                <Button className="btn-tritary" component={BeatSaver} />
                <Button className="btn-primary" icon={faCloudArrowDown} />
              </div>
            </div>
          </div>
        </Link>
      )}
      {screenSize.width < 768 && (
        <div className="relative block bg-gray-800 rounded overflow-hidden w-full text-center">
          <div className="w-full h-24 border-b-8 border-primary overflow-hidden">
            <img
              className="w-full h-24 object-cover"
              src={`https://eu.cdn.beatsaver.com/191cafd1d0d6ab46545a8bfcb904c5b6dab4b1f1.jpg`}
            />
          </div>
          <div className="flex flex-col gap-4 p-8 justify-between w-full">
            <div>
              <h3 className="text-h5 font-bold line-clamp-1">
                Powa Of Da Wildanes{" "}
              </h3>
              <p className="text-secondary text-p font-normal mb-2">
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
