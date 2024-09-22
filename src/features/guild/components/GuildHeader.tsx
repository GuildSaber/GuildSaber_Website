import Button from "@/components/Button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Guild } from "@/types/api/models/guild";
import { decimalToHex } from "@/utils/color";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faLayerGroup, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useJoinGuild from "../hooks/useJoinGuild";
import { GUILD_JOIN_STATES } from "../utils/constants";

type GuildHeaderProps = {
  guild: Guild;
};

const GuildHeader = ({ guild }: GuildHeaderProps) => {
  const { session } = useAuthContext();

  const { mutate: joinGuild } = useJoinGuild(["guilds", guild.id]);
  const tryJoin = () => {
    if (!session?.token) {
      toast.error("You need to be logged in to join");
      return;
    }

    joinGuild(guild.id);
  };

  const joinState = session?.memberList?.find(
    (g) => guild.id === g.guildID,
  )?.state;
  return (
    <div className="relative mb-8 overflow-hidden rounded bg-gray-800 px-8 pb-4 pt-8 text-center md:text-left">
      <object
        className="absolute left-0 top-0 mb-4 h-32 w-full object-cover"
        data={`https://cdn.guildsaber.com/Guild/${guild.id}/Banner.jpg`}
        type="image/jpeg"
      >
        <img
          src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.jpg`}
          className="h-32 w-full object-cover"
        />
      </object>

      <div className="relative mb-4 flex items-end justify-between gap-4 pt-8">
        <span className="badge w-20 text-left md:hidden">
          {guild.memberCount} <FontAwesomeIcon icon={faUser} />
        </span>
        <img
          className="h-32 w-32 rounded border-[6px] border-gray-800"
          src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.jpg`}
        />

        <span className="badge w-20 text-right md:hidden">
          {guild.rankedMapCount}
          <FontAwesomeIcon icon={faLayerGroup} />
        </span>
        <div className="hidden w-full translate-y-2 transform items-center gap-2 md:flex">
          <h1 className="line-clamp-1 hidden flex-1 text-h3 font-bold lg:block">
            {guild.name}
          </h1>

          {guild.inviteCode && (
            <Link to={`https://discord.gg/${guild.inviteCode}`} target="_blank">
              <Button
                text="Discord"
                icon={faDiscord}
                className="ml-auto bg-discord"
              />
            </Link>
          )}

          <div>
            <p className="badge">
              {guild.memberCount} <FontAwesomeIcon icon={faUser} />
            </p>
            <p className="badge ml-2">
              {guild.rankedMapCount}
              <FontAwesomeIcon icon={faLayerGroup} />
            </p>
          </div>
          <span
            className="hidden text-h2 font-bold md:block"
            style={{ color: decimalToHex(guild.color) }}
          >
            {guild.smallName}
          </span>
        </div>
      </div>
      <h1 className="mb-2 line-clamp-2 flex-1 text-h3 font-bold lg:hidden">
        {guild.name}
      </h1>
      <p>{guild.description}</p>

      <div className="mt-4 flex justify-center gap-3 md:justify-end">
        {guild.inviteCode && (
          <Link to={`https://discord.gg/${guild.inviteCode}`}>
            <Button
              text="Discord"
              icon={faDiscord}
              className="btn-discord ml-auto"
            />
          </Link>
        )}
        <Button
          className={clsx("btn-primary", {
            "btn-tritary pointer-events-none": joinState,
          })}
          text={(joinState && GUILD_JOIN_STATES[joinState]) || "Join"}
          onClick={() => !joinState && tryJoin()}
        />
      </div>
    </div>
  );
};

export default GuildHeader;
