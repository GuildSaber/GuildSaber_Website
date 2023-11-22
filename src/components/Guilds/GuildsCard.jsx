import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../Common/Button/Button";
import useScreenSize from "../../hooks/useScreenSize";

export default function Card({ guildData }) {
  // eslint-disable-next-line no-unused-vars
  const { id, name, description, color, type, memberCount, rankedMapCount } =
    guildData;
  const screenSize = useScreenSize();

  return (
    <>
      {screenSize.width >= 768 && (
        <div className="relative flex p-8 bg-gray-800 rounded overflow-hidden pr-48">
          <div className="flex justify-between w-full gap-4">
            <div className="absolute top-0 right-0 w-80 h-80 transform rotate-[20deg] translate-x-[140px] -translate-y-[45px] overflow-hidden mix-blend-screen">
              <img
                className="w-80 h-80 transform -translate-x-16"
                src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
              />
            </div>

            <div className="details" style={{ width: "100%" }}>
              <Link to={`/guild/${id}`}>
                <h3 className="text-h4 font-bold mb-2">{name}</h3>
              </Link>

              <p className="text-muted line-clamp-3">{description}</p>
            </div>

            <div className="flex flex-col items-end justify-center gap-2 text-right">
              <p className="badge">
                {memberCount}
                <FontAwesomeIcon icon={faUser} />
              </p>
              <p className="badge mr-4">
                {rankedMapCount}
                <FontAwesomeIcon icon={faLayerGroup} />
              </p>
              <Button className="btn-primary mr-8" text="Join" />
            </div>
          </div>
        </div>
      )}
      {screenSize.width < 768 && (
        <div className="relative block bg-gray-800 rounded overflow-hidden w-full text-center">
          <div className="w-full h-24 overflow-hidden mix-blend-screen">
            <img
              className="w-full h-full object-cover"
              src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
            />
          </div>
          <div className="flow-content-2 md:flow-content-4 p-4">
            <Link to={`/guild/${id}`}>
              <h3 className="text-h4 font-bold mb-2">{name}</h3>
            </Link>
            <div className="w-100">
              <span className="badge">
                {memberCount}
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span className="badge ml-2">
                {rankedMapCount}
                <FontAwesomeIcon icon={faLayerGroup} />
              </span>
            </div>
            <p className="text-muted line-clamp-3">{description}</p>
            <Button className="btn-primary mx-auto" text="Join" />
          </div>
        </div>
      )}
    </>
  );
}
