import { useRef, useState } from "react";
import clsx from "clsx";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import useClickAway from "../../hooks/useClickAway";
import { useAuthContext } from "../../hooks/useAuthContext";
import { GuildAPIResponse } from "../../types/api/guild";

const MAX_GUILD_NAME_LENGTH = 16;
const MAX_VISIBLE_GUILD_COUNT = 3;
const MAX_COLLAPSED_GUILD_COUNT = 5;

export default function GuildMenu({ guilds }: { guilds: GuildAPIResponse[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const clickRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { session, dispatch } = useAuthContext();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleGuildClick = (guildID: number) => () => {
    dispatch({
      type: "GUILD_SELECTED",
      payload: guildID.toString(),
    });
    localStorage.setItem("selectedGuild", guildID.toString());
    setIsOpen(false);
  };

  useClickAway(clickRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      ref={clickRef}
      className={clsx("relative select-none", {
        guildMenu: true,
        open: isOpen,
      })}
    >
      <div
        className={clsx(
          "flex h-full items-stretch gap-2 bg-gray-800 py-2 pl-3",
          {
            "rounded-t outline outline-1 outline-gray-700": isOpen,
            rounded: !isOpen,
          },
        )}
      >
        {session && session.selectedGuild && (
          <>
            <img
              src={`https://cdn.guildsaber.com/Guild/${session.selectedGuild}/Logo.jpg`}
              className="active h-8 w-8 cursor-pointer rounded opacity-80"
              alt="logo"
              onError={() => {
                dispatch({
                  type: "GUILD_SELECTED",
                  payload: "null",
                });
                localStorage.setItem("selectedGuild", "null");
              }}
              onClick={() => navigate(`/guild/${session.selectedGuild}`)}
            />
            <div className="m-1 self-stretch border-l border-muted opacity-50"></div>
          </>
        )}
        {session &&
          guilds &&
          guilds
            /*.filter(
              (guild) =>
                session.selectedGuild == null ||
                guild.id.toString() !== session.selectedGuild,
            )*/
            .slice(0, MAX_VISIBLE_GUILD_COUNT)
            .map((guild) => (
              <img
                key={guild.id}
                src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.jpg`}
                className="h-8 w-8 cursor-pointer rounded opacity-80"
                alt="guild logo"
                onClick={handleGuildClick(guild.id)}
              />
            ))}
        <button
          onClick={handleToggle}
          className="flex-center text-muted hover:text-white"
        >
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            size="sm"
            className="pl-2 pr-3"
          />
        </button>
      </div>

      <ul
        className={clsx(
          "absolute right-0 flex w-full min-w-[180px] select-none flex-col rounded-b bg-gray-800 pb-2 outline outline-1 outline-gray-700",
          { hidden: !isOpen },
        )}
      >
        {guilds &&
          guilds
            .slice(
              MAX_VISIBLE_GUILD_COUNT,
              MAX_VISIBLE_GUILD_COUNT + MAX_COLLAPSED_GUILD_COUNT,
            )
            .map((guild, key) => (
              <li
                key={key}
                className="flex cursor-pointer items-center gap-4 px-3 py-2 hover:bg-gray-700"
                onClick={handleGuildClick(guild.id)}
              >
                <img
                  src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.jpg`}
                  className="h-8 w-8 rounded opacity-80"
                  alt="logo"
                />
                <span className="line-clamp-1">
                  {guild.name.length <= MAX_GUILD_NAME_LENGTH
                    ? guild.name
                    : guild.smallName}
                </span>
              </li>
            ))}

        <li className="flex cursor-pointer items-center gap-4 px-3 py-2 text-muted hover:bg-gray-700">
          <div className="flex-center h-8 w-8 rounded opacity-80">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <span>Create guild</span>
        </li>
        <li>
          <Link
            to="/guilds"
            className="flex cursor-pointer items-center gap-4 px-3 py-2 text-muted hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex-center h-8 w-8 rounded opacity-80">
              <FontAwesomeIcon icon={faBars} />
            </div>
            <span>Discover Guilds</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
