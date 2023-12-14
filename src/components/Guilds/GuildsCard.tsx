import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../Common/Button/Button";
import useScreenSize from "../../hooks/useScreenSize";
import { GuildAPIResponse } from "../../types/api/guild";
import clsx from "clsx";
import { EJoinState } from "../../enums/guild";

const GUILD_STATES: { [key: string]: string } = {
  [EJoinState.None]: "None",
  [EJoinState.Requested]: "Requested",
  [EJoinState.Joined]: "Joined",
  [EJoinState.Refused]: "Refused",
  [EJoinState.Banned]: "Banned",
};

export default function Card({
  guildData,
  guildState,
  onJoin,
}: {
  guildData: GuildAPIResponse;
  guildState: number | undefined;
  onJoin: () => void;
}) {
  const { id, name, description, memberCount, rankedMapCount } = guildData;
  const screenSize = useScreenSize();

  return (
    <>
      {screenSize.width >= 768 && (
        <div className="relative flex overflow-hidden rounded bg-gray-800 p-8 pr-48">
          <div className="flex w-full justify-between gap-4">
            <div className="absolute right-0 top-0 h-80 w-80 -translate-y-[45px] translate-x-[140px] rotate-[20deg] transform overflow-hidden mix-blend-screen">
              <img
                className="h-80 w-80 -translate-x-16 transform"
                src={`https://cdn.guildsaber.com/Guild/${id}/Logo.jpg`}
              />
            </div>

            <div className="details" style={{ width: "100%" }}>
              <Link to={`/guild/${id}`}>
                <h3 className="mb-2 text-h4 font-bold hover:underline">
                  {name}
                </h3>
              </Link>

              <p className="line-clamp-3 text-muted">{description}</p>
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
              <Button
                className={clsx("btn-primary mr-8", {
                  "btn-tritary pointer-events-none": guildState,
                })}
                text={(guildState && GUILD_STATES[guildState]) || "Join"}
                onClick={() => !guildState && onJoin()}
              />
            </div>
          </div>
        </div>
      )}
      {screenSize.width < 768 && (
        <div className="relative block w-full overflow-hidden rounded bg-gray-800 text-center">
          <div className="h-24 w-full overflow-hidden mix-blend-screen">
            <img
              className="h-full w-full object-cover"
              src={`https://cdn.guildsaber.com/Guild/${id}/Logo.jpg`}
            />
          </div>
          <div className="flow-content-2 md:flow-content-4 p-4">
            <Link to={`/guild/${id}`}>
              <h3 className="mb-2 text-h4 font-bold hover:underline">{name}</h3>
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
            <p className="line-clamp-3 text-muted">{description}</p>
            <Button
              className={clsx("btn-primary mx-auto", {
                "btn-tritary pointer-events-none": guildState,
              })}
              text={(guildState && GUILD_STATES[guildState]) || "Join"}
              onClick={() => !guildState && onJoin()}
            />
          </div>
        </div>
      )}
    </>
  );
}
