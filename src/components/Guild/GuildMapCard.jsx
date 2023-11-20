import "./GuildMapCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudArrowDown,
    faPlay,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import sparks from "../../assets/sparks.svg";
import beatsaver from "../../assets/beatsaver.svg";
import useScreenSize from "../../hooks/useScreenSize";
import Button from "../Common/Button/Button";
import { Link } from "react-router-dom";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

export default function GuildMapCard() {
    const screenSize = useScreenSize();
    // Temp Data
    const description =
        "Omagawd hey guuyyss. This is my first map pls enjoy.\nDon't dislike it. Oke bye uwu";
    const id = 1;

    return (
        <div className="guildsMapCard">
            <div className="container">
                <div className="cover">
                    <img
                        src={`https://eu.cdn.beatsaver.com/191cafd1d0d6ab46545a8bfcb904c5b6dab4b1f1.jpg`}
                    />
                </div>

                <div className="details">
                    <Link to={`/guild/${id}`}>
                        <h3 className="title">
                            Powa Of Da Wildanes <p>by Camellia [Rogdude]</p>
                        </h3>
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
                        27
                        <FontAwesomeIcon className="icon" icon={faStar} />
                    </p>
                    <p className="stat">
                        20.93
                        <img className="icon" src={sparks} />
                    </p>
                    <div className="buttons">
                        <Button className="tritary" icon={faTwitch} />
                        <Button className="tritary" icon={faPlay} />
                        <Button className="tritary" image={beatsaver} />
                        <Button icon={faCloudArrowDown} />
                    </div>
                </div>

                {screenSize.width < 700 && (
                    <div className="buttons">
                        <Button className="tritary" icon={faTwitch} />
                        <Button className="tritary" icon={faPlay} />
                        <Button className="tritary" image={beatsaver} />
                        <Button icon={faCloudArrowDown} />
                    </div>
                )}
            </div>
        </div>
    );
}
