import clsx from "clsx";
import "./Main.scss";

export default function Main({ children, className, ...otherProps }) {
    return (
        <main className={clsx(["main", className])} {...otherProps}>
            {children}
        </main>
    );
}
