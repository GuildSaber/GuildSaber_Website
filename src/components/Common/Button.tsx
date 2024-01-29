import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";

type ButtonProps = {
  className?: string;
  text?: string;
  icon?: any;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  className,
  text,
  icon,
  type,
  children,
  onClick,
  ...otherProps
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type || "button"}
      className={clsx(["btn", className])}
      onClick={onClick}
      {...otherProps}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
      {text}
    </button>
  );
}
