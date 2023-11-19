import "./SearchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ ...otherProps }) {
    return (
        <div className="search" {...otherProps}>
            <input type="text" placeholder="Search..." />
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
        </div>
    );
}
