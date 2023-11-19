import clsx from "clsx";
import "./Button.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
    className,
    text,
    icon,
    image,
    onClick,
    ...otherProps
}) {
    return (
        <button
            className={clsx(["button", className])}
            {...otherProps}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon className="icon" icon={icon} />}
            {image && <img className="icon" src={image} />}
            {text}
        </button>
    );
}
