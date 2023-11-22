import { decimalToHex } from "../../utils/color";
import Button from "../Common/Button/Button";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faUser } from "@fortawesome/free-solid-svg-icons";

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
}) {
  const handleDiscordInvite = () => {
    window.open(`https://discord.gg/${inviteCode}`, "_blank");
  };

  return (
    <div className="relative bg-gray-800 mb-8 rounded p-8 overflow-hidden md:text-left text-center">
      <object
        className="absolute top-0 left-0 w-full h-32 mb-4 object-cover"
        data={`https://cdn.guildsaber.com/Guild/${id}/Banner.png`}
        type="image/png"
      >
        <img
          src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
          className="w-full h-32 object-cover"
        />
      </object>

      <div className="flex items-end justify-between gap-4 relative pt-8 mb-4">
        <span className="badge md:hidden">
          {memberCount} <FontAwesomeIcon icon={faUser} />
        </span>
        <img
          className="w-32 h-32 rounded border-[6px] border-gray-800"
          src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
        />

        <span className="badge md:hidden ml-2">
          {rankedMapCount}
          <FontAwesomeIcon icon={faLayerGroup} />
        </span>
        <div className="hidden items-center gap-2 w-full transform translate-y-2 md:flex">
          <h1 className="flex-1 text-h3 font-bold line-clamp-1 hidden lg:block">
            {name}
          </h1>

          {inviteCode && (
            <Button
              text="Discord"
              icon={faDiscord}
              className="ml-auto bg-discord"
              onClick={handleDiscordInvite}
            />
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
            className="font-bold text-h2 hidden md:block"
            style={{ color: `#${decimalToHex(color)}` }}
          >
            {smallName}
          </span>
        </div>
      </div>
      <h1 className="flex-1 text-h3 font-bold line-clamp-1 mb-2 lg:hidden">
        {name}
      </h1>
      <p>{description}</p>
      {inviteCode && (
        <Button
          text="Discord"
          icon={faDiscord}
          className="bg-discord inline-block mt-4 md:hidden"
          onClick={handleDiscordInvite}
        />
      )}
    </div>
  );
}
