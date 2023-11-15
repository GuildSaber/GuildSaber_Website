import "./Main.scss";

export default function Main({ children, className, ...otherProps }) {
    return (
        <main
            className={`main${className ? " " + className : ""}`}
            {...otherProps}
        >
            {children}
        </main>
    );
}
