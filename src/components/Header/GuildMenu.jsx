import { useRef, useState } from "react";
import clsx from "clsx";
import "./GuildMenu.scss";
import arrow from "../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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

    useClickAway(clickRef, () => {
        setIsOpen(false);
    });

    return (
        <div ref={clickRef} className={clsx({ guildMenu: true, open: isOpen })}>
            <div className="head">
                <img
                    src={`https://cdn.guildsaber.com/Guild/${selectedGuild}/Logo.png`}
                    className="guildIcon active"
                    alt="logo"
                    onClick={() => navigate(`/guild/${selectedGuild}`)}
                />
                <div className="separator"></div>
                {guilds &&
                    guilds.slice(0, 3).map((guild, key) => (
                        <img
                            key={key}
                            src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.png`}
                            className="guildIcon"
                            alt="logo"
                            onClick={() =>
                                dispatch({
                                    type: "GUILD_SELECTED",
                                    payload: parseInt(guild.id),
                                })
                            }
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
                                className="guild"
                                onClick={() =>
                                    dispatch({
                                        type: "GUILD_SELECTED",
                                        payload: parseInt(guild.id),
                                    })
                                }
                            >
                                <img
                                    src={`https://cdn.guildsaber.com/Guild/${guild.id}/Logo.png`}
                                    className="icon"
                                    alt="logo"
                                />
                                <p className="common-text">
                                    {guild.name.length <= MAX_GUILD_NAME_LENGTH
                                        ? guild.name
                                        : guild.smallName}
                                </p>
                            </div>
                        ))}

                    <div className="guild active">
                        <div
                            className="icon"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <p className="common-text">Create your own</p>
                    </div>
                </div>
            )}
        </div>
    );
}
