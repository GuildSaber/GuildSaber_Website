import { decimalToHex } from "../../utils/color";
import Button from "../Common/Button/Button";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faUser } from "@fortawesome/free-solid-svg-icons";
import { GuildAPIResponse } from "../../types/api";
import { Link } from "react-router-dom";

export default function GuildHeader({
  guildData: {
    id,
    name,
    smallName,
    color,
    description,
    rankedMapCount,
    memberCount,
    inviteCode,
  },
}: {
  guildData: GuildAPIResponse;
}) {
  return (
    <div className="relative mb-8 overflow-hidden rounded bg-gray-800 p-8 text-center md:text-left">
      <object
        className="absolute left-0 top-0 mb-4 h-32 w-full object-cover"
        data={`https://cdn.guildsaber.com/Guild/${id}/Banner.jpg`}
        type="image/jpeg"
      >
        <img
          src={`https://cdn.guildsaber.com/Guild/${id}/Logo.jpg`}
          className="h-32 w-full object-cover"
        />
      </object>

      <div className="relative mb-4 flex items-end justify-between gap-4 pt-8">
        <span className="badge w-20 text-left md:hidden">
          {memberCount} <FontAwesomeIcon icon={faUser} />
        </span>
        <img
          className="h-32 w-32 rounded border-[6px] border-gray-800"
          src={`https://cdn.guildsaber.com/Guild/${id}/Logo.jpg`}
        />

        <span className="badge w-20 text-right md:hidden">
          {rankedMapCount}
          <FontAwesomeIcon icon={faLayerGroup} />
        </span>
        <div className="hidden w-full translate-y-2 transform items-center gap-2 md:flex">
          <h1 className="line-clamp-1 hidden flex-1 text-h3 font-bold lg:block">
            {name}
          </h1>

          {inviteCode && (
            <Link to={`https://discord.gg/${inviteCode}`} target="_blank">
              <Button
                text="Discord"
                icon={faDiscord}
                className="ml-auto bg-discord"
              />
            </Link>
          )}

          <div>
            <p className="badge">
              {memberCount} <FontAwesomeIcon icon={faUser} />
            </p>
            <p className="badge ml-2">
              {rankedMapCount}
              <FontAwesomeIcon icon={faLayerGroup} />
            </p>
          </div>
          <span
            className="hidden text-h2 font-bold md:block"
            style={{ color: `#${decimalToHex(color)}` }}
          >
            {smallName}
          </span>
        </div>
      </div>
      <h1 className="mb-2 line-clamp-1 flex-1 text-h3 font-bold lg:hidden">
        {name}
      </h1>
      <p>{description}</p>
      {inviteCode && (
        <Link to={`https://discord.gg/${inviteCode}`} target="_blank">
          <Button
            text="Discord"
            icon={faDiscord}
            className="mt-4 bg-discord md:hidden"
          />
        </Link>
      )}
    </div>
  );
}
