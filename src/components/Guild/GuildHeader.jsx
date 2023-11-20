import "./GuildHeader.scss";
import { decimalToHex } from "../../utils/color";
import Button from "../Common/Button/Button";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faUser } from "@fortawesome/free-solid-svg-icons";
import useScreenSize from "../../hooks/useScreenSize";

export default function GuildHeader({ guildData }) {
    const {
        id,
        name,
        smallName,
        color,
        description,
        rankedMapCount,
        memberCount,
        inviteCode,
    } = guildData;

    const screenSize = useScreenSize();

    const handleDiscordInvite = () => {
        window.open(`https://discord.gg/${inviteCode}`, "_blank");
    };

    return (
        <div className="guildHeader">
            <object
                className="banner"
                data={`https://cdn.guildsaber.com/Guild/${id}/Banner.png`}
                type="image/png"
            >
                <img
                    src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
                    style={{ width: "100%" }}
                />
            </object>

            <div className="details">
                <img
                    className="logo"
                    src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
                />
                <div className="info">
                    <h1 style={{ flex: 1 }}>{name}</h1>

                    {screenSize.width > 700 && inviteCode && (
                        <Button
                            text="Discord"
                            icon={faDiscord}
                            className="discordButton"
                            onClick={handleDiscordInvite}
                        />
                    )}

                    <div className="stats">
                        <p className="stat">
                            {memberCount}{" "}
                            <FontAwesomeIcon icon={faUser} className="icon" />
                        </p>
                        <p className="stat">
                            {rankedMapCount}{" "}
                            <FontAwesomeIcon
                                icon={faLayerGroup}
                                className="icon"
                            />
                        </p>
                    </div>
                    {screenSize.width > 700 && (
                        <h1
                            className="smallName"
                            style={{ color: `#${decimalToHex(color)}` }}
                        >
                            {smallName}
                        </h1>
                    )}
                </div>
            </div>

            <p className="common-text description">
                {description.split("\n").map(function (line, idx) {
                    return (
                        <span key={idx}>
                            {line}
                            <br />
                        </span>
                    );
                })}
            </p>

            {screenSize.width < 700 && inviteCode && (
                <Button
                    text="Discord"
                    icon={faDiscord}
                    className="discordButton"
                    onClick={handleDiscordInvite}
                />
            )}
        </div>
    );
}

/*
<p className="common-text description">
                        {description.split("\n").map(function (line, idx) {
                            return (
                                <span key={idx}>
                                    {line}
                                    <br />
                                </span>
                            );
                        })}
                    </p>

*/
