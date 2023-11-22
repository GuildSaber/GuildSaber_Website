import GuildMenu from "./GuildMenu";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import clsx from "clsx";

export default function Header() {
  const { session } = useAuthContext();
  const [extended, setExtended] = useState(false);

  return (
    <header className="container sticky top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-stretch mx-auto py-8 transition-all">
        <nav className="flex items-center justify-between gap-4 w-full">
          <Link className="hidden sm:flex flex-1 items-center gap-4" to="/">
            <img src="/gsLogo.svg" alt="logo" width={32} height={32} />
            <span className="text-h5 font-bold hidden md:inline">
              GuildSaber
            </span>
          </Link>
          <FontAwesomeIcon
            className="sm:hidden p-4 cursor-pointer"
            size="lg"
            icon={extended ? faXmark : faBars}
            onClick={() => setExtended(!extended)}
          />
          {session && (
            <>
              {session.selectedGuild && (
                <div className="gap-4 hidden sm:flex">
                  <Link to="/leaderboards">Leaderboards</Link>
                  <Link to="/maps">Maps</Link>
                  {session.memberList.length === 0 && (
                    <Link to="/guilds">Guilds</Link>
                  )}
                </div>
              )}

              <GuildMenu
                guilds={session.memberList
                  .sort((a, b) => a.priority - b.priority)
                  .map((memberList) => memberList.guild)
                  .flat()}
              />
              <img
                alt="avatar"
                className="rounded-full"
                src={session.player.user_AvatarUrl}
                width={40}
                height={40}
              />
            </>
          )}
          {!session && (
            <div className="flex gap-4">
              <Link to="/guilds">Guilds</Link>
              <Link to="/signin">Login</Link>
            </div>
          )}
        </nav>
        <div
          className={clsx("fixed inset-0 min-h-screen bg-gray-900", {
            hidden: !extended,
          })}
        >
          {extended && session && session.selectedGuild && (
            <div>
              <FontAwesomeIcon
                className="cursor-pointer py-12 px-6"
                size="lg"
                icon={faXmark}
                onClick={() => setExtended(false)}
              />
              <div className="sm:hidden flex-center flex-col text-h5 gap-8">
                <Link to="/me">My Profile</Link>
                <Link to="/leaderboards">Leaderboards</Link>
                <Link to="/maps">Maps</Link>
                <Link to="/guilds">Guilds</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
