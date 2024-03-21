import { useAuthContext } from "@/hooks/useAuthContext";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GuildMenu from "./GuildMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { session } = useAuthContext();
  const [extended, setExtended] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  return (
    <header
      className={clsx(
        "sticky left-0 right-0 top-0 z-10 mb-4 transition-colors",
        {
          "bg-[#0d0e0f]": isScrolled,
        },
      )}
    >
      <div className="container mx-auto flex items-stretch justify-between px-2 py-4 transition-all md:px-4 lg:px-8">
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
                  <Link to="/leaderboards" className="btn text-p">
                    Leaderboards
                  </Link>
                  {session.memberList && session.memberList.length === 0 && (
                    <Link to="/guilds" className="btn text-p">
                      Guilds
                    </Link>
                  )}
                </div>
              )}
              {session.memberList && session.memberList.length === 0 ? (
                <div className="flex gap-4">
                  <Link to="/guilds" className="btn text-p">
                    Discover Guilds
                  </Link>
                </div>
              ) : (
                <GuildMenu
                  guilds={
                    session.memberList
                      ?.sort((a, b) => a.priority - b.priority)
                      ?.map((memberList) => memberList.guild)
                      ?.flat() ?? []
                  }
                />
              )}
              <Link to={`/player/${session.player?.userID}`}>
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
              </Link>
            </>
          )}
          {!session && (
            <div className="flex gap-4">
              <Link to="/guilds" className="btn text-p">
                Guilds
              </Link>
              <Link to="/signin" className="btn text-p">
                Login
              </Link>
            </div>
          )}
        </nav>
        <div
          className={clsx("fixed inset-0 min-h-screen bg-gray-900", {
            hidden: !extended,
          })}
        >
          <div className="px-2 py-4">
            <FontAwesomeIcon
              className="cursor-pointer p-4"
              size="lg"
              icon={faXmark}
              onClick={() => setExtended(false)}
            />
            <div className="flex-center flex-col gap-8 text-h5 sm:hidden">
              {extended && session && session.selectedGuild && (
                <>
                  <Link to="/leaderboards">Leaderboards</Link>
                  <Link to="/guilds">Guilds</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
