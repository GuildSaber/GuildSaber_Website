import "./Main.css";

export default function Main({ children, ...otherProps }) {
    return (
        <main className="Main" {...otherProps}>
            {children}
        </main>
    );
}
