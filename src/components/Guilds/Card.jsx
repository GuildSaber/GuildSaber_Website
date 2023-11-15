import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faUser,
    faCircleCheck,
    faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { decimalToRGB, decimalToHex } from "../../utils/color";
import { Link } from "react-router-dom";

const badges = {
    1: {
        icon: faCircleQuestion,
        label: "Unverified",
    },
    2: {
        icon: faCircleCheck,
        label: "Verified",
    },
    4: {
        icon: faStar,
        label: "Featured",
    },
};

export default function Card({ guildData }) {
    const { id, name, description, color, type, memberCount, rankedMapCount } =
        guildData;
    const rgbColor = decimalToRGB(color);

    return (
        <div
            className="guildCard"
            style={{
                boxShadow: `0px 0px 100px 0px rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 0.6) inset`,
            }}
        >
            <div
                className="banner"
                style={{
                    "--bgURL": `url(https://cdn.guildsaber.com/Guild/${id}/Logo.png)`,
                }}
            ></div>
            <div className="col">
                <img
                    className="logo"
                    src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
                />
            </div>

            <div className="col" style={{ width: "100%" }}>
                <div className="badge">
                    <FontAwesomeIcon icon={badges[type].icon} />
                    <p className="common-text">{badges[type].label}</p>
                </div>

                <Link to={`/guild/${id}`}>
                    <h3 className="common-text title">{name}</h3>
                </Link>

                <p className="common-text">
                    {description.split("\n").map(function (line, idx) {
                        return (
                            <span key={idx}>
                                {line}
                                <br />
                            </span>
                        );
                    })}
                </p>
            </div>

            <div
                className="col"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minWidth: "135px",
                }}
            >
                <div className="stats">
                    <div className="stat">
                        <p className="common-text">{memberCount}</p>
                        <FontAwesomeIcon className="icon" icon={faUser} />
                    </div>

                    <div className="stat">
                        <p className="common-text">{rankedMapCount}</p>
                        <FontAwesomeIcon className="icon" icon={faStar} />
                    </div>
                </div>

                <button
                    className="common-text join"
                    style={{ "--guild-color": `#${decimalToHex(color)}` }}
                >
                    Join request
                </button>
            </div>
        </div>
    );
}
