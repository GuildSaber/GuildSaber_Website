import "./Loader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Loader({ className, ...otherProps }) {
    return (
        <FontAwesomeIcon
            icon={faCircleNotch}
            spin
            className={`loader${className ? " " + className : ""}`}
            {...otherProps}
        />
    );
}
