import { Link } from "react-router-dom";
import useScreenSize from "@/hooks/useScreenSize";
import Button from "@/components/Common/Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import Sparkles from "@/components/Icons/Sparkles";
import BeatSaver from "@/components/Icons/BeatSaver";

export default function GuildMapCard({
  description,
  id,
}: {
  description: string;
  id: number;
}) {
  const screenSize = useScreenSize();
  return (
    <>
      {screenSize.width >= 768 && (
        <Link
          to={`/guild/${id}`}
          className="group relative flex w-full cursor-pointer overflow-hidden rounded bg-gray-800 p-8 pr-[14rem]"
        >
          <div className="absolute right-0 top-0 h-[340px] w-[340px] -translate-y-[75px] translate-x-[150px] rotate-[20deg] transform overflow-hidden border-8 border-transparent outline outline-8 outline-primary lg:translate-x-[150px]">
            <img
              className="h-[340px] w-[340px] translate-x-[-80px] transform object-cover grayscale filter transition-[filter,transform] group-hover:scale-105 group-hover:grayscale-0"
              src={`https://eu.cdn.beatsaver.com/191cafd1d0d6ab46545a8bfcb904c5b6dab4b1f1.jpg`}
            />
          </div>
          <div className="flex w-full justify-between gap-4">
            <div>
              <h3 className="line-clamp-1 text-h5 font-bold">
                Powa Of Da Wildanes{" "}
              </h3>
              <p className="mb-2 text-p font-normal text-secondary">
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
              <div className="mr-8 flex gap-2">
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
        <div className="relative block w-full overflow-hidden rounded bg-gray-800 text-center">
          <div className="h-24 w-full overflow-hidden border-b-8 border-primary">
            <img
              className="h-24 w-full object-cover"
              src={`https://eu.cdn.beatsaver.com/191cafd1d0d6ab46545a8bfcb904c5b6dab4b1f1.jpg`}
            />
          </div>
          <div className="flex w-full flex-col justify-between gap-4 p-8">
            <div>
              <h3 className="line-clamp-1 text-h5 font-bold">
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
