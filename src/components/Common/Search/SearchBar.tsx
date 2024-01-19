import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export default function SearchBar({
  className,
  onChange,
  ...otherProps
}: {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      className={clsx(["flex-center rounded bg-gray-800", className])}
      {...otherProps}
    >
      <input
        type="text"
        placeholder="Search..."
        className="input w-full bg-gray-800"
        onChange={onChange}
      />
      <FontAwesomeIcon className="pr-3" icon={faMagnifyingGlass} />
    </div>
  );
}
