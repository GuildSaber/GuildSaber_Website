import { useRef, useState } from "react";
import clsx from "clsx";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import useClickAway from "../../hooks/useClickAway";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function GuildMenu({ guilds }) {
  const [isOpen, setIsOpen] = useState(false);
  const clickRef = useRef();
  const navigate = useNavigate();

  const {
    session: { selectedGuild },
    dispatch,
  } = useAuthContext();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleGuildClick = (guildID) => () => {
    dispatch({
      type: "GUILD_SELECTED",
      payload: guildID ? parseInt(guildID) : null,
    });
    localStorage.setItem("selectedGuild", guildID ? parseInt(guildID) : null);
    setIsOpen(false);
  };

  useClickAway(clickRef, () => {
    setIsOpen(false);
  });

  // session.selectedGuild
  const { session } = useAuthContext();

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
          "flex items-stretch bg-gray-800 gap-2 h-full py-2 pl-3",
          { "rounded-t": isOpen, rounded: !isOpen },
        )}
      >
        {session && session.selectedGuild && (
          <>
            <img
              src={`https://cdn.guildsaber.com/Guild/${selectedGuild}/Logo.png`}
              className="w-8 h-8 rounded cursor-pointer opacity-80 active"
              alt="logo"
              onError={() => {
                dispatch({
                  type: "GUILD_SELECTED",
                  payload: null,
                });
                localStorage.setItem("selectedGuild", null);
              }}
              onClick={() => navigate(`/guild/${selectedGuild}`)}
            />
            <div className="self-stretch border-l border-muted m-1 opacity-50"></div>
          </>
        )}
        {session &&
          guilds &&
          guilds
            .filter((guild) => guild.id !== session.selectedGuild)
            .slice(0, 3)
            .map((guild) => (
              <img
                key={guild.id}
                src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.png`}
                className="w-8 h-8 rounded cursor-pointer opacity-80"
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
          "absolute w-full bg-gray-800 rounded-b flex flex-col pb-2 select-none",
          { hidden: !isOpen },
        )}
      >
        {guilds &&
          guilds.map((guild, key) => (
            <li
              key={key}
              className="flex gap-4 px-3 py-2 items-center cursor-pointer hover:bg-gray-700"
              onClick={handleGuildClick(guild.id)}
            >
              <img
                src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.png`}
                className="w-8 h-8 rounded opacity-80"
                alt="logo"
              />
              <span className="line-clamp-1">{guild.name}</span>
            </li>
          ))}

        <li className="flex gap-4 px-3 py-2 items-center cursor-pointer text-muted hover:bg-gray-700">
          <div className="w-8 h-8 rounded opacity-80 flex-center">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <span>Create guild</span>
        </li>
        <li>
          <Link
            to="/guilds"
            className="flex gap-4 px-3 py-2 items-center cursor-pointer text-muted hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-8 h-8 rounded opacity-80 flex-center">
              <FontAwesomeIcon icon={faBars} />
            </div>
            <span>Discover Guilds</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
