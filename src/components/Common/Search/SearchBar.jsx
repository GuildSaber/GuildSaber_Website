import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export default function SearchBar({ className, ...otherProps }) {
  return (
    <div
      className={clsx(["flex-center rounded bg-gray-800", className])}
      {...otherProps}
    >
      <input
        type="text"
        placeholder="Search..."
        className="input bg-gray-800"
      />
      <FontAwesomeIcon className="pr-3" icon={faMagnifyingGlass} />
    </div>
  );
}
