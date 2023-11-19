import "./Loader.scss";
import loader from "../../../assets/loader.svg";
import clsx from "clsx";

export default function Loader({ className, ...otherProps }) {
    return (
        <img
            src={loader}
            className={clsx(["loader", className])}
            {...otherProps}
        />
    );
}
