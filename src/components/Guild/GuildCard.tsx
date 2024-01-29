import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../Common/Button";
import clsx from "clsx";
import { GUILD_CARD_STATES } from "@/constants";
import { Guild } from "@/types/api/models/guild";

type GuildCardProps = {
  guildData: Guild;
  guildState: number | undefined;
  onJoin: () => void;
};

export default function GuildCard({
  guildData,
  guildState,
  onJoin,
}: GuildCardProps) {
  const { id, name, description, memberCount, rankedMapCount } = guildData;

  return (
    <div className="group relative flex w-full flex-col gap-2 overflow-hidden rounded bg-gray-800 md:flex-row md:pr-48">
      <div className="block h-24 w-full overflow-hidden mix-blend-screen md:absolute md:right-0 md:top-0 md:h-80 md:w-80 md:-translate-y-[45px] md:translate-x-[140px] md:rotate-[20deg] md:transform md:overflow-hidden">
        <img
          className="h-24 w-full object-cover transition-[filter,transform] md:h-80 md:w-80 md:-translate-x-16 md:transform"
          src={`https://cdn.guildsaber.com/Guild/${id}/Logo.jpg`}
        />
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-4 p-4 text-center md:flex-row md:items-start md:p-8 md:text-start">
        <div className="w-full">
          <Link to={`/guild/${id}`}>
            <h3 className="mb-2 text-h4 font-bold hover:underline">{name}</h3>
          </Link>
          <div className="flex !justify-center gap-2 md:hidden">
            <span className="badge">
              {memberCount}
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="badge md:mr-4">
              {rankedMapCount}
              <FontAwesomeIcon icon={faLayerGroup} />
            </span>
          </div>
          <p className="line-clamp-3 text-muted">{description}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-right md:flex-col md:items-end">
          <div className="hidden md:contents">
            <span className="badge">
              {memberCount}
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="badge md:mr-4">
              {rankedMapCount}
              <FontAwesomeIcon icon={faLayerGroup} />
            </span>
          </div>
          <Button
            className={clsx("btn-primary md:mx-auto md:mr-8", {
              "btn-tritary pointer-events-none": guildState,
            })}
            text={(guildState && GUILD_CARD_STATES[guildState]) || "Join"}
            onClick={() => !guildState && onJoin()}
          />
        </div>
      </div>
    </div>
  );
}
