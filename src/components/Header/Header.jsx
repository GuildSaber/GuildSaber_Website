import "./Header.scss";
import GuildMenu from "./GuildMenu";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import useClickAway from "../../hooks/useClickAway";
import clsx from "clsx";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { session } = useAuthContext();
    const [extended, setExtended] = useState(false);
    const screenSize = useScreenSize();
    const clickRef = useRef();

    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    useClickAway(clickRef, () => {
        setExtended(false);
    });

    return (
        <header
            className={clsx({
                header: true,
                scrolled: isScrolled,
            })}
            ref={clickRef}
        >
            <div className={clsx({ content: true, extended: extended })}>
                <Link className="logo" to="/">
                    <img src="/gsLogo.svg" alt="logo" />
                    <p>GuildSaber</p>
                </Link>
                <nav>
                    <FontAwesomeIcon
                        className="burger"
                        size="lg"
                        icon={extended ? faXmark : faBars}
                        onClick={() => setExtended(!extended)}
                    />
                    {session && (
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
                                        <Link
                                            to="/guilds"
                                            className="common-text link"
                                        >
                                            Guilds
                                        </Link>
                                    </>
                                )}

                            <GuildMenu
                                guilds={session.memberList
                                    .sort((a, b) => a.priority - b.priority)
                                    .map((memberList) => memberList.guild)
                                    .flat()}
                            />
                            <img
                                alt="avatar"
                                className="avatar"
                                src={session.player.user_AvatarUrl}
                            />
                        </>
                    )}
                    {!session && (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Link to="/guilds" className="common-text link">
                                Guilds
                            </Link>
                            <Link
                                to="/signin"
                                className="common-text common-button"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </nav>
                {extended &&
                    session &&
                    session.selectedGuild &&
                    screenSize.width < 700 && (
                        <>
                            <Link to="/leaderboards" className="link">
                                Leaderboards
                            </Link>
                            <Link to="/maps" className="link">
                                Maps
                            </Link>
                        </>
                    )}
            </div>
        </header>
    );
}
