import "./Header.scss";
import GuildMenu from "./GuildMenu";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import clsx from "clsx";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { session } = useAuthContext();
    const [extended, setExtended] = useState(false);
    const screenSize = useScreenSize();

    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <header
            className={clsx({
                Header: true,
                scrolled: isScrolled,
            })}
        >
            <div className={clsx({ content: true, extended: extended })}>
                <Link className="logo" to="/">
                    <img src="gsLogo.svg" alt="logo" />
                    <p>GuildSaber</p>
                </Link>
                <nav>
                    <FontAwesomeIcon
                        className="burger"
                        size="lg"
                        icon={faBars}
                        onClick={() => setExtended(!extended)}
                    />
                    {!session ? (
                        <Link to="/guilds" className="common-text link">
                            Guilds
                        </Link>
                    ) : (
                        <>
                            {session.selectedGuild &&
                                screenSize.width > 700 && (
                                    <>
                                        <Link
                                            to="/leaderboards"
                                            className="common-text link"
                                        >
                                            Leaderboards
                                        </Link>
                                        <Link
                                            to="/maps"
                                            className="common-text link"
                                        >
                                            Maps
                                        </Link>
                                    </>
                                )}
                            {session.selectedGuild && (
                                <GuildMenu
                                    guilds={session.memberList
                                        .sort((a, b) => a.priority - b.priority)
                                        .map((memberList) => memberList.guild)
                                        .flat()}
                                />
                            )}
                            <img
                                alt="avatar"
                                className="avatar"
                                src={session.player.user_AvatarUrl}
                            />
                        </>
                    )}
                    {!session && (
                        <Link
                            to="/signin"
                            className="common-text common-button"
                        >
                            Login
                        </Link>
                    )}
                </nav>
                {extended && screenSize.width < 700 && (
                    <>
                        <Link to="/leaderboards" className="common-text link">
                            Leaderboards
                        </Link>
                        <Link to="/maps" className="common-text link">
                            Maps
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
