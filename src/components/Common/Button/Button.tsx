import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
  className,
  text,
  icon,
  component,
  onClick,
  ...otherProps
}: {
  className?: string;
  text?: string;
  icon?: any;
  component?: () => JSX.Element;
  onClick?: () => void;
}) {
  return (
    <button
      className={clsx(["btn", className])}
      onClick={onClick}
      {...otherProps}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {component && component()}
      {text}
    </button>
  );
}
