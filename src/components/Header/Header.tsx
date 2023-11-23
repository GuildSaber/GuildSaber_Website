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
    <header className="container sticky left-0 right-0 top-0 z-10">
      <div className="mx-auto flex items-stretch justify-between py-8 transition-all">
        <nav className="flex w-full items-center justify-between gap-4">
          <Link className="hidden flex-1 items-center gap-4 sm:flex" to="/">
            <img src="/gsLogo.svg" alt="logo" width={32} height={32} />
            <span className="hidden text-h5 font-bold md:inline">
              GuildSaber
            </span>
          </Link>
          <FontAwesomeIcon
            className="cursor-pointer p-4 sm:hidden"
            size="lg"
            icon={extended ? faXmark : faBars}
            onClick={() => setExtended(!extended)}
          />
          {session && (
            <>
              {session.selectedGuild && (
                <div className="hidden gap-4 sm:flex">
                  <Link to="/leaderboards">Leaderboards</Link>
                  <Link to="/maps">Maps</Link>
                  {session.memberList && session.memberList.length === 0 && (
                    <Link to="/guilds">Guilds</Link>
                  )}
                </div>
              )}

              <GuildMenu
                guilds={
                  session.memberList
                    ?.sort((a, b) => a.priority - b.priority)
                    ?.map((memberList) => memberList.guild)
                    ?.flat() ?? []
                }
              />
              <img
                alt="avatar"
                className="rounded-full"
                src={
                  session.player?.user_AvatarUrl ??
                  "https://api.minimalavatars.com/avatar/random/png"
                }
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
                className="cursor-pointer px-6 py-12"
                size="lg"
                icon={faXmark}
                onClick={() => setExtended(false)}
              />
              <div className="flex-center flex-col gap-8 text-h5 sm:hidden">
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
