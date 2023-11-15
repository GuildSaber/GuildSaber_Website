import "./Map.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Map() {
    return (
        <div className="map">
            <div
                className="banner"
                style={{
                    "--bgURL": `url(https://cdn.guildsaber.com/Guild/1/Logo.png)`,
                }}
            ></div>
            <div className="difficulty">
                <h3 className="common-text">
                    <FontAwesomeIcon icon={faStar} /> 27.00 <span>/ 20.93</span>
                </h3>
                <p className="common-text">15 seconds ago</p>
            </div>
            <div className="details">
                <h4>Map de ouf</h4>
                <p>Mapper: SuperMappppppper</p>
            </div>
        </div>
    );
}
