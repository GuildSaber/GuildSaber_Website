import "./GuildsCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    //faStar,
    faUser,
    faLayerGroup,
    //faCircleCheck,
    //faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../Common/Button/Button";
import useScreenSize from "../../hooks/useScreenSize";

/*
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
};*/

export default function Card({ guildData }) {
    // eslint-disable-next-line no-unused-vars
    const { id, name, description, color, type, memberCount, rankedMapCount } =
        guildData;
    const screenSize = useScreenSize();

    return (
        <div className="guildsCard">
            <div className="container">
                <div className="cover">
                    <img
                        src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
                    />
                </div>

                <div className="details" style={{ width: "100%" }}>
                    <Link to={`/guild/${id}`}>
                        <h3 className="title">{name}</h3>
                    </Link>

                    <p className="description">
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

                <div className="stats">
                    <p className="stat">
                        {memberCount}
                        <FontAwesomeIcon className="icon" icon={faUser} />
                    </p>
                    <p className="stat">
                        {rankedMapCount}
                        <FontAwesomeIcon className="icon" icon={faLayerGroup} />
                    </p>
                    <Button className="stat" text="Join" />
                </div>

                {screenSize.width < 700 && (
                    <Button className="stat buttonBottom" text="Join" />
                )}
            </div>
        </div>
    );
}
