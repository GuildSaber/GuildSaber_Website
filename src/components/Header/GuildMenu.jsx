import { useRef, useState } from "react";
import clsx from "clsx";
import "./GuildMenu.scss";
import arrow from "../../assets/arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import useClickAway from "../../hooks/useClickAway";
import { useAuthContext } from "../../hooks/useAuthContext";

const MAX_GUILD_NAME_LENGTH = 16;

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
        localStorage.setItem(
            "selectedGuild",
            guildID ? parseInt(guildID) : null
        );
        setIsOpen(false);
    };

    useClickAway(clickRef, () => {
        setIsOpen(false);
    });

    // session.selectedGuild
    const { session } = useAuthContext();

    return (
        <div ref={clickRef} className={clsx({ guildMenu: true, open: isOpen })}>
            <div className="head">
                {session && session.selectedGuild && (
                    <>
                        <img
                            src={`https://cdn.guildsaber.com/Guild/${selectedGuild}/Logo.png`}
                            className="icon active"
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
                        <div className="separator"></div>
                    </>
                )}
                {guilds &&
                    guilds
                        .slice(0, 3)
                        .map((guild, key) => (
                            <img
                                key={key}
                                src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.png`}
                                className="icon"
                                alt="logo"
                                onClick={handleGuildClick(guild.id)}
                            />
                        ))}

                <img src={arrow} className="arrow" onClick={handleToggle} />
            </div>

            {isOpen && (
                <div className="body">
                    {guilds &&
                        guilds.slice(3, 5).map((guild, key) => (
                            <div
                                key={key}
                                className="item guild"
                                onClick={handleGuildClick(guild.id)}
                            >
                                <img
                                    src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.png`}
                                    className="icon"
                                    alt="logo"
                                />
                                <p>
                                    {guild.name.length <= MAX_GUILD_NAME_LENGTH
                                        ? guild.name
                                        : guild.smallName}
                                </p>
                            </div>
                        ))}

                    <div className="item nav">
                        <div className="icon">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <p>Create guild</p>
                    </div>

                    <Link
                        to="/guilds"
                        className="item nav"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="icon">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                        <p>Discover Guilds</p>
                    </Link>
                </div>
            )}
        </div>
    );
}
