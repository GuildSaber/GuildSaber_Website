import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
  className,
  text,
  icon,
  image,
  component,
  onClick,
  ...otherProps
}) {
  return (
    <button
      className={clsx(["btn", className])}
      onClick={onClick}
      {...otherProps}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {image && <img src={image} />}
      {component && component()}
      {text}
    </button>
  );
}
